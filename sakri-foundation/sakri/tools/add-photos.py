"""Add photos to a program: python tools/add-photos.py <program-slug> <folder-of-images>
Converts to WebP (max 1400px), numbers them after existing ones. Needs: pip install pillow"""
import sys, os
from PIL import Image, ImageOps
slug, src = sys.argv[1], sys.argv[2]
out = f"src/assets/img/{slug}"; os.makedirs(out, exist_ok=True)
n = len([f for f in os.listdir(out) if f.endswith(".webp")])
for f in sorted(os.listdir(src)):
    try: im = ImageOps.exif_transpose(Image.open(f"{src}/{f}")).convert("RGB")
    except Exception: continue
    im.thumbnail((1400, 1400)); n += 1; im.save(f"{out}/{n:02d}.webp", "WEBP", quality=74)
print(f"{slug}: {n} photos")
