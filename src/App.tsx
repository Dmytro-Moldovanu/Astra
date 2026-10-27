import { useMemo, useState } from 'react'
import EarthScreen from './EarthScreen'
import SkyScreen from './SkyScreen'
import { cities } from './data'
import { localInputToDate } from './astronomy'
import type { Location } from './types'
import { languages, type Language } from './i18n'

const now = new Date()
const dateDefault = now.toISOString().slice(0, 10)
const timeDefault = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

export default function App() {
  const [language, setLanguage] = useState<Language>(() => { try { const value = localStorage.getItem('astra-language'); return value === 'uk' || value === 'en' ? value : 'de' } catch { return 'de' } })
  const changeLanguage = (next: Language) => { setLanguage(next); document.documentElement.lang = next === 'en' ? 'en-GB' : next; try { localStorage.setItem('astra-language', next) } catch { /* storage disabled */ } }
  const [screen, setScreen] = useState<'earth' | 'sky'>('earth')
  const [location, setLocation] = useState<Location>(cities[0])
  const [date, setDate] = useState(dateDefault)
  const [time, setTime] = useState(timeDefault)
  const observedAt = useMemo(() => localInputToDate(date, time, location.timeZone), [date, time, location.timeZone])

  return <div className={`app screen-${screen}`}>
    <nav className="language-picker" aria-label="Language / Мова / Sprache">{languages.map((code) => <button key={code} type="button" className={language === code ? 'active' : ''} onClick={() => changeLanguage(code)} aria-label={code === 'de' ? 'Deutsch' : code === 'uk' ? 'Українська' : 'British English'} title={code === 'de' ? 'Deutsch' : code === 'uk' ? 'Українська' : 'English (UK)'} aria-pressed={language === code}>{code === 'de' ? '🇩🇪' : code === 'uk' ? '🇺🇦' : '🇬🇧'}</button>)}</nav>
    {screen === 'earth'
      ? <EarthScreen language={language} location={location} date={date} time={time} onLocation={setLocation} onDate={setDate} onTime={setTime} onOpenSky={() => setScreen('sky')} />
      : <SkyScreen language={language} location={location} date={observedAt} onDate={(next) => {
          const parts = new Intl.DateTimeFormat('en-CA', { timeZone: location.timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(next)
          const v = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
          setDate(`${v('year')}-${v('month')}-${v('day')}`)
          setTime(`${v('hour')}:${v('minute')}`)
        }} onBack={() => setScreen('earth')} />}
  </div>
}
