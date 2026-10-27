import { useEffect, useMemo, useRef, useState } from 'react'
import { formatLocal, toHorizontal } from './astronomy'
import { highlightedStarNames } from './data'
import { constellationDescriptions } from './constellationDescriptions'
import { constellationMyths } from './constellationMyths'
import { MythicSketch, illustratedConstellationIds, mythicFigures } from './mythicConstellations'
import type { Constellation, Location, Selection, Star } from './types'
import { translate, placeName, locales, type Language } from './i18n'
import { translatedConstellations } from './constellationTranslations'
import { translatedMyths } from './mythTranslations'
import { translatedCaptions } from './captionTranslations'

type CatalogData = { stars: Star[]; constellations: Constellation[] }
type ScreenPoint = { x: number; y: number; star: Star }
type ScreenLine = { x1: number; y1: number; x2: number; y2: number; constellation: Constellation }
type SkyFocus = { x: number; y: number } // Positions relative to the unrotated sky radius

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
  // Serpens (head and tail) has two entries in the catalogue but one IAU ID.
  const metadata = new Map<string, any[]>()
  for (const info of constellationsRaw.features) {
    const id = String(info.id)
    const entries = metadata.get(id) ?? []
    entries.push(info)
    metadata.set(id, entries)
  }
  const merged = new Map<string, Constellation>()
  for (const feature of linesRaw.features) {
    const id = String(feature.id)
    const previous = merged.get(id)
    if (previous) {
      previous.lines.push(...feature.geometry.coordinates)
      continue
    }
    const infos = metadata.get(id) ?? []
    const info = infos[0]
    const centres: [number, number][] = infos
      .map((item: any) => item.geometry?.coordinates)
      .filter((value: unknown): value is [number, number] => Array.isArray(value) && value.length === 2)
    const center: [number, number] = centres.length > 1
      ? [
          centres.reduce((sum, point) => sum + point[0], 0) / centres.length,
          centres.reduce((sum, point) => sum + point[1], 0) / centres.length,
        ]
      : centres[0] ?? [0, 0]
    merged.set(id, {
      id, name: info?.properties?.de || info?.properties?.name || id,
      latin: info?.properties?.la || info?.properties?.name || id,
      center, partCenters: centres.length > 1 ? centres : undefined,
      lines: [...feature.geometry.coordinates],
    })
  }
  return { stars, constellations: [...merged.values()] }
}

function distanceToSegment(px: number, py: number, line: ScreenLine) {
  const dx = line.x2 - line.x1, dy = line.y2 - line.y1
  const len = dx * dx + dy * dy
  const t = len ? Math.max(0, Math.min(1, ((px - line.x1) * dx + (py - line.y1) * dy) / len)) : 0
  return Math.hypot(px - (line.x1 + t * dx), py - (line.y1 + t * dy))
}

export default function SkyScreen({ language, location, date, onDate, onBack }: {
  language: Language; location: Location; date: Date; onDate: (date: Date) => void; onBack: () => void
}) {
  const t = translate(language)
  const nameOf = (item: Constellation) => language === 'de' ? item.name : translatedConstellations[language][item.id]?.name || item.latin
  const descriptionOf = (item: Constellation) => language === 'de' ? constellationDescriptions[item.id] : translatedConstellations[language][item.id]?.description
  const mythOf = (item: Constellation) => language === 'de' ? constellationMyths[item.id] : translatedMyths[language][item.id]
  const captionOf = (id: string) => language === 'de' ? mythicFigures[id]?.caption : translatedCaptions[language][id]
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const infoCardRef = useRef<HTMLElement>(null)
  const hitRef = useRef<{ stars: ScreenPoint[]; lines: ScreenLine[] }>({ stars: [], lines: [] })
  const dragRef = useRef<{ x: number; rotation: number } | null>(null)
  const currentFocusRef = useRef<SkyFocus>({ x: 0, y: 0 })
  const atlasRevealRef = useRef(0) // Fade in real stars below the horizon while exploring
  const [focus, setFocus] = useState<SkyFocus | null>(null)
  const [catalog, setCatalog] = useState<CatalogData | null>(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [showLines, setShowLines] = useState(true)
  const [showNames, setShowNames] = useState(true)
  const [hovered, setHovered] = useState<Selection>(null)
  const [selected, setSelected] = useState<Selection>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
      partCenters: constellation.partCenters?.map(([ra, dec]) => toHorizontal(ra, dec, date, location.lat, location.lng)),
    }))
    return { starPoints, linePoints }
  }, [catalog, date, location.lat, location.lng])

  const visibleMythic = useMemo(() => {
    if (!horizontal) return []
    return horizontal.linePoints.filter(({ constellation, lines }) =>
      illustratedConstellationIds.includes(constellation.id) &&
      lines.some((line) => line.some((pos) => pos.altitude > 0))
    ).map(({ constellation, lines }) => {
      const points = lines.flat().filter((pos) => pos.altitude > 0)
      return { constellation, highest: Math.max(...points.map((p) => p.altitude)) }
    }).sort((a, b) => b.highest - a.highest)
  }, [horizontal])

  const openConstellation = (constellation: Constellation) => {
    setHovered(null)
    setSelected({ kind: 'constellation', constellation })
    setSidebarOpen(false)
    focusOnConstellation(constellation)
  }

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
      // The chart disc stays opaque, keeping decorative nebulae outside the real sky map.
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2, cy = height / 2
      const radius = Math.min(width, height) * .54
      // The round viewport remains still; only the sky chart pans and zooms inside it.
      const chartBackdrop = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      chartBackdrop.addColorStop(0, '#0a152d')
      chartBackdrop.addColorStop(1, '#050c1e')
      ctx.fillStyle = chartBackdrop
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      const angle = rotation * Math.PI / 180
      const intendedFocus = focus
        ? { x: focus.x * Math.cos(angle) - focus.y * Math.sin(angle),
            y: focus.x * Math.sin(angle) + focus.y * Math.cos(angle) }
        : { x: 0, y: 0 }
      // In atlas mode the real star catalog continues below the local horizon.
      // Only constrain normal sky viewing, where sub-horizon stars are hidden.
      const maxOffset = selected ? 1.75 : 1 - 1 / zoom
      const focusLength = Math.hypot(intendedFocus.x, intendedFocus.y)
      const focusRatio = focusLength > maxOffset && focusLength > 0 ? maxOffset / focusLength : 1
      const targetFocus = { x: intendedFocus.x * focusRatio, y: intendedFocus.y * focusRatio }
      const currentFocus = currentFocusRef.current
      const distance = Math.hypot(targetFocus.x - currentFocus.x, targetFocus.y - currentFocus.y)
      const moving = distance > .0006
      if (moving) {
        currentFocus.x += (targetFocus.x - currentFocus.x) * .22
        currentFocus.y += (targetFocus.y - currentFocus.y) * .22
      } else {
        currentFocus.x = targetFocus.x
        currentFocus.y = targetFocus.y
      }
      // Keep the extended catalog visible until the view has returned home;
      // the true horizon gradually comes back when the detail card closes.
      const revealTarget = selected ? 1 : Math.min(1, Math.hypot(currentFocus.x, currentFocus.y) * 3)
      const reveal = atlasRevealRef.current
      const revealMoving = Math.abs(revealTarget - reveal) > .004
      atlasRevealRef.current = revealMoving ? reveal + (revealTarget - reveal) * .18 : revealTarget
      const atlasOpacity = atlasRevealRef.current

      const project = (azimuth: number, altitude: number) => {
        const r = ((90 - altitude) / 90) * radius * zoom
        const a = (azimuth + rotation) * Math.PI / 180
        return {
          x: cx + Math.sin(a) * r - currentFocus.x * radius * zoom,
          y: cy - Math.cos(a) * r - currentFocus.y * radius * zoom,
        }
      }
      const onChart = (x: number, y: number) => Math.hypot(x - cx, y - cy) <= radius

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()
      const lines: ScreenLine[] = []
      if (showLines) {
        horizontal.linePoints.forEach(({ constellation, lines: sourceLines }) => sourceLines.forEach((line) => {
          for (let i = 1; i < line.length; i += 1) {
            const belowHorizon = line[i - 1].altitude < 0 || line[i].altitude < 0
            if (belowHorizon && atlasOpacity < .01) continue
            const a = project(line[i - 1].azimuth, line[i - 1].altitude)
            const b = project(line[i].azimuth, line[i].altitude)
            const active = selected?.kind === 'constellation' && selected.constellation.id === constellation.id
            const hover = hovered?.kind === 'constellation' && hovered.constellation.id === constellation.id
            ctx.strokeStyle = active ? 'rgba(151,117,250,.92)' : hover ? 'rgba(120,200,255,.72)' : 'rgba(120,200,255,.14)'
            ctx.lineWidth = active ? 2 : hover ? 1.6 : .8
            ctx.globalAlpha = belowHorizon ? atlasOpacity * .7 : 1
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            ctx.globalAlpha = 1
            if (!belowHorizon || atlasOpacity > .55) lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, constellation })
          }
        }))
      }
      const stars: ScreenPoint[] = []
      horizontal.starPoints.forEach(({ star, pos }) => {
        const belowHorizon = pos.altitude < 0
        if (belowHorizon && atlasOpacity < .01) return
        const p = project(pos.azimuth, pos.altitude)
        if (!onChart(p.x, p.y)) return
        ctx.globalAlpha = belowHorizon ? atlasOpacity * .8 : 1
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
        ctx.globalAlpha = 1
      })
      if (showLines) horizontal.linePoints.forEach(({ constellation, center, partCenters }) => {
        const isHover = hovered?.kind === 'constellation' && hovered.constellation.id === constellation.id
        const isActive = selected?.kind === 'constellation' && selected.constellation.id === constellation.id
        if (!isHover && !isActive) return
        // Serpens is split by Ophiuchus; label its head and tail separately.
        const places = constellation.id === 'Ser' && partCenters?.length === 2 ? partCenters : [center]
        places.forEach((position, index) => {
          if (position.altitude < 0 && atlasOpacity < .01) return
          const p = project(position.azimuth, position.altitude)
          const part = language === 'uk'
            ? (index === 0 ? 'голова' : 'хвіст')
            : language === 'en'
              ? (index === 0 ? 'head' : 'tail')
              : (index === 0 ? 'Kopf' : 'Schwanz')
          const label = places.length === 2 ? `${nameOf(constellation)} · ${part}` : nameOf(constellation)
          ctx.globalAlpha = position.altitude < 0 ? atlasOpacity * .8 : 1
          ctx.textAlign = 'center'; ctx.fillStyle = isActive ? '#c9baff' : '#9ddaff'; ctx.font = '600 13px Inter, sans-serif'
          ctx.fillText(label, p.x, p.y)
          ctx.textAlign = 'left'; ctx.globalAlpha = 1
        })
      })
      ctx.fillStyle = 'rgba(210,230,255,.55)'; ctx.font = '10px Inter, sans-serif'; ctx.textAlign = 'center'
      ctx.globalAlpha = 1 - atlasOpacity
      ;[['N', 0], ['O', 90], ['S', 180], ['W', 270]].forEach(([label, az]) => {
        const p = project(Number(az), 0)
        if (Math.hypot(p.x - cx, p.y - cy) <= radius + 4) ctx.fillText(String(label), p.x, p.y + 4)
      })
      ctx.globalAlpha = 1
      ctx.textAlign = 'left'
      ctx.restore()
      ctx.strokeStyle = 'rgba(120,200,255,.28)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke()
      hitRef.current = { stars, lines }

      // Position the details card beside the constellation's visible shape,
      // rather than at a fixed distance from the celestial map.
      const card = infoCardRef.current
      if (card && selected && width > 700) {
        const visiblePoints: { x: number; y: number }[] = []
        if (selected.kind === 'constellation') {
          const entry = horizontal.linePoints.find(({ constellation }) => constellation.id === selected.constellation.id)
          entry?.lines.forEach((line) => line.forEach((pos) => {
            if (pos.altitude < -45) return
            const p = project(pos.azimuth, pos.altitude)
            if (onChart(p.x, p.y)) visiblePoints.push(p)
          }))
        } else {
          const pos = horizontal.starPoints.find(({ star }) => star.id === selected.star.id)?.pos
          if (pos && pos.altitude >= 0) {
            const p = project(pos.azimuth, pos.altitude)
            if (onChart(p.x, p.y)) visiblePoints.push(p)
          }
        }

        if (visiblePoints.length) {
          const minX = Math.min(...visiblePoints.map((p) => p.x))
          const maxX = Math.max(...visiblePoints.map((p) => p.x))
          const minY = Math.min(...visiblePoints.map((p) => p.y))
          const maxY = Math.max(...visiblePoints.map((p) => p.y))
          const cardWidth = card.offsetWidth
          const cardHeight = card.offsetHeight
          const gap = 18
          // Prefer immediately to the right. Flip left only if the card
          // would run off screen; always keep the close button accessible.
          const rightOfSelection = maxX + gap
          const leftOfSelection = minX - cardWidth - gap
          const left = rightOfSelection + cardWidth + 12 <= width
            ? rightOfSelection
            : leftOfSelection >= 12 ? leftOfSelection : Math.max(12, width - cardWidth - 12)
          const top = Math.max(cardHeight / 2 + 12, Math.min(height - cardHeight / 2 - 12, (minY + maxY) / 2))
          card.style.setProperty('--info-left', `${Math.round(left)}px`)
          card.style.setProperty('--info-top', `${Math.round(top)}px`)
        }
      }

      if (moving || revealMoving) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [horizontal, rotation, zoom, focus, showLines, showNames, hovered, selected, language])

  const hitTest = (x: number, y: number): Selection => {
    const canvas = canvasRef.current
    if (canvas) {
      const { width, height } = canvas.getBoundingClientRect()
      if (Math.hypot(x - width / 2, y - height / 2) > Math.min(width, height) * .54) return null
    }
    let nearestStar: ScreenPoint | undefined, starDistance = 12
    hitRef.current.stars.forEach((point) => { const d = Math.hypot(x - point.x, y - point.y); if (d < starDistance) { nearestStar = point; starDistance = d } })
    if (nearestStar && nearestStar.star.name && highlightedStarNames.has(nearestStar.star.name)) return { kind: 'star', star: nearestStar.star }
    let nearestLine: ScreenLine | undefined, lineDistance = 8
    hitRef.current.lines.forEach((line) => { const d = distanceToSegment(x, y, line); if (d < lineDistance) { nearestLine = line; lineDistance = d } })
    return nearestLine ? { kind: 'constellation', constellation: nearestLine.constellation } : null
  }

  const focusOnPoint = (point: SkyFocus, targetZoom: number) => {
    // Explore the real sky catalog on both sides of the horizon.
    setZoom(Math.max(1.1, Math.min(5, targetZoom)))
    setFocus(point)
  }

  const focusOnConstellation = (constellation: Constellation) => {
    const entry = horizontal?.linePoints.find(({ constellation: item }) => item.id === constellation.id)
    if (!entry) return
    const visiblePoints: SkyFocus[] = []
    entry.lines.forEach((line) => line.forEach((pos) => {
      // The selected shape may cross the horizon: include its nearby hidden stars.
      if (pos.altitude < -45) return
      const r = (90 - pos.altitude) / 90
      const a = pos.azimuth * Math.PI / 180
      visiblePoints.push({ x: Math.sin(a) * r, y: -Math.cos(a) * r })
    }))
    if (!visiblePoints.length) return
    const xs = visiblePoints.map((p) => p.x), ys = visiblePoints.map((p) => p.y)
    const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), .36)
    // Fit the constellation instead of forcing a 5× crop near the horizon.
    const fitZoom = Math.max(1.2, Math.min(3.5, 1.3 / span))
    focusOnPoint({ x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 }, fitZoom)
  }

  const focusOnStar = (star: Star) => {
    const pos = horizontal?.starPoints.find(({ star: item }) => item.id === star.id)?.pos
    if (!pos || pos.altitude < 0) return
    const r = (90 - pos.altitude) / 90, a = pos.azimuth * Math.PI / 180
    focusOnPoint({ x: Math.sin(a) * r, y: -Math.cos(a) * r }, 2.5)
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
      onPointerUp={(e) => {
        const wasDrag = dragRef.current && Math.abs(e.clientX - dragRef.current.x) > 4
        dragRef.current = null
        if (wasDrag) return
        const p = pointer(e)
        const hit = hitTest(p.x, p.y)
        setSelected(hit)
        if (hit?.kind === 'constellation') openConstellation(hit.constellation)
        else if (hit?.kind === 'star') { setSidebarOpen(false); focusOnStar(hit.star) }
        else { setFocus(null); setZoom(1); setSidebarOpen(true) }
      }}
      onPointerLeave={() => { dragRef.current = null; setHovered(null) }}
      onWheel={(e) => {
        e.preventDefault()
        // The sky chart fills its circular frame at 1x. Going below 1x
        // shrank the stars while leaving a large empty border behind.
        const nextZoom = Math.max(1, Math.min(5, zoom - e.deltaY * .0008))
        if (nextZoom === zoom) return
        const rect = e.currentTarget.getBoundingClientRect()
        const radius = Math.min(rect.width, rect.height) * .54
        const x = (e.clientX - rect.left - rect.width / 2) / radius
        const y = (e.clientY - rect.top - rect.height / 2) / radius
        const insideChart = Math.hypot(x, y) <= 1
        const anchorX = insideChart ? x : 0, anchorY = insideChart ? y : 0
        const previous = currentFocusRef.current
        const delta = 1 / zoom - 1 / nextZoom
        let fx = previous.x + anchorX * delta
        let fy = previous.y + anchorY * delta
        // In atlas mode, real stars below the horizon fill the new viewport.
        // Only constrain navigation when the standard visible-sky mode is active.
        const maxOffset = selected ? 1.75 : 1 - 1 / nextZoom
        const distance = Math.hypot(fx, fy)
        if (distance > maxOffset && distance > 0) {
          fx *= maxOffset / distance
          fy *= maxOffset / distance
        }
        const a = rotation * Math.PI / 180
        currentFocusRef.current = { x: fx, y: fy }
        setFocus({ x: fx * Math.cos(a) + fy * Math.sin(a), y: -fx * Math.sin(a) + fy * Math.cos(a) })
        setZoom(nextZoom)
      }}
      aria-label={t.heroEnd} />

    <div className="sky-brand"><span>✦</span> ASTRA <small>{t.atlasName}</small></div>
    <div className="sky-toolbar glass">
      <button onClick={onBack}>← <span>{t.back}</span></button>
      <i />
      <button className={showLines ? 'active' : ''} onClick={() => setShowLines(!showLines)}>⌁ <span>{t.lines}</span></button>
      <button className={showNames ? 'active' : ''} onClick={() => setShowNames(!showNames)}>Aa <span>{t.starNames}</span></button>
      <i />
      <button onClick={() => onDate(new Date(date.getTime() - 3600000))}>−1h</button>
      <button onClick={() => onDate(new Date(date.getTime() + 3600000))}>+1h</button>
      <button onClick={() => { setRotation(0); setZoom(1); setFocus(null); setSelected(null); setSidebarOpen(true) }}>↻ <span>{t.reset}</span></button>
    </div>

    <div className="observation glass"><span className="live-dot" /><div><strong>{placeName(location.name, language)}</strong><small>{formatLocal(date, location.timeZone, locales[language])}</small></div></div>
    {daytime && <div className="day-warning">{t.day}</div>}
    {!catalog && <div className="loading">{t.loading}</div>}
    <div className="sky-hint">{t.skyHint}</div>
    {selected && <div className="sky-atlas-note">{t.atlas}</div>}

    {!selected && <section className={`mythic-panel glass ${sidebarOpen ? '' : 'collapsed'}`} aria-label={t.discover}>
      <button className="mythic-panel-toggle" onClick={() => setSidebarOpen((open) => !open)}
        aria-expanded={sidebarOpen}>✧ <span>{sidebarOpen ? t.panel : t.discover}</span> {sidebarOpen ? '−' : '+'}</button>
      {sidebarOpen && <>
        <p className="mythic-panel-subtitle">{t.panelSubtitle}</p>
        <div className="mythic-panel-list">
          {visibleMythic.length ? visibleMythic.map(({ constellation }) => <button
            key={constellation.id} className="mythic-item" onClick={() => openConstellation(constellation)}>
            <MythicSketch id={constellation.id} language={language}/>
            <span className="mythic-item-text"><strong>{nameOf(constellation)}</strong><small>{captionOf(constellation.id)}</small></span>
            <span className="mythic-item-arrow">›</span>
          </button>) : <p className="mythic-empty">{t.empty}</p>}
        </div>
        <p className="mythic-panel-footnote">{t.illustrations}: <a href="https://github.com/Stellarium/stellarium-skycultures/tree/master/western" target="_blank" rel="noopener noreferrer">Johan Meuris / Stellarium</a> · <a href="https://artlibre.org/licence/lal/en/" target="_blank" rel="noopener noreferrer">Free Art License 1.3</a></p>
      </>}
    </section>}

    {selected && <aside ref={infoCardRef} className="info-card glass">
      <button className="close" onClick={() => { setSelected(null); setFocus(null); setZoom(1); setSidebarOpen(true) }}>×</button>
      <p className="eyebrow">{selected.kind === 'star' ? t.star : t.constellation}</p>
      {selected.kind === 'star' ? <>
        <h2>{STAR_ALIASES[selected.star.name || ''] || selected.star.name}</h2>
        <p>{t.starDesc}</p>
        <dl><div><dt>{t.brightness}</dt><dd>{selected.star.mag.toFixed(2)} mag</dd></div><div><dt>{t.rightAscension}</dt><dd>{(((selected.star.ra + 360) % 360) / 15).toFixed(2)} h</dd></div><div><dt>{t.declination}</dt><dd>{selected.star.dec.toFixed(2)}°</dd></div></dl>
      </> : <>
        <h2>{nameOf(selected.constellation)}</h2>
        <p className="latin">{selected.constellation.latin}</p>
        {mythicFigures[selected.constellation.id] && <div className="mythic-detail-art"><MythicSketch id={selected.constellation.id} large language={language} /><span>{captionOf(selected.constellation.id)}</span></div>}
        <p>{descriptionOf(selected.constellation) ?? t.defaultDesc}</p>
        {mythOf(selected.constellation) && <section className="mythic-story" aria-label={t.mythology}>
          <h3>{t.mythology}</h3>
          <p>{mythOf(selected.constellation)}</p>
        </section>}
        <dl><div><dt>{t.abbreviation}</dt><dd>{selected.constellation.id}</dd></div><div><dt>{t.visibleLines}</dt><dd>{selected.constellation.lines.length}</dd></div></dl>
      </>}
    </aside>}

    <div className="data-credit">{t.dataCredit}: D3-Celestial · © Olaf Frohn · BSD-3-Clause</div>
  </main>
}
