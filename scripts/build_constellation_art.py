#!/usr/bin/env python3
"""Download Public Domain Hevelius constellation plates and make dark-sky artwork.

Source pages and provenance are listed in public/constellation-art/SOURCES.md.
Designed to run on GitHub Actions; generated WebP artwork is committed into ASTRA.
"""
from __future__ import annotations

import hashlib
import io
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter, ImageOps

SOURCES = {
    "Sco": "Scorpio Hevelius.jpg",
    "Ori": "Orion constellation Hevelius.jpg",
    "Cas": "Cassiopea Hevelius.jpg",
    "Cyg": "Cygnus.jpg",
    "Leo": "Leo Hevelius.jpg",
    "Peg": "Johannes Hevelius - Pegasus.jpg",
    "Per": "Perseus Hevelius.jpg",
    "And": "Andromeda Hevelius.jpg",
    "Her": "Hercules Hevelius.jpg",
    "Tau": "Taurus by Johannes Hevelius.JPG",
}

DEST = Path("public/constellation-art")
DEST.mkdir(parents=True, exist_ok=True)


def commons_file_url(filename: str) -> str:
    # Stable direct Wikimedia upload URL, derived from the verified Commons title.
    name = filename.replace(" ", "_")
    digest = hashlib.md5(name.encode("utf-8")).hexdigest()
    return (
        f"https://upload.wikimedia.org/wikipedia/commons/"
        f"{digest[0]}/{digest[:2]}/{urllib.parse.quote(name)}"
    )


def download(filename: str) -> bytes:
    direct = commons_file_url(filename)
    special = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(filename)
    search_api = ("https://commons.wikimedia.org/w/api.php?action=query&generator=search"
                  "&gsrnamespace=6&gsrsearch=" + urllib.parse.quote("intitle:Hevelius " + filename.split(" Hevelius")[0].replace(".jpg",""))
                  + "&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata&format=json")
    try:
        import json
        request = urllib.request.Request(search_api, headers={"User-Agent": "ASTRA-ConstellationAtlas/1.0 (contact via GitHub)"})
        with urllib.request.urlopen(request, timeout=30) as response:
            result = json.load(response)
        pages = list(result.get("query", {}).get("pages", {}).values())
        for page in pages:
            title = page.get("title", "").lower()
            info = (page.get("imageinfo") or [{}])[0]
            license_tag = (info.get("extmetadata", {}).get("LicenseShortName", {}).get("value", "") or "").lower()
            if ("hevelius" in title and ("public domain" in license_tag or license_tag in ("pd", "cc0"))):
                source = info.get("url")
                if source:
                    with urllib.request.urlopen(urllib.request.Request(source, headers={"User-Agent":"ASTRA-ConstellationAtlas/1.0"}), timeout=40) as response:
                        payload = response.read()
                        if len(payload) > 8000:
                            return payload
    except Exception as exc:
        print(f"Commons search not available for {filename}: {exc}", flush=True)
    for address in (direct, special):
        for attempt in range(3):
            request = urllib.request.Request(
                address,
                headers={
                    "User-Agent": "ASTRA-ConstellationAtlas/1.0 (Educational astronomy project; source: Wikimedia Commons)",
                    "Accept": "image/jpeg,image/*",
                },
            )
            try:
                with urllib.request.urlopen(request, timeout=35) as response:
                    payload = response.read()
                    if len(payload) < 8000:
                        raise ValueError("Unexpectedly small image response")
                    return payload
            except Exception as exc:
                print(f"Retry {filename} ({attempt + 1}/3): {exc}", flush=True)
                time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Could not download {filename}")


def convert(data: bytes, destination: Path) -> None:
    original = Image.open(io.BytesIO(data)).convert("RGB")
    original.thumbnail((1050, 840), Image.Resampling.LANCZOS)
    grayscale = ImageOps.grayscale(original)
    # Remove aged-paper background. Ink is darker than the paper near it,
    # so the local low-frequency background subtraction keeps engraving lines.
    background = grayscale.filter(ImageFilter.GaussianBlur(radius=14))
    delta = ImageChops.subtract(background, grayscale)
    alpha = delta.point(lambda value: min(255, max(0, int((value - 2) * 9))))
    # Tiny, very subtle original line work becomes visible on a deep blue UI.
    alpha = alpha.filter(ImageFilter.MaxFilter(3))
    artwork = Image.new("RGBA", original.size, (190, 213, 245, 0))
    artwork.putalpha(alpha)
    artwork.save(destination, "WEBP", quality=91, method=6)
    print(f"Created {destination} {original.width}x{original.height}", flush=True)


def main() -> None:
    failures = []
    for constellation, filename in SOURCES.items():
        destination = DEST / f"{constellation}.webp"
        print(f"Fetching {filename}", flush=True)
        try:
            convert(download(filename), destination)
        except Exception as exc:
            failures.append((constellation, str(exc)))
            print(f"FAILED {constellation}: {exc}", flush=True)
    print(f"Prepared {len(SOURCES) - len(failures)}/{len(SOURCES)} images", flush=True)
    if failures:
        for code, error in failures:
            print(f"  {code}: {error}", flush=True)
    if len(failures) == len(SOURCES):
        raise RuntimeError("No source artwork could be retrieved")


if __name__ == "__main__":
    main()
