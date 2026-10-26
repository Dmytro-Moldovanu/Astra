import { useEffect, useMemo, useRef, useState } from 'react'
import { formatLocal, toHorizontal } from './astronomy'
import { highlightedStarNames } from './data'
import type { Constellation, Location, Selection, Star } from './types'

type CatalogData = { stars: Star[]; constellations: Constellation[] }
type ScreenPoint = { x: number; y: number; star: Star }
type ScreenLine = { x1: number; y1: number; x2: number; y2: number; constellation: Constellation }

const STAR_ALIASES: Record<string, string> = { Betelgeuse: 'Beteigeuze', Polaris: 'Polarstern' }

async function loadCatalog(): Promise<CatalogData> {
  const [starsRaw, linesRaw, constellationsRaw, namesRaw] = await Promise.all([
    fetch('./data/stars.6.json').then((r) => r.json()),
    fetch('./data/constellations.lines.json').then((r) => r.json()),
    fetch('./data/constellations.json').then((r) => r.json()),
    fetch('./data/starnames.json').then((r) => r.json()),
  ])
  const stars: Star[] = starsRaw.features.map((f: any) => ({
    id: Number(f.id), ra: f.geometry.coordinates[0], dec: f.geometry.coordinates[1],
    mag: Number(f.properties.mag), bv: Number(f.properties.bv ?? 0), name: namesRaw[String(f.id)]?.name || undefined,
  }))
  const meta = new Map<string, any>(constellationsRaw.features.map((f: any) => [String(f.id), f]))
  const constellations: Constellation[] = linesRaw.features.map((f: any) => {
    const info: any = meta.get(String(f.id))
    return {
      id: String(f.id), name: info?.properties?.de || info?.properties?.name || String(f.id),
      latin: info?.properties?.la || info?.properties?.name || String(f.id),
      center: info?.geometry?.coordinates ?? [0, 0], lines: f.geometry.coordinates,
    }
  })
  return { stars, constellations }
}

function distanceToSegment(px: number, py: number, line: ScreenLine) {
  const dx = line.x2 - line.x1, dy = line.y2 - line.y1
  const len = dx * dx + dy * dy
  const t = len ? Math.max(0, Math.min(1, ((px - line.x1) * dx + (py - line.y1) * dy) / len)) : 0
  return Math.hypot(px - (line.x1 + t * dx), py - (line.y1 + t * dy))
}

export default function SkyScreen({ location, date, onDate, onBack }: {
  location: Location; date: Date; onDate: (date: Date) => void; onBack: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hitRef = useRef<{ stars: ScreenPoint[]; lines: ScreenLine[] }>({ stars: [], lines: [] })
  const dragRef = useRef<{ x: number; rotation: number } | null>(null)
  const [catalog, setCatalog] = useState<CatalogData | null>(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [showLines, setShowLines] = useState(true)
  const [showNames, setShowNames] = useState(true)
  const [hovered, setHovered] = useState<Selection>(null)
  const [selected, setSelected] = useState<Selection>(null)

  useEffect(() => { loadCatalog().then(setCatalog) }, [])

  const localHour = Number(new Intl.DateTimeFormat('de-DE', { timeZone: location.timeZone, hour: '2-digit', hourCycle: 'h23' }).format(date))
  const daytime = localHour >= 6 && localHour < 18

  const horizontal = useMemo(() => {
    if (!catalog) return null
    const starPoints = catalog.stars.map((star) => ({ star, pos: toHorizontal(star.ra, star.dec, date, location.lat, location.lng) }))
    const linePoints = catalog.constellations.map((constellation) => ({
      constellation,
      lines: constellation.lines.map((line) => line.map(([ra, dec]) => toHorizontal(ra, dec, date, location.lat, location.lng))),
      center: toHorizontal(constellation.center[0], constellation.center[1], date, location.lat, location.lng),
    }))
    return { starPoints, linePoints }
  }, [catalog, date, location.lat, location.lng])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !horizontal) return
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let frame = 0
    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, rect.width), height = Math.max(1, rect.height)
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr; canvas.height = height * dpr
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Keep the astronomical layer transparent so the subtle decorative backdrop stays separate.
      ctx.clearRect(0, 0, width, height)
      const radius = Math.min(width, height) * .54
      const project = (azimuth: number, altitude: number) => {
        const r = ((90 - altitude) / 90) * radius * zoom
        const a = (azimuth + rotation) * Math.PI / 180
        return { x: width / 2 + Math.sin(a) * r, y: height / 2 - Math.cos(a) * r }
      }
      const lines: ScreenLine[] = []
      if (showLines) {
        horizontal.linePoints.forEach(({ constellation, lines: sourceLines }) => sourceLines.forEach((line) => {
          for (let i = 1; i < line.length; i += 1) {
            if (line[i - 1].altitude < 0 || line[i].altitude < 0) continue
            const a = project(line[i - 1].azimuth, line[i - 1].altitude)
            const b = project(line[i].azimuth, line[i].altitude)
            const active = selected?.kind === 'constellation' && selected.constellation.id === constellation.id
            const hover = hovered?.kind === 'constellation' && hovered.constellation.id === constellation.id
            ctx.strokeStyle = active ? 'rgba(151,117,250,.92)' : hover ? 'rgba(120,200,255,.72)' : 'rgba(120,200,255,.14)'
            ctx.lineWidth = active ? 2 : hover ? 1.6 : .8
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, constellation })
          }
        }))
      }
      const stars: ScreenPoint[] = []
      horizontal.starPoints.forEach(({ star, pos }) => {
        if (pos.altitude < 0) return
        const p = project(pos.azimuth, pos.altitude)
        if (p.x < -10 || p.y < -10 || p.x > width + 10 || p.y > height + 10) return
        const notable = star.name && highlightedStarNames.has(star.name)
        const size = Math.max(.45, Math.min(4.6, (6.4 - star.mag) * .48)) * (notable ? 1.24 : 1)
        if (notable) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4)
          glow.addColorStop(0, 'rgba(180,220,255,.55)'); glow.addColorStop(1, 'rgba(120,180,255,0)')
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2); ctx.fill()
        }
        const warmth = star.bv > 1 ? '#ffd6af' : star.bv < 0 ? '#b9d8ff' : '#f7faff'
        ctx.fillStyle = warmth; ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fill()
        stars.push({ x: p.x, y: p.y, star })
        if (showNames && notable) {
          ctx.fillStyle = 'rgba(247,250,255,.78)'; ctx.font = '11px Inter, sans-serif'
          ctx.fillText(STAR_ALIASES[star.name!] || star.name!, p.x + size + 5, p.y - 4)
        }
      })
      if (showLines) horizontal.linePoints.forEach(({ constellation, center }) => {
        if (center.altitude < 0) return
        const isHover = hovered?.kind === 'constellation' && hovered.constellation.id === constellation.id
        const isActive = selected?.kind === 'constellation' && selected.constellation.id === constellation.id
        if (isHover || isActive) {
          const p = project(center.azimuth, center.altitude)
          ctx.textAlign = 'center'; ctx.fillStyle = isActive ? '#c9baff' : '#9ddaff'; ctx.font = '600 13px Inter, sans-serif'
          ctx.fillText(constellation.name, p.x, p.y); ctx.textAlign = 'left'
        }
      })
      ctx.strokeStyle = 'rgba(120,200,255,.28)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(width / 2, height / 2, radius * zoom, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = 'rgba(210,230,255,.55)'; ctx.font = '10px Inter, sans-serif'; ctx.textAlign = 'center'
      ;[['N', 0], ['O', 90], ['S', 180], ['W', 270]].forEach(([label, az]) => {
        const p = project(Number(az), 0); ctx.fillText(String(label), p.x, p.y + 4)
      })
      ctx.textAlign = 'left'
      hitRef.current = { stars, lines }
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [horizontal, rotation, zoom, showLines, showNames, hovered, selected])

  const hitTest = (x: number, y: number): Selection => {
    let nearestStar: ScreenPoint | undefined, starDistance = 12
    hitRef.current.stars.forEach((point) => { const d = Math.hypot(x - point.x, y - point.y); if (d < starDistance) { nearestStar = point; starDistance = d } })
    if (nearestStar && nearestStar.star.name && highlightedStarNames.has(nearestStar.star.name)) return { kind: 'star', star: nearestStar.star }
    let nearestLine: ScreenLine | undefined, lineDistance = 8
    hitRef.current.lines.forEach((line) => { const d = distanceToSegment(x, y, line); if (d < lineDistance) { nearestLine = line; lineDistance = d } })
    return nearestLine ? { kind: 'constellation', constellation: nearestLine.constellation } : null
  }

  const pointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  return <main className="sky-screen">
    <canvas ref={canvasRef}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); dragRef.current = { x: e.clientX, rotation } }}
      onPointerMove={(e) => {
        if (dragRef.current) setRotation(dragRef.current.rotation + (e.clientX - dragRef.current.x) * .25)
        else { const p = pointer(e); setHovered(hitTest(p.x, p.y)) }
      }}
      onPointerUp={(e) => { const wasDrag = dragRef.current && Math.abs(e.clientX - dragRef.current.x) > 4; dragRef.current = null; if (!wasDrag) { const p = pointer(e); const hit = hitTest(p.x, p.y); setSelected(hit); if (hit?.kind === 'constellation') { const h = toHorizontal(hit.constellation.center[0], hit.constellation.center[1], date, location.lat, location.lng); setRotation(-h.azimuth) } } }}
      onPointerLeave={() => { dragRef.current = null; setHovered(null) }}
      onWheel={(e) => { e.preventDefault(); setZoom((z) => Math.max(.72, Math.min(1.6, z - e.deltaY * .0008))) }}
      aria-label="Interaktiver Sternenhimmel" />

    <div className="sky-brand"><span>✦</span> ASTRA <small>STERNENATLAS</small></div>
    <div className="sky-toolbar glass">
      <button onClick={onBack}>← <span>Zurück zur Erde</span></button>
      <i />
      <button className={showLines ? 'active' : ''} onClick={() => setShowLines(!showLines)}>⌁ <span>Sternbilder</span></button>
      <button className={showNames ? 'active' : ''} onClick={() => setShowNames(!showNames)}>Aa <span>Sternnamen</span></button>
      <i />
      <button onClick={() => onDate(new Date(date.getTime() - 3600000))}>−1h</button>
      <button onClick={() => onDate(new Date(date.getTime() + 3600000))}>+1h</button>
      <button onClick={() => { setRotation(0); setZoom(1); setSelected(null) }}>↻ <span>Ansicht zurücksetzen</span></button>
    </div>

    <div className="observation glass"><span className="live-dot" /><div><strong>{location.name}</strong><small>{formatLocal(date, location.timeZone)}</small></div></div>
    {daytime && <div className="day-warning">☀ Tageszeit gewählt: Lehransicht ohne Sonnenlichtsimulation</div>}
    {!catalog && <div className="loading">Sternkatalog wird geladen …</div>}
    <div className="sky-hint">Ziehen zum Drehen · Scrollen zum Zoomen · Sterne und Sternbilder anklicken</div>

    {selected && <aside className="info-card glass">
      <button className="close" onClick={() => setSelected(null)}>×</button>
      <p className="eyebrow">{selected.kind === 'star' ? 'STERN' : 'STERNBILD'}</p>
      {selected.kind === 'star' ? <>
        <h2>{STAR_ALIASES[selected.star.name || ''] || selected.star.name}</h2>
        <p>Ein markanter Stern im sichtbaren Sternenhimmel.</p>
        <dl><div><dt>Scheinbare Helligkeit</dt><dd>{selected.star.mag.toFixed(2)} mag</dd></div><div><dt>Rektaszension</dt><dd>{(((selected.star.ra + 360) % 360) / 15).toFixed(2)} h</dd></div><div><dt>Deklination</dt><dd>{selected.star.dec.toFixed(2)}°</dd></div></dl>
      </> : <>
        <h2>{selected.constellation.name}</h2>
        <p className="latin">{selected.constellation.latin}</p>
        <p>Dieses Sternbild gehört zu den 88 offiziell festgelegten Sternbildern.</p>
        <dl><div><dt>Kürzel</dt><dd>{selected.constellation.id}</dd></div><div><dt>Sichtbare Linien</dt><dd>{selected.constellation.lines.length}</dd></div></dl>
      </>}
    </aside>}

    <div className="data-credit">Stern- und Sternbilddaten: D3-Celestial · © Olaf Frohn · BSD-3-Clause</div>
  </main>
}
