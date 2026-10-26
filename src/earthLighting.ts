import { useEffect, useState } from 'react'
import { subsolarPoint } from './astronomy'

const WIDTH = 2048
const HEIGHT = 1024

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Could not load Earth texture: ${url}`))
    img.src = url
  })
}

// Load once. No remote runtime requests; both textures are hosted with ASTRA.
let sourceImages: Promise<[HTMLImageElement, HTMLImageElement]> | undefined
function getSources() {
  if (!sourceImages) {
    sourceImages = Promise.all([
      loadImage('./earth-day.jpg'),
      loadImage('./earth-night.png'),
    ]).catch((error) => {
      sourceImages = undefined
      throw error
    })
  }
  return sourceImages
}

function imagePixels(img: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT)
  return ctx.getImageData(0, 0, WIDTH, HEIGHT).data
}

/** A real day/night terminator from the Sun's date-dependent coordinates. */
function renderEarth(day: HTMLImageElement, night: HTMLImageElement, date: Date): string {
  const dayPixels = imagePixels(day)
  const nightPixels = imagePixels(night)
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')!
  const image = ctx.createImageData(WIDTH, HEIGHT)
  const out = image.data

  const sun = subsolarPoint(date)
  const sunLat = sun.lat * Math.PI / 180
  const sunLng = sun.lng * Math.PI / 180
  const sinSunLat = Math.sin(sunLat)
  const cosSunLat = Math.cos(sunLat)
  const lonCos = new Float32Array(WIDTH)
  for (let x = 0; x < WIDTH; x++) {
    const lng = (x / WIDTH * 2 - 1) * Math.PI
    lonCos[x] = Math.cos(lng - sunLng) * cosSunLat
  }

  for (let y = 0; y < HEIGHT; y++) {
    const lat = (0.5 - (y + 0.5) / HEIGHT) * Math.PI
    const sinLat = Math.sin(lat)
    const cosLat = Math.cos(lat)
    const row = y * WIDTH
    for (let x = 0; x < WIDTH; x++) {
      const cosZenith = sinLat * sinSunLat + cosLat * lonCos[x]
      // A soft dusk band (~12 degrees) avoids a sharp line across continents.
      const t = Math.max(0, Math.min(1, (cosZenith + .11) / .22))
      const sunlight = t * t * (3 - 2 * t)
      const darkness = 1 - sunlight
      const offset = (row + x) * 4
      for (let c = 0; c < 3; c++) {
        // Night texture holds city lights on a near-black surface; a small
        // residual of the daytime land texture preserves recognizable terrain.
        const nightValue = Math.min(255, nightPixels[offset + c] * 1.5 + dayPixels[offset + c] * .025)
        out[offset + c] = Math.round(dayPixels[offset + c] * sunlight + nightValue * darkness)
      }
      out[offset + 3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)
  return canvas.toDataURL('image/jpeg', .91)
}

export function useEarthLighting(date: Date) {
  const [texture, setTexture] = useState('./earth-day.jpg')
  const timestamp = date.getTime()
  useEffect(() => {
    let cancelled = false
    getSources()
      .then(([day, night]) => {
        if (!cancelled) setTexture(renderEarth(day, night, new Date(timestamp)))
      })
      .catch((error) => console.error('Earth lighting texture unavailable:', error))
    return () => { cancelled = true }
  }, [timestamp])
  return texture
}
