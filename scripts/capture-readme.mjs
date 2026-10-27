/**
 * Capture three real ASTRA application views for README, using Chromium.
 * Run locally with: npm install --no-save --package-lock=false playwright && node scripts/capture-readme.mjs
 * Screenshot recording is separate from production dependencies.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const destination = path.resolve('docs/screenshots')
const origin = process.env.ASTRA_PREVIEW_URL || 'http://127.0.0.1:5173'
const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--disable-gpu-sandbox'],
})
const page = await browser.newPage({
  viewport: { width: 1760, height: 1100 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
  locale: 'de-DE',
})
page.on('pageerror', (error) => console.error('Browser error:', error.message))

const settle = async (ms = 1500) => {
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(Array.from(document.images).map((img) =>
      img.complete ? undefined : new Promise((resolve) => { img.onload = resolve; img.onerror = resolve })
    ))
  })
  await page.waitForTimeout(ms)
}

const screenshot = async (filename) => {
  const output = path.join(destination, filename)
  const png = await page.screenshot({ type: 'png', fullPage: false, animations: 'disabled' })
  await sharp(png).webp({ quality: 84, effort: 5 }).toFile(output)
  console.log('Captured', output)
}

try {
  // Old README captures must never survive into the updated documentation.
  await rm(destination, { recursive: true, force: true })
  await mkdir(destination, { recursive: true })
  await page.goto(origin, { waitUntil: 'networkidle', timeout: 60000 })
  await page.locator('.globe-wrap canvas').waitFor({ state: 'visible', timeout: 30000 })
  await page.getByRole('button', { name: 'Augsburg', exact: true }).click()
  await page.locator('input[type="date"]').fill('2026-05-14')
  await page.locator('input[type="time"]').fill('14:00')
  await settle(5500)
  await screenshot('01-startseite.webp')

  await page.getByRole('button', { name: /Sternenhimmel anzeigen/ }).click()
  await page.locator('.mythic-panel-list .mythic-item').first().waitFor({ state: 'visible', timeout: 35000 })
  await settle(2200)
  await screenshot('02-sternenhimmel.webp')

  // Little Bear is visible all year from Augsburg and has a full mythology card.
  const constellation = page.locator('.mythic-item').filter({ hasText: 'Kleiner Bär' }).first()
  if (await constellation.count()) {
    await constellation.click()
  } else {
    await page.locator('.mythic-item').first().click()
  }
  await page.locator('.info-card .mythic-story').waitFor({ state: 'visible', timeout: 20000 })
  await settle(2600)
  await screenshot('03-sternbild-und-mythologie.webp')
  const files = await import('node:fs/promises').then(({readdir})=>readdir(destination))
  if (files.length !== 3) throw new Error('Expected exactly three new README screenshots')
} finally {
  await browser.close()
}
