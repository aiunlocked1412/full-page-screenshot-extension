/**
 * ดึงเฟรมจาก background ทีละเฟรม แล้วต่อเป็นภาพยาวบน canvas
 * ถ้าภาพสูงเกินขีดจำกัด canvas ของ Chrome จะแบ่งเป็นหลายไฟล์
 */

/** ขีดจำกัด canvas ของ Chrome: ด้านละ 32767px และพื้นที่ ~268M px */
const MAX_CANVAS_SIDE = 32000;
const MAX_CANVAS_AREA = 260_000_000;

const titleEl = document.getElementById('title');
const infoEl = document.getElementById('info');
const outputEl = document.getElementById('output');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');

const send = (msg) => chrome.runtime.sendMessage(msg);

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('โหลดเฟรมไม่สำเร็จ'));
    img.src = src;
  });

const canvasToBlob = (canvas) =>
  new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('สร้างไฟล์ภาพไม่สำเร็จ'))), 'image/png')
  );

/** สร้างชื่อไฟล์จาก hostname + เวลา */
function buildFileName(url, part, totalParts) {
  let host = 'page';
  try {
    host = new URL(url).hostname.replace(/^www\./, '') || 'page';
  } catch (_) {}
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const suffix = totalParts > 1 ? `-part${part + 1}` : '';
  return `screenshot-${host}-${stamp}${suffix}.png`;
}

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

async function main() {
  const id = new URLSearchParams(location.search).get('id');
  const metaRes = id && (await send({ type: 'getMeta', id }));
  if (!metaRes?.ok) throw new Error('ไม่พบข้อมูลภาพ (อาจหมดอายุแล้ว) — กรุณาถ่ายใหม่');

  const { meta, frameCount } = metaRes;
  titleEl.textContent = meta.title || meta.url;

  // โหลดเฟรมทั้งหมด
  const frames = [];
  for (let i = 0; i < frameCount; i++) {
    infoEl.textContent = `กำลังโหลดเฟรม ${i + 1}/${frameCount}...`;
    const res = await send({ type: 'getFrame', id, index: i });
    if (!res?.ok) throw new Error(`โหลดเฟรม ${i + 1} ไม่สำเร็จ`);
    frames.push({ y: res.frame.y, img: await loadImage(res.frame.dataUrl) });
  }
  send({ type: 'release', id });

  // อัตราส่วนพิกเซลจริงต่อ CSS px (เช่นจอ Retina = 2)
  const scale = frames[0].img.naturalWidth / meta.viewportWidth;
  const width = frames[0].img.naturalWidth;
  const totalHeight = Math.round(meta.capturedHeight * scale);
  const partHeight = Math.min(MAX_CANVAS_SIDE, Math.floor(MAX_CANVAS_AREA / width));
  const partCount = Math.ceil(totalHeight / partHeight);

  const results = [];
  for (let p = 0; p < partCount; p++) {
    infoEl.textContent = `กำลังต่อภาพ ${p + 1}/${partCount}...`;
    const top = p * partHeight;
    const height = Math.min(partHeight, totalHeight - top);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // วาดตามลำดับ เฟรมหลังทับส่วนที่ซ้อนกันของเฟรมก่อน (เนื้อหาเดียวกัน)
    for (const f of frames) {
      const y = Math.round(f.y * scale) - top;
      if (y + f.img.naturalHeight <= 0 || y >= height) continue;
      ctx.drawImage(f.img, 0, y);
    }

    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);
    const filename = buildFileName(meta.url, p, partCount);
    results.push({ url, blob, filename });

    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = url;
    img.alt = `ภาพหน้าเว็บ${partCount > 1 ? ` ส่วนที่ ${p + 1}` : ''}`;
    const cap = document.createElement('figcaption');
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.textContent = filename;
    cap.append(link, ` — ${width}×${height}px, ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
    fig.append(img, cap);
    outputEl.append(fig);
  }

  infoEl.textContent =
    `${width}×${totalHeight}px จาก ${frameCount} เฟรม` + (partCount > 1 ? ` (แบ่งเป็น ${partCount} ไฟล์ เพราะยาวเกินขีดจำกัด)` : '');

  downloadBtn.disabled = false;
  downloadBtn.addEventListener('click', () => results.forEach((r) => triggerDownload(r.url, r.filename)));

  copyBtn.disabled = false;
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': results[0].blob })]);
      copyBtn.textContent = '✓ คัดลอกแล้ว';
    } catch (e) {
      copyBtn.textContent = 'คัดลอกไม่สำเร็จ';
    }
    setTimeout(() => (copyBtn.textContent = '📋 คัดลอกภาพ'), 2000);
  });
}

main().catch((err) => {
  console.error(err);
  titleEl.textContent = 'เกิดข้อผิดพลาด';
  infoEl.textContent = err.message;
  infoEl.className = 'error';
});
