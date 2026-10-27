import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import tzLookup from 'tz-lookup'
import { cities } from './data'
import { localInputToDate } from './astronomy'
import { useEarthLighting } from './earthLighting'
import type { Location } from './types'
import { translate, placeName, type Language } from './i18n'

type Props = {
  language: Language
  location: Location
  date: string
  time: string
  onLocation: (location: Location) => void
  onDate: (date: string) => void
  onTime: (time: string) => void
  onOpenSky: () => void
}

export default function EarthScreen(props: Props) {
  const t = translate(props.language)
  const globeRef = useRef<any>(null)
  const screenRef = useRef<HTMLElement | null>(null)
  const parallaxFrame = useRef<number | null>(null)
  const [selected, setSelected] = useState(true)
  const observedAt = useMemo(() => localInputToDate(props.date, props.time, props.location.timeZone), [props.date, props.time, props.location.timeZone])
  const earthTexture = useEarthLighting(observedAt)
  // The globe renderer occupies the entire viewport, not a fixed square.
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))

  useEffect(() => {
    const resize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const element = screenRef.current
    if (!element) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const update = () => {
      currentX += (targetX - currentX) * 0.09
      currentY += (targetY - currentY) * 0.09
      element.style.setProperty('--bg-x', `${currentX.toFixed(2)}px`)
      element.style.setProperty('--bg-y', `${currentY.toFixed(2)}px`)
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        parallaxFrame.current = requestAnimationFrame(update)
      } else {
        parallaxFrame.current = null
      }
    }

    const requestUpdate = () => {
      if (parallaxFrame.current == null) {
        parallaxFrame.current = requestAnimationFrame(update)
      }
    }

    const handleMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetX = -x * 22
      targetY = -y * 16
      requestUpdate()
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      requestUpdate()
    }

    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)

    return () => {
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
      if (parallaxFrame.current != null) cancelAnimationFrame(parallaxFrame.current)
    }
  }, [])

  useEffect(() => {
    const controls = globeRef.current?.controls()
    if (controls) {
      controls.autoRotate = true
      controls.autoRotateSpeed = .32
      controls.enablePan = false
      controls.minDistance = 150
      controls.maxDistance = 420
    }
  }, [])

  const marker = useMemo(() => [{ ...props.location, size: .75 }], [props.location])

  const choose = (location: Location) => {
    props.onLocation(location)
    setSelected(true)
    globeRef.current?.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.65 }, 800)
  }

  return <main className="earth-screen" ref={screenRef}>
    <div className="earth-background" aria-hidden="true" />
    <a className="earth-image-credit" href="https://esahubble.org/images/potm2608a/" target="_blank" rel="noopener noreferrer" aria-label="Bildquelle: ESA/Hubble & NASA, D. Gouliermis, CC BY 4.0">ESA/Hubble &amp; NASA, D. Gouliermis · CC BY 4.0</a>
    <div className="brand"><span className="brand-mark">✦</span> ASTRA</div>
    <header className="hero-copy">
      <p className="eyebrow">{t.heroEyebrow}</p>
      <h1>{t.heroStart} <span>{t.heroEnd}</span></h1>
      <p>{t.heroLead}</p>
    </header>

    <div className="globe-wrap" aria-label="{t.place}">
      <div className="globe-aura" />
      <Globe
        ref={globeRef}
        width={viewport.width} height={viewport.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={earthTexture}
        bumpImageUrl="./earth-bump.png"
        showAtmosphere atmosphereColor="#78c8ff" atmosphereAltitude={.11}
        pointsData={marker}
        pointLat="lat" pointLng="lng" pointColor={() => '#ffffff'}
        pointAltitude={.025} pointRadius="size"
        ringsData={marker} ringLat="lat" ringLng="lng"
        ringColor={() => (t: number) => `rgba(120,200,255,${1-t})`}
        ringMaxRadius={5} ringPropagationSpeed={2} ringRepeatPeriod={900}
        onGlobeClick={({ lat, lng }) => {
          const timeZone = tzLookup(lat, lng)
          choose({ name: t.chosen, lat, lng, timeZone })
        }}
      />
      <div className="drag-hint">{t.globeHint}</div>
    </div>

    <aside className={`location-panel ${selected ? 'visible' : ''}`}>
      <div className="panel-head">
        <div><p className="eyebrow">{t.place}</p><h2>{placeName(props.location.name, props.language)}</h2></div>
        <span className="live-dot" />
      </div>
      <div className="coordinates">
        <div><small>{t.latitude}</small><strong>{Math.abs(props.location.lat).toFixed(4)}° {props.location.lat >= 0 ? 'N' : 'S'}</strong></div>
        <div><small>{t.longitude}</small><strong>{Math.abs(props.location.lng).toFixed(4)}° {props.location.lng >= 0 ? 'O' : 'W'}</strong></div>
      </div>
      <div className="quick-cities">
        <small>{t.quick}</small>
        <div>{cities.map((city) => <button key={city.name} className={city.name === props.location.name ? 'active' : ''} onClick={() => choose(city)}>{placeName(city.name, props.language)}</button>)}</div>
      </div>
      <div className="date-time">
        <label>{t.date}<input type="date" value={props.date} onChange={(e) => props.onDate(e.target.value)} /></label>
        <label>{t.time}<input type="time" value={props.time} onChange={(e) => props.onTime(e.target.value)} /></label>
      </div>
      <div className="timezone">◷ {props.location.timeZone}</div>
      <button className="primary-button" onClick={props.onOpenSky}>{t.openSky} <span>→</span></button>
    </aside>

    <footer className="earth-footer"><span>{t.footOne}</span><span>·</span><span>{t.footTwo}</span></footer>
  </main>
}
