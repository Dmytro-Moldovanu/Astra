import type { Language } from './i18n'
import { languages } from './i18n'

type Props = { language: Language; onChange: (language: Language) => void }

export default function LanguagePicker({ language, onChange }: Props) {
  return (
    <nav className="language-picker" aria-label="Language / Мова / Sprache">
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          className={language === code ? 'active' : ''}
          onClick={() => onChange(code)}
          aria-label={code === 'de' ? 'Deutsch' : code === 'uk' ? 'Українська' : 'British English'}
          title={code === 'de' ? 'Deutsch' : code === 'uk' ? 'Українська' : 'English (UK)'}
          aria-pressed={language === code}
        >
          {code === 'de' ? '🇩🇪' : code === 'uk' ? '🇺🇦' : '🇬🇧'}
        </button>
      ))}
    </nav>
  )
}
