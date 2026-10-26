import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import tzLookup from 'tz-lookup'
import { cities } from './data'
import type { Location } from './types'

type Props = {
  location: Location
  date: string
  time: string
  onLocation: (location: Location) => void
  onDate: (date: string) => void
  onTime: (time: string) => void
  onOpenSky: () => void
}

export default function EarthScreen(props: Props) {
  const globeRef = useRef<any>(null)
  const screenRef = useRef<HTMLElement | null>(null)
  const panelRef = useRef<HTMLElement | null>(null)
  const parallaxFrame = useRef<number | null>(null)
  const [selected, setSelected] = useState(true)
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

  // Anchor the information card to the apparent edge of the atmospheric glow.
  // The visual radius changes with zoom; a fixed vw offset cannot track it.
  const updatePanelPosition = () => {
    const globe = globeRef.current
    const camera = globe?.camera?.()
    const screen = screenRef.current
    if (!camera || !screen) return

    const globeRadius: number = globe.getGlobeRadius()
    const atmosphereRadius = globeRadius * 1.11
    const cameraDistance: number = camera.position.length()
    if (cameraDistance <= atmosphereRadius) return

    const halfFov = (camera.fov * Math.PI) / 360
    const radiusPx = (viewport.height / 2) *
      (atmosphereRadius / Math.sqrt(cameraDistance ** 2 - atmosphereRadius ** 2)) /
      Math.tan(halfFov)

    if (!Number.isFinite(radiusPx)) return
    const panelWidth = panelRef.current?.offsetWidth ?? 340
    const nearAtmosphere = viewport.width / 2 + radiusPx + 6
    const keepOnScreen = viewport.width - panelWidth - 16
    screen.style.setProperty('--panel-left', `${Math.round(Math.min(nearAtmosphere, keepOnScreen))}px`)
  }

  useEffect(() => {
    const frame = requestAnimationFrame(updatePanelPosition)
    return () => cancelAnimationFrame(frame)
  }, [viewport.width, viewport.height])

  const marker = useMemo(() => [{ ...props.location, size: .75 }], [props.location])

  const choose = (location: Location) => {
    props.onLocation(location)
    setSelected(true)
    globeRef.current?.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.65 }, 800)
  }

  return <main className="earth-screen" ref={screenRef}>
    <div className="earth-background" aria-hidden="true" />
    <div className="brand"><span className="brand-mark">✦</span> ASTRA</div>
    <header className="hero-copy">
      <p className="eyebrow">INTERAKTIVER STERNENATLAS</p>
      <h1>Entdecke den <span>Sternenhimmel</span></h1>
      <p>Wähle deinen Beobachtungsort und entdecke die Sterne über dir.</p>
    </header>

    <div className="globe-wrap" aria-label="Interaktive Erde zur Ortsauswahl">
      <div className="globe-aura" />
      <Globe
        ref={globeRef}
        onGlobeReady={updatePanelPosition}
        onZoom={updatePanelPosition}
        width={viewport.width} height={viewport.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="./earth-day.jpg"
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
          choose({ name: 'Gewählter Ort', lat, lng, timeZone })
        }}
      />
      <div className="drag-hint">↔ Ziehen zum Drehen · Scrollen zum Zoomen</div>
    </div>

    <aside ref={panelRef} className={`location-panel ${selected ? 'visible' : ''}`}>
      <div className="panel-head">
        <div><p className="eyebrow">BEOBACHTUNGSORT</p><h2>{props.location.name}</h2></div>
        <span className="live-dot" />
      </div>
      <div className="coordinates">
        <div><small>BREITENGRAD</small><strong>{Math.abs(props.location.lat).toFixed(4)}° {props.location.lat >= 0 ? 'N' : 'S'}</strong></div>
        <div><small>LÄNGENGRAD</small><strong>{Math.abs(props.location.lng).toFixed(4)}° {props.location.lng >= 0 ? 'O' : 'W'}</strong></div>
      </div>
      <div className="quick-cities">
        <small>SCHNELLAUSWAHL</small>
        <div>{cities.map((city) => <button key={city.name} className={city.name === props.location.name ? 'active' : ''} onClick={() => choose(city)}>{city.name}</button>)}</div>
      </div>
      <div className="date-time">
        <label>Datum<input type="date" value={props.date} onChange={(e) => props.onDate(e.target.value)} /></label>
        <label>Uhrzeit<input type="time" value={props.time} onChange={(e) => props.onTime(e.target.value)} /></label>
      </div>
      <div className="timezone">◷ {props.location.timeZone}</div>
      <button className="primary-button" onClick={props.onOpenSky}>Sternenhimmel anzeigen <span>→</span></button>
    </aside>

    <footer className="earth-footer"><span>ECHTE ASTRONOMISCHE DATEN</span><span>·</span><span>POSITION & ZEIT WÄHLBAR</span></footer>
  </main>
}
