import sys
from PIL import Image, ImageDraw

out = sys.argv[1]
S = 1024

def base():
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    # gradient fill
    grad = Image.new("RGBA", (S, S))
    gd = ImageDraw.Draw(grad)
    top, bot = (66, 133, 244), (21, 87, 206)
    for y in range(S):
        t = y / (S - 1)
        gd.line([(0, y), (S, y)], fill=tuple(int(a + (b - a) * t) for a, b in zip(top, bot)) + (255,))
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).rounded_rectangle([24, 24, S - 24, S - 24], radius=220, fill=255)
    img.paste(grad, (0, 0), mask)
    return img

def brackets(d, inset, length, w):
    a, b = inset, S - inset
    for (x, y, dx, dy) in [(a, a, 1, 1), (b, a, -1, 1), (a, b, 1, -1), (b, b, -1, -1)]:
        d.line([(x, y), (x + dx * length, y)], fill="white", width=w)
        d.line([(x, y), (x, y + dy * length)], fill="white", width=w)
        d.ellipse([x - w/2, y - w/2, x + w/2, y + w/2], fill="white")

def arrow(d, cx, top, bottom, head, w, color="white"):
    d.line([(cx, top), (cx, bottom - head * 0.6)], fill=color, width=w)
    d.polygon([(cx - head, bottom - head), (cx + head, bottom - head), (cx, bottom)], fill=color)

def detailed():
    img = base(); d = ImageDraw.Draw(img)
    brackets(d, 170, 150, 56)
    # tall page
    d.rounded_rectangle([340, 250, 684, 774], radius=40, fill="white")
    blue = (26, 115, 232)
    for i, y in enumerate([330, 400, 470]):
        d.rounded_rectangle([395, y, 630 if i != 2 else 560, y + 34], radius=17, fill=(190, 210, 245))
    arrow(d, 512, 535, 720, 85, 52, blue)
    return img

def simple():
    img = base(); d = ImageDraw.Draw(img)
    brackets(d, 190, 200, 110)
    arrow(d, 512, 270, 760, 190, 130)
    return img

for size, fn in [(16, simple), (32, simple), (48, detailed), (128, detailed)]:
    fn().resize((size, size), Image.LANCZOS).save(f"{out}/icon{size}.png")
print("done")
