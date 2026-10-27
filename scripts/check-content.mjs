/** Prüft Katalogvollständigkeit, UI-Sprache und lokale Bildressourcen. */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const text = (file) => readFile(path.join(root, file), 'utf8')
const [descriptions, myths, figures] = await Promise.all([
  text('src/constellationDescriptions.ts'),
  text('src/constellationMyths.ts'),
  text('src/mythicConstellations.tsx'),
])
const ids = (content) => [...content.matchAll(/^\s*["']?([A-Za-z]{3})["']?\s*:/gm)].map((match) => match[1])
const descIds = ids(descriptions)
const mythIds = ids(myths)
const illustrationIds = [...figures.matchAll(/^\s*["']([A-Za-z]{3})["']\s*:\s*\{/gm)].map((match) => match[1])
const unique = (items) => new Set(items).size === items.length
function assert(condition, message) {
  if (!condition) { console.error('FEHLER: ' + message); process.exitCode = 1 }
}
assert(descIds.length === 88 && unique(descIds), '88 eindeutige Sternbildbeschreibungen erwartet')
assert(mythIds.length === 25 && unique(mythIds), '25 eindeutige Mythentexte erwartet')
assert(illustrationIds.length === 25 && unique(illustrationIds), '25 eindeutige Bildzuordnungen erwartet')
assert(mythIds.every((id) => illustrationIds.includes(id)), 'Mythen/Bildzuordnungen stimmen nicht überein')

const files = (await readdir(path.join(root, 'src'))).filter((name) => /\.(?:tsx?|css)$/.test(name))
for (const name of files) {
  const source = await text('src/' + name)
  assert(!/[\u0400-\u052F]/.test(source), 'Unerwartete kyrillische Schrift in src/' + name)
}
async function asset(file, signature, offset = 0) {
  try {
    const full = path.join(root, 'public', file)
    const buffer = await readFile(full)
    assert(buffer.length > 1000 && buffer.subarray(offset, offset + signature.length).equals(Buffer.from(signature)),
      'Ungültige oder leere Ressource: ' + file)
  } catch { assert(false, 'Bilddatei fehlt: public/' + file) }
}
for (const id of illustrationIds) await asset('constellation-art/' + id + '.webp', [87, 69, 66, 80], 8)
await asset('earth-day.jpg', [0xff, 0xd8])
await asset('earth-night.png', [0x89, 0x50, 0x4e, 0x47])
await asset('earth-bump.png', [0x89, 0x50, 0x4e, 0x47])
await asset('space-background.jpg', [0xff, 0xd8])
if (process.exitCode) process.exit(process.exitCode)
console.log('OK: 88 Sternbildtexte, 25 Mythen, 25 Illustrationen, Erd- und Weltraumtexturen, deutschsprachiger Quelltext.')
