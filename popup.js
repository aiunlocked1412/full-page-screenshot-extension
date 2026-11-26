const btn = document.getElementById('captureBtn');
const statusEl = document.getElementById('status');

btn.addEventListener('click', async () => {
  btn.disabled = true;
  statusEl.className = '';
  statusEl.textContent = 'กำลังเลื่อนหน้าและถ่ายภาพ...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // ส่งงานให้ background แล้วปิด popup ทันที (ความคืบหน้าแสดงบน badge ไอคอน)
  chrome.runtime.sendMessage({ type: 'capture', tabId: tab.id }).catch(() => {});
  setTimeout(() => window.close(), 300);
});
