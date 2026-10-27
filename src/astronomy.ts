import { Body, Equator, Horizon, Observer, SiderealTime } from 'astronomy-engine'

export type HorizontalPoint = { azimuth: number; altitude: number }

export function toHorizontal(
  raDegrees: number,
  declination: number,
  date: Date,
  latitude: number,
  longitude: number,
): HorizontalPoint {
  const observer = new Observer(latitude, longitude, 0)
  const raHours = ((raDegrees % 360) + 360) % 360 / 15
  const point = Horizon(date, observer, raHours, declination, 'normal')
  return { azimuth: point.azimuth, altitude: point.altitude }
}

export function localInputToDate(date: string, time: string, timeZone: string): Date {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  let guess = Date.UTC(year, month - 1, day, hour, minute)

  for (let i = 0; i < 3; i += 1) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date(guess))
    const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === type)?.value)
    const represented = Date.UTC(value('year'), value('month') - 1, value('day'), value('hour'), value('minute'))
    guess += Date.UTC(year, month - 1, day, hour, minute) - represented
  }
  return new Date(guess)
}

export function formatLocal(date: Date, timeZone: string, locale = 'de-DE') {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(date)
}

/** Geographic position of the Sun directly overhead at a given UTC instant. */
export function subsolarPoint(date: Date): { lat: number; lng: number } {
  const sun = Equator(Body.Sun, date, new Observer(0, 0, 0), true, true)
  const longitude = ((sun.ra - SiderealTime(date)) * 15 + 540) % 360 - 180
  return { lat: sun.dec, lng: longitude }
}
