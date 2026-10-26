import { useMemo, useState } from 'react'
import EarthScreen from './EarthScreen'
import SkyScreen from './SkyScreen'
import { cities } from './data'
import { localInputToDate } from './astronomy'
import type { Location } from './types'

const now = new Date()
const dateDefault = now.toISOString().slice(0, 10)
const timeDefault = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

export default function App() {
  const [screen, setScreen] = useState<'earth' | 'sky'>('earth')
  const [location, setLocation] = useState<Location>(cities[0])
  const [date, setDate] = useState(dateDefault)
  const [time, setTime] = useState(timeDefault)
  const observedAt = useMemo(() => localInputToDate(date, time, location.timeZone), [date, time, location.timeZone])

  return <div className={`app screen-${screen}`}>
    {screen === 'earth'
      ? <EarthScreen location={location} date={date} time={time} onLocation={setLocation} onDate={setDate} onTime={setTime} onOpenSky={() => setScreen('sky')} />
      : <SkyScreen location={location} date={observedAt} onDate={(next) => {
          const parts = new Intl.DateTimeFormat('en-CA', { timeZone: location.timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(next)
          const v = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
          setDate(`${v('year')}-${v('month')}-${v('day')}`)
          setTime(`${v('hour')}:${v('minute')}`)
        }} onBack={() => setScreen('earth')} />}
  </div>
}
