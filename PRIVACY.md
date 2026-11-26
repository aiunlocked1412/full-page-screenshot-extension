# Privacy Policy — Full Page Screenshot

**Effective date:** November 26, 2026

[English](#english) · [ภาษาไทย](#ภาษาไทย)

---

## English

Full Page Screenshot ("the extension") is a Chrome extension that captures a full-page image of the web page you are viewing. This policy explains what the extension does and does not do with your data.

### Summary

**The extension does not collect, store, sell, or transmit any personal data.** Everything happens locally inside your browser.

### Data the extension handles

When you click **Capture full page** (or press `Alt+Shift+S`), the extension:

1. Scrolls the current tab and takes screenshots of each visible section using Chrome's `captureVisibleTab` API.
2. Reads the page's title, URL and dimensions to size the image and to name the downloaded file.
3. Keeps the screenshots in the browser's memory only long enough to stitch them into one image on the extension's result page, then releases them.

The stitched image stays in that result tab until you close it. It is saved to your computer only if you click **Download**, and it is copied to your clipboard only if you click **Copy**.

### What the extension does NOT do

- It does not send screenshots, page content, URLs, or any other data to any server — not to the developer and not to any third party.
- It does not use analytics, tracking, cookies, advertising, or remote code.
- It does not store data in `chrome.storage`, IndexedDB, or any other persistent storage.
- It does not run on any page until you start a capture.
- It does not sell or share data with anyone.

### Permissions

| Permission | Why it is needed |
| --- | --- |
| `activeTab` | To capture the tab you are viewing, only after you click the extension or use its shortcut. |
| `scripting` | To scroll the page during capture, temporarily hide fixed/sticky elements so they don't repeat in the image, and restore the page afterwards. |

### Links

The popup contains a credit link to [aiunlock.co](https://aiunlock.co). It opens only when you click it; the extension does not send any data to that site.

### Children's privacy

The extension does not knowingly collect any information from anyone, including children under 13.

### Changes to this policy

If this policy changes, the updated version will be published in this file with a new effective date.

### Contact

Questions or concerns: please open an issue at
<https://github.com/aiunlocked1412/full-page-screenshot-extension/issues>

---

## ภาษาไทย

Full Page Screenshot ("extension") คือ Chrome extension สำหรับถ่ายภาพหน้าเว็บที่คุณกำลังเปิดอยู่แบบเต็มหน้า นโยบายนี้อธิบายว่า extension ทำอะไรกับข้อมูลของคุณบ้าง และไม่ทำอะไร

### สรุป

**Extension นี้ไม่เก็บ ไม่บันทึก ไม่ขาย และไม่ส่งข้อมูลส่วนบุคคลใดๆ ออกไป** ทุกอย่างทำงานในเบราว์เซอร์ของคุณเท่านั้น

### ข้อมูลที่ extension ใช้

เมื่อคุณกด **ถ่ายภาพทั้งหน้า** (หรือกด `Alt+Shift+S`) extension จะ:

1. เลื่อนหน้าในแท็บปัจจุบัน และถ่ายภาพทีละช่วงหน้าจอด้วย API `captureVisibleTab` ของ Chrome
2. อ่านชื่อหน้า URL และขนาดของหน้าเว็บ เพื่อกำหนดขนาดภาพและตั้งชื่อไฟล์ตอนดาวน์โหลด
3. เก็บภาพไว้ในหน่วยความจำของเบราว์เซอร์แค่ช่วงที่นำมาต่อเป็นภาพเดียวในหน้าผลลัพธ์ของ extension แล้วลบทิ้ง

ภาพที่ต่อเสร็จจะอยู่ในแท็บผลลัพธ์จนกว่าคุณจะปิดแท็บนั้น ภาพจะถูกบันทึกลงเครื่องก็ต่อเมื่อคุณกด **ดาวน์โหลด** และจะถูกคัดลอกไปยังคลิปบอร์ดก็ต่อเมื่อคุณกด **คัดลอกภาพ** เท่านั้น

### สิ่งที่ extension ไม่ทำ

- ไม่ส่งภาพ เนื้อหาหน้าเว็บ URL หรือข้อมูลอื่นใดไปยังเซิร์ฟเวอร์ใดๆ ทั้งของผู้พัฒนาและของบุคคลที่สาม
- ไม่ใช้ analytics, การติดตาม, คุกกี้, โฆษณา หรือโค้ดจากภายนอก
- ไม่บันทึกข้อมูลลง `chrome.storage`, IndexedDB หรือที่เก็บข้อมูลถาวรอื่นใด
- ไม่ทำงานบนหน้าเว็บใดๆ จนกว่าคุณจะสั่งถ่ายภาพ
- ไม่ขายหรือแบ่งปันข้อมูลให้ผู้อื่น

### สิทธิ์ที่ขอ

| สิทธิ์ | เหตุผล |
| --- | --- |
| `activeTab` | ใช้ถ่ายภาพแท็บที่คุณกำลังดู หลังจากที่คุณกดไอคอนหรือใช้คีย์ลัดเท่านั้น |
| `scripting` | ใช้เลื่อนหน้าระหว่างถ่าย ซ่อน element ที่ติดอยู่กับที่ (fixed/sticky) ชั่วคราวไม่ให้ซ้ำในภาพ และคืนหน้าเว็บกลับเหมือนเดิมหลังถ่ายเสร็จ |

### ลิงก์

ใน popup มีลิงก์เครดิตไปยัง [aiunlock.co](https://aiunlock.co) ซึ่งจะเปิดก็ต่อเมื่อคุณกดเท่านั้น และ extension ไม่ส่งข้อมูลใดๆ ไปยังเว็บไซต์นั้น

### ความเป็นส่วนตัวของเด็ก

Extension นี้ไม่เก็บข้อมูลใดๆ จากผู้ใช้ทุกคน รวมถึงเด็กอายุต่ำกว่า 13 ปี

### การเปลี่ยนแปลงนโยบาย

หากมีการเปลี่ยนแปลงนโยบายนี้ จะเผยแพร่ฉบับใหม่ในไฟล์นี้พร้อมระบุวันที่มีผลบังคับใช้ใหม่

### ติดต่อ

หากมีคำถามหรือข้อกังวล กรุณาเปิด issue ที่
<https://github.com/aiunlocked1412/full-page-screenshot-extension/issues>
