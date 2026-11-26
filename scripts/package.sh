#!/usr/bin/env bash
# สร้างไฟล์ zip สำหรับอัปโหลด Chrome Web Store
# ใส่เฉพาะไฟล์ที่ extension ใช้งานจริง (ไม่รวม docs, scripts, README, .git)
set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(node -p "require('./manifest.json').version")
OUT="dist/full-page-screenshot-v${VERSION}.zip"

FILES=(
  manifest.json
  background.js
  popup.html popup.css popup.js
  result.html result.css result.js
  icons/icon16.png icons/icon32.png icons/icon48.png icons/icon128.png
)

for f in "${FILES[@]}"; do
  [[ -f "$f" ]] || { echo "ไม่พบไฟล์: $f" >&2; exit 1; }
done

mkdir -p dist
rm -f "$OUT"
zip -q -X "$OUT" "${FILES[@]}"

echo "สร้างแล้ว: $OUT ($(du -h "$OUT" | cut -f1))"
unzip -l "$OUT"
