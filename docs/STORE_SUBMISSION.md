# คู่มืออัปโหลด Full Page Screenshot ขึ้น Chrome Web Store

ทำตามทีละขั้น ข้อความในกล่องโค้ดก๊อปไปวางได้เลย (กดปุ่ม Copy มุมขวาของกล่อง)
ใช้เวลาประมาณ 10–15 นาที

**เตรียมไฟล์ก่อนเริ่ม** (อยู่ในโฟลเดอร์โปรเจกต์ `full-page-screenshot/`)

| ไฟล์ | ใช้ตอน |
| --- | --- |
| `dist/full-page-screenshot-v1.0.0.zip` | ขั้นที่ 1 อัปโหลดแพ็กเกจ |
| `icons/icon128.png` | ขั้นที่ 2 ไอคอนร้าน |
| `docs/store/screenshot-1.png` … `screenshot-5.png` | ขั้นที่ 2 สกรีนชอท |
| `docs/store/small-promo-tile-440x280.png` | ขั้นที่ 2 Small promo tile |
| `docs/store/marquee-1400x560.png` | ขั้นที่ 2 Marquee promo tile |

> ถ้ายังไม่มีไฟล์ zip ให้รัน `./scripts/package.sh` ในโฟลเดอร์โปรเจกต์ก่อน

---

## ขั้นที่ 1: สร้างรายการใหม่และอัปโหลดแพ็กเกจ

1. เปิด <https://chrome.google.com/webstore/devconsole> ด้วยบัญชีที่จะใช้เผยแพร่
2. กด **New item** (รายการใหม่) มุมขวาบน
3. ลากไฟล์ `dist/full-page-screenshot-v1.0.0.zip` ใส่ หรือกด **Browse files** แล้วเลือกไฟล์
4. รอสักครู่ ระบบจะพาไปหน้าแก้ไขรายการ (มีเมนูด้านซ้าย: Package, Store listing, Privacy, Distribution …)

---

## ขั้นที่ 2: Store listing (ข้อมูลหน้าร้าน)

### Product details

**Description** (คำอธิบายแบบละเอียด) วางข้อความนี้:

```
ถ่ายภาพหน้าเว็บแบบเต็มหน้าในคลิกเดียว Full Page Screenshot จะเลื่อนหน้าเว็บลงจนสุด ถ่ายทีละช่วงหน้าจอ แล้วต่อเป็นภาพ PNG ไฟล์เดียวให้อัตโนมัติ

✨ ทำอะไรได้บ้าง
• ถ่ายทั้งหน้าในคลิกเดียว: กดไอคอนแล้วกด "ถ่ายภาพทั้งหน้า" หรือกดคีย์ลัด Alt + Shift + S
• ไม่ซ้ำ ไม่เพี้ยน: เมนูที่ติดด้านบนและปุ่มลอย เช่นปุ่มแชท จะขึ้นในภาพแค่ครั้งเดียว ไม่ซ้ำทุกช่วง
• โหลดรูปให้ครบก่อนถ่าย: เลื่อนหน้าหนึ่งรอบก่อน ให้รูปที่โหลดทีหลังขึ้นครบ
• คมเท่าจอจริง: จอ Retina ก็ไม่แตก
• หน้ายาวแค่ไหนก็ได้: ถ้ายาวเกินที่ Chrome วาดได้ในภาพเดียว จะแบ่งเป็นหลายไฟล์ให้
• ดาวน์โหลดหรือคัดลอก: บันทึกเป็น PNG หรือคัดลอกไปวางใน Slack, Figma, เอกสารได้ทันที

🔒 ความเป็นส่วนตัว
• ทำงานในเบราว์เซอร์ของคุณเท่านั้น ไม่ส่งภาพหรือข้อมูลใดๆ ออกนอกเครื่อง
• ไม่มี analytics ไม่มีโฆษณา ไม่เก็บข้อมูลผู้ใช้
• ขอสิทธิ์น้อยที่สุด ใช้แค่ activeTab และ scripting และทำงานเมื่อคุณกดเท่านั้น

🕹️ วิธีใช้
1. เปิดหน้าเว็บที่ต้องการ
2. กดไอคอน Full Page Screenshot แล้วกด "ถ่ายภาพทั้งหน้า" (หรือกด Alt + Shift + S)
3. รอให้เลื่อนจนสุด ไอคอนจะแสดง % ความคืบหน้า
4. ถ่ายเสร็จจะเปิดแท็บผลลัพธ์ กด "ดาวน์โหลด PNG" หรือ "คัดลอกภาพ"

⚠️ ข้อจำกัด
• ถ่ายหน้า chrome:// และ Chrome Web Store ไม่ได้ เพราะ Chrome ห้ามไว้
• เว็บที่เลื่อนแค่กล่องด้านใน (ไม่ใช่ทั้งหน้าต่าง) จะได้แค่ส่วนที่เห็นบนจอ

โค้ดเปิดเผย (open source, MIT): https://github.com/aiunlocked1412/full-page-screenshot-extension

🎓 โปรเจกต์ประกอบการศึกษา คอร์ส Claude Code โดย aiunlock.co — https://aiunlock.co
```

**Category** (หมวดหมู่): เลือก **Productivity → Tools** (ถ้ามีแค่ชื่อเดียว ให้เลือก **Tools**)

**Language** (ภาษา): เลือก **Thai – ไทย**

### Graphic assets

| ช่อง | ไฟล์ |
| --- | --- |
| **Store icon** (128×128) | `icons/icon128.png` |
| **Screenshots** (อัปได้ถึง 5 ภาพ เรียงตามนี้) | `docs/store/screenshot-1.png` → `screenshot-5.png` |
| **Small promo tile** (440×280) | `docs/store/small-promo-tile-440x280.png` |
| **Marquee promo tile** (1400×560, ไม่บังคับ) | `docs/store/marquee-1400x560.png` |

ช่องวิดีโอ (Global promo video) เว้นว่างได้

### Additional fields

| ช่อง | ใส่ |
| --- | --- |
| **Official URL** | เว้นว่าง (หรือเลือก None) |
| **Homepage URL** | `https://aiunlock.co` |
| **Support URL** | `https://github.com/aiunlocked1412/full-page-screenshot-extension/issues` |
| **Mature content** | ไม่ติ๊ก (No) |

กด **Save draft** (บันทึกฉบับร่าง) มุมขวาบน

---

## ขั้นที่ 3: Privacy (แนวทางปฏิบัติด้านความเป็นส่วนตัว)

### Single purpose (จุดประสงค์เดียว)

```
Captures a full-page screenshot of the current web page by scrolling it from top to bottom, capturing each viewport, and stitching the captures into a single PNG image that the user can download or copy.
```

### Permission justification (เหตุผลที่ขอสิทธิ์)

**activeTab**

```
Used to capture the visible area of the tab the user is viewing (chrome.tabs.captureVisibleTab). Access is granted only when the user clicks the extension's toolbar button or presses its keyboard shortcut, and only for that tab.
```

**scripting**

```
Used to inject short functions into the active tab during a capture: scroll the page step by step, hide the scrollbar, temporarily stop sticky/fixed elements from repeating in every frame, and then restore the page to its original state and scroll position. No remote code is executed.
```

> ถ้ามีช่อง **Host permission justification** ขึ้นมา ให้ข้ามได้ เพราะ extension นี้ไม่ได้ขอ host permissions

### Remote code (โค้ดระยะไกล)

เลือก **No, I am not using remote code** (ไม่ได้ใช้โค้ดระยะไกล)

### Data usage (การใช้ข้อมูล)

**ไม่ต้องติ๊กหมวดข้อมูลใดเลย** (Personally identifiable info, Health, Financial, Authentication, Personal communications, Location, Web history, User activity, Website content — เว้นทั้งหมด)

เลื่อนลงไปติ๊กยืนยัน **ทั้ง 3 ข้อ**:

- ☑ I do not sell or transfer user data to third parties, outside of the approved use cases
- ☑ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ☑ I do not use or transfer user data to determine creditworthiness or for lending purposes

### Privacy policy URL

```
https://github.com/aiunlocked1412/full-page-screenshot-extension/blob/main/PRIVACY.md
```

กด **Save draft**

---

## ขั้นที่ 4: Distribution (การเผยแพร่)

| ช่อง | เลือก |
| --- | --- |
| **Payments** | Free of charge (ฟรี) |
| **Visibility** | **Public** (สาธารณะ) |
| **Distribution** | All regions (ทุกภูมิภาค) |

กด **Save draft**

---

## ขั้นที่ 5: ส่งตรวจ

1. กด **Submit for review** (ส่งเข้ารับการตรวจสอบ) มุมขวาบน
   ถ้าปุ่มกดไม่ได้ ระบบจะบอกว่าช่องไหนยังขาด ให้กลับไปกรอกตามขั้นที่บอก
2. หน้าต่างยืนยันจะถามเรื่อง **Publish automatically after review**
   - ติ๊กไว้ = ผ่านการตรวจแล้วขึ้นร้านทันที
   - ไม่ติ๊ก = ผ่านแล้วต้องกลับมากด Publish เอง (มีเวลา 30 วัน)
3. กด **Submit**

### หลังส่ง

- สถานะจะเป็น **Pending review** ปกติใช้เวลาไม่กี่ชั่วโมงถึงไม่กี่วัน
- Google จะส่งอีเมลแจ้งผล ถ้าไม่ผ่านจะบอกเหตุผล แก้แล้วส่งใหม่ได้
- ผ่านแล้วจะได้ลิงก์หน้าร้าน รูปแบบ `https://chromewebstore.google.com/detail/<item-id>` เอาไปใส่ใน README ได้

---

## ออกเวอร์ชันใหม่ครั้งต่อไป

1. แก้ `version` ใน `manifest.json` (เช่น `1.0.0` → `1.0.1`)
2. รัน `./scripts/package.sh`
3. ใน Dashboard เปิดรายการเดิม → **Package** → **Upload new package** → เลือก zip ใหม่
4. กด **Submit for review**
