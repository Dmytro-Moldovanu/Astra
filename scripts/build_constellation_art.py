#!/usr/bin/env python3
"""Fetch genuine Johannes Hevelius (1690) engravings from Wikimedia Commons.

Creates a deployable atlas in public/constellation-art/ and a ZIP file
with both the exact historical scans and optimized transparent WebP variants.
No AI-generated illustrations are used.
"""
from __future__ import annotations

import hashlib
import io
import json
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

# Exact titles appearing in Commons' category "Firmamentum Sobiescianum".
PLATE = 'Johannes Hevelius - Prodromus Astronomia - Volume III "Firmamentum Sobiescianum, sive uranographia" - Tavola '
SOURCES = {
    "And": "Andromeda Hevelius.jpg",
    "Cas": "Cassiopea Hevelius.jpg",
    "Cep": "Cepheus Hevelius 2.jpg",
    "Per": "Perseus Hevelius.jpg",
    "Peg": PLATE + "T - Pegasus.jpg",
    "Ori": "Orion constellation Hevelius.jpg",
    "Her": "Hercules Hevelius.jpg",
    "Cyg": "Cygnus.jpg",
    "Aql": PLATE + "R - Aquila et Antinous.jpg",
    "Dra": "Draco Hevelius.jpg",
    "Leo": "Leo Hevelius.jpg",
    "Tau": "Taurus by Johannes Hevelius.JPG",
    "Gem": "Gemini Hevelius.jpg",
    "UMa": "Ursa Major Hevelius.jpg",
    "UMi": "Ursa Minor Hevelius.jpg",
    "Sco": "Scorpio Hevelius.jpg",
    "Boo": "Bootes.jpg",
    "Aqr": PLATE + "MM - Aquarius.jpg",
    "Ari": PLATE + "BB - Aries.jpg",
    "Cnc": "Cancer Hevelius.jpg",
    "CMa": PLATE + "DDD - Canis Major.jpg",
    "Lyr": "Hev 12 fig I lyra.jpg",
    "Oph": PLATE + "P - Serpens et Serpentarius.jpg",
    "Sgr": "Sagittarius Hevelius.jpg",
    "Cet": "Cetus Hevelius.jpg",
}

OUTPUT = Path("public/constellation-art")
ORIGINALS = OUTPUT / "originals"
ORIGINALS.mkdir(parents=True, exist_ok=True)
HEADERS = {"User-Agent": "ASTRA-star-atlas/1.0 (educational noncommercial astronomy; admin contact: GitHub Dmytro-Moldovanu/Astra)", "Accept": "image/*"}


def urls_for(filename: str):
    name = filename.replace(" ", "_")
    digest = hashlib.md5(name.encode("utf-8")).hexdigest()
    encoded = urllib.parse.quote(name)
    return [
        f"https://upload.wikimedia.org/wikipedia/commons/{digest[0]}/{digest[:2]}/{encoded}",
        "https://commons.wikimedia.org/wiki/Special:FilePath/" + encoded,
    ]


def fetch(filename: str) -> bytes:
    errors = []
    for url in urls_for(filename):
        for attempt in range(2):
            try:
                req = urllib.request.Request(url, headers=HEADERS)
                with urllib.request.urlopen(req, timeout=24) as response:
                    data = response.read()
                if len(data) < 5000:
                    raise ValueError(f"unexpected small response ({len(data)} bytes)")
                Image.open(io.BytesIO(data)).verify()
                print(f"Downloaded {filename} ({len(data)} bytes)", flush=True)
                return data
            except Exception as exc:
                errors.append(f"{type(exc).__name__}: {exc}")
                print(f"  {filename}: {type(exc).__name__}: {exc}", flush=True)
                time.sleep(1 + attempt)
    raise RuntimeError("; ".join(errors[-2:]))


def make_transparent_art(data: bytes, path: Path) -> None:
    scan = Image.open(io.BytesIO(data)).convert("RGB")
    scan.thumbnail((1100, 1000), Image.Resampling.LANCZOS)
    gray = scan.convert("L")
    paper = gray.filter(ImageFilter.GaussianBlur(20))
    ink = ImageChops.subtract(paper, gray)
    alpha = ink.point(lambda n: max(0, min(255, int((n - 2) * 10))))
    art = Image.new("RGBA", scan.size, (202, 218, 240, 0))
    art.putalpha(alpha)
    art.save(path, "WEBP", lossless=False, quality=92, method=5)


def main():
    results = []
    errors = []
    for code, name in SOURCES.items():
        try:
            data = fetch(name)
            original = ORIGINALS / f"{code}.jpg"
            original.write_bytes(data)
            prepared = OUTPUT / f"{code}.webp"
            make_transparent_art(data, prepared)
            results.append({
                "id": code,
                "original": name,
                "source": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(name.replace(" ", "_")),
                "license": "Public Domain – Johannes Hevelius, 1690",
            })
            print(f"OK {code} -> {prepared}", flush=True)
        except Exception as exc:
            errors.append(f"{code}: {exc}")
            print(f"FAILED {code}: {exc}", flush=True)
    (OUTPUT / "manifest.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    zipfile_path = OUTPUT / "HEVELIUS_1690_ASTRA.zip"
    with zipfile.ZipFile(zipfile_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.write(OUTPUT / "manifest.json", "manifest.json")
        for item in results:
            for suffix, base in [(".jpg", ORIGINALS), (".webp", OUTPUT)]:
                p = base / (item["id"] + suffix)
                z.write(p, ("originals/" if suffix == ".jpg" else "webp/") + p.name)
    print(f"RESULT: {len(results)}/{len(SOURCES)} images, ZIP: {zipfile_path}", flush=True)
    if errors:
        print("MISSING: " + " | ".join(errors), flush=True)
    if not results:
        raise RuntimeError("No genuine Hevelius images could be downloaded. See log above.")


if __name__ == "__main__":
    main()
