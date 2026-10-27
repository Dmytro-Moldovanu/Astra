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
  // Release the text cursor and native selection highlight before capture.
  await page.locator('input[type="time"]').evaluate((element) => element.blur())
  await settle(3500)
  // Genuine browser interaction: a wider, better balanced Earth overview.
  await page.mouse.move(880, 510)
  await page.mouse.wheel(0, 980)
  await page.mouse.move(1740, 950)
  await settle(3000)
  await screenshot('01-startseite.webp')

  await page.getByRole('button', { name: /Sternenhimmel anzeigen/ }).click()
  await page.locator('.mythic-panel-list .mythic-item').first().waitFor({ state: 'visible', timeout: 35000 })
  await settle(2200)
  await screenshot('02-sternenhimmel.webp')

  // Orion is distinctive and offers an attractive figure with its own legend.
  const constellation = page.locator('.mythic-item').filter({ hasText: /^Orion/ }).first()
  if (await constellation.isVisible()) {
    await constellation.click()
  } else {
    // Reliable fallback when the reference sky setup changes.
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
