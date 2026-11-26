/**
 * Service worker: เลื่อนหน้าเว็บทีละหน้าจอ, ถ่าย captureVisibleTab ทีละเฟรม
 * แล้วเปิด result.html เพื่อต่อภาพ (stitch) และให้ดาวน์โหลด
 */

/** Chrome จำกัด captureVisibleTab ไว้ ~2 ครั้ง/วินาที */
const CAPTURE_INTERVAL_MS = 550;
/** กันหน้าที่ยาวไม่สิ้นสุด (infinite scroll) */
const MAX_FRAMES = 80;

/** @type {Map<string, {meta: object, frames: {y: number, dataUrl: string}[]}>} */
const captures = new Map();
let isCapturing = false;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** รันฟังก์ชันในหน้าเว็บ แล้วคืนค่าผลลัพธ์ */
async function runInPage(tabId, func, args = []) {
  const [res] = await chrome.scripting.executeScript({ target: { tabId }, func, args });
  return res?.result;
}

/* ---------- ฟังก์ชันที่ถูก inject เข้าไปในหน้าเว็บ ---------- */

function pagePrepare() {
  const html = document.documentElement;
  const state = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    htmlScrollBehavior: html.style.scrollBehavior,
  };
  window.__fpsState = state;

  // ซ่อน scrollbar และปิด smooth scroll
  const style = document.createElement('style');
  style.id = '__fps_style';
  style.textContent =
    'html,body{scroll-behavior:auto!important;scrollbar-width:none!important}' +
    'html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important}';
  document.documentElement.appendChild(style);

  // ทำให้ sticky ไม่ติดหน้าจอ (คงตำแหน่งใน layout เดิม)
  const stickies = [];
  for (const el of document.querySelectorAll('body *')) {
    if (getComputedStyle(el).position === 'sticky') {
      stickies.push([el, el.style.getPropertyValue('position'), el.style.getPropertyPriority('position')]);
      el.style.setProperty('position', 'relative', 'important');
    }
  }
  window.__fpsStickies = stickies;
  window.__fpsFixed = [];
  return true;
}

/** เลื่อนลงไปจนสุดอย่างรวดเร็ว เพื่อกระตุ้นรูป lazy-load แล้วคืนขนาดหน้า */
async function pagePreScroll(maxFrames) {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const vh = window.innerHeight;
  for (let i = 0; i < maxFrames; i++) {
    const before = window.scrollY;
    window.scrollTo(0, before + vh);
    await wait(120);
    if (window.scrollY === before) break;
  }
  window.scrollTo(0, 0);
  await wait(300);
  const doc = document.documentElement;
  return {
    totalHeight: Math.max(doc.scrollHeight, document.body ? document.body.scrollHeight : 0),
    viewportWidth: doc.clientWidth || window.innerWidth,
    viewportHeight: window.innerHeight,
    title: document.title,
    url: location.href,
  };
}

/** เลื่อนไปที่ y แล้วรอให้วาดเสร็จ คืน scrollY จริง */
async function pageScrollTo(y) {
  window.scrollTo(0, y);
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 150));
  return window.scrollY;
}

/** ซ่อน element ที่เป็น fixed (เช่น header/แชท) หลังถ่ายเฟรมแรก กันซ้ำทุกเฟรม */
function pageHideFixed() {
  for (const el of document.querySelectorAll('body *')) {
    if (getComputedStyle(el).position === 'fixed') {
      window.__fpsFixed.push([el, el.style.getPropertyValue('visibility'), el.style.getPropertyPriority('visibility')]);
      el.style.setProperty('visibility', 'hidden', 'important');
    }
  }
  return true;
}

function pageRestore() {
  const restore = (list, prop) => {
    for (const [el, value, priority] of list || []) {
      if (value) el.style.setProperty(prop, value, priority);
      else el.style.removeProperty(prop);
    }
  };
  restore(window.__fpsFixed, 'visibility');
  restore(window.__fpsStickies, 'position');
  document.getElementById('__fps_style')?.remove();
  const s = window.__fpsState;
  if (s) window.scrollTo(s.scrollX, s.scrollY);
  delete window.__fpsState;
  delete window.__fpsFixed;
  delete window.__fpsStickies;
  return true;
}

/* ---------- ขั้นตอนหลัก ---------- */

async function setBadge(text, color = '#1a73e8') {
  await chrome.action.setBadgeBackgroundColor({ color });
  await chrome.action.setBadgeText({ text });
}

/**
 * ถ่ายภาพทั้งหน้าของแท็บที่ระบุ
 * @param {chrome.tabs.Tab} tab
 */
async function captureFullPage(tab) {
  if (isCapturing) throw new Error('กำลังถ่ายภาพอยู่ กรุณารอสักครู่');
  if (!tab?.id || !/^https?:|^file:/.test(tab.url || '')) {
    throw new Error('หน้านี้ถ่ายไม่ได้ (เช่น chrome://, Chrome Web Store)');
  }
  isCapturing = true;
  const tabId = tab.id;
  try {
    await setBadge('...');
    await runInPage(tabId, pagePrepare);
    const meta = await runInPage(tabId, pagePreScroll, [MAX_FRAMES]);

    const step = meta.viewportHeight;
    const maxY = Math.max(0, meta.totalHeight - step);
    const positions = [];
    for (let y = 0; y < maxY && positions.length < MAX_FRAMES - 1; y += step) positions.push(y);
    positions.push(Math.min(maxY, positions.length * step));

    const frames = [];
    let lastCaptureAt = 0;
    for (let i = 0; i < positions.length; i++) {
      const actualY = await runInPage(tabId, pageScrollTo, [positions[i]]);
      if (frames.length && actualY <= frames[frames.length - 1].y) continue; // เลื่อนต่อไม่ได้แล้ว

      const waitMs = CAPTURE_INTERVAL_MS - (Date.now() - lastCaptureAt);
      if (waitMs > 0) await sleep(waitMs);
      const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' });
      lastCaptureAt = Date.now();
      frames.push({ y: actualY, dataUrl });

      if (i === 0) await runInPage(tabId, pageHideFixed);
      await setBadge(`${Math.round(((i + 1) / positions.length) * 100)}%`);
    }

    const id = crypto.randomUUID();
    captures.set(id, { meta: { ...meta, capturedHeight: Math.min(meta.totalHeight, frames.at(-1).y + step) }, frames });
    await chrome.tabs.create({ url: chrome.runtime.getURL(`result.html?id=${id}`), index: tab.index + 1 });
    await setBadge('');
  } catch (err) {
    console.error('[FullPageScreenshot]', err);
    await setBadge('ERR', '#d93025');
    setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
    throw err;
  } finally {
    try {
      await runInPage(tabId, pageRestore);
    } catch (_) {
      /* แท็บอาจถูกปิดไปแล้ว */
    }
    isCapturing = false;
  }
}

/* ---------- Messaging ---------- */

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;

  if (msg.type === 'capture') {
    chrome.tabs
      .get(msg.tabId)
      .then(captureFullPage)
      .then(() => sendResponse({ ok: true }))
      .catch((e) => sendResponse({ ok: false, error: e.message }));
    return true;
  }

  if (msg.type === 'getMeta') {
    const c = captures.get(msg.id);
    sendResponse(c ? { ok: true, meta: c.meta, frameCount: c.frames.length } : { ok: false });
    return false;
  }

  if (msg.type === 'getFrame') {
    const c = captures.get(msg.id);
    sendResponse(c?.frames[msg.index] ? { ok: true, frame: c.frames[msg.index] } : { ok: false });
    return false;
  }

  if (msg.type === 'release') {
    captures.delete(msg.id);
    return false;
  }
  return false;
});

chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command !== 'capture-full-page') return;
  try {
    await captureFullPage(tab);
  } catch (_) {
    /* แสดงบน badge แล้ว */
  }
});
