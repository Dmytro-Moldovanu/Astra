/** Original restrained line-art motifs inspired by classical star atlases.
 * These are interpretive illustrations, not astronomical star positions.
 */
export type MythicFigure = {
  caption: string
  paths: string[]
  details?: string[]
}

export const mythicFigures: Record<string, MythicFigure> = {
  And: { caption: 'Die gefesselte Prinzessin', paths: ['M40 24c-6 0-9-5-8-10 2-7 14-6 16 0 1 5-2 10-8 10z', 'M32 26l-8 13-18-5M48 26l8 13 18-5M32 26l-4 28 12 8 12-8-4-28', 'M34 61l-3 14M46 61l3 14'], details:['M10 30v8m60-8v8','M20 37l-4 8m48-8 4 8'] },
  Cas: { caption: 'Die Königin auf ihrem Thron', paths: ['M27 29l3 25 20 0 3-25', 'M27 32L16 44v19M53 32l11 12v19M30 54L25 70M50 54l5 16', 'M32 24c-7-13 2-20 8-20s15 7 8 20c-2 6-14 6-16 0z'], details:['M29 12l5-7 6 6 6-6 5 7','M20 63h40'] },
  Cep: { caption: 'Der König mit Krone und Zepter', paths: ['M32 23c0-12 16-12 16 0 0 12-16 12-16 0z','M31 32l-8 10 3 24h28l3-24-8-10M24 43l-12 17M56 43l9-12', 'M65 14v53M60 20l5-9 5 9'], details:['M31 14l1-9 8 7 8-7 1 9','M33 43h14'] },
  Per: { caption: 'Perseus mit Schwert und Schild', paths: ['M32 22c0-12 16-12 16 0s-16 12-16 0z','M31 33l-9 21 18 9 18-9-9-21M29 48l-10 21M51 48l10 21', 'M22 38L9 20M9 20l-3-12M9 20l10-8', 'M57 37l15 5-4 15-14-7z'], details:['M33 34l7 7 7-7'] },
  Peg: { caption: 'Das geflügelte Pferd', paths: ['M12 57c8-18 25-23 40-19l10-9 12 2-6 7 5 7-10 6-11-5-9 14', 'M27 51l-3 20M44 54l8 17M16 59l-5 12','M28 35c-4-15 5-24 13-28-1 11 4 14 13 16-8 4-16 8-26 12z'], details:['M36 22l6-11','M64 35h2'] },
  Ori: { caption: 'Orion, der Jäger', paths: ['M33 20c0-10 14-10 14 0s-14 10-14 0z','M33 30l-6 24 13 7 13-7-6-24', 'M28 36L17 49M52 36l13-18M29 58l-9 16M51 58l9 16', 'M63 10l6 13M62 14l10-3'], details:['M35 43h10','M40 30v29'] },
  Her: { caption: 'Herakles mit seiner Keule', paths: ['M33 22a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M33 31l-12 23 19 8 17-9-10-22','M27 42L14 28M52 40l10 8','M31 59l-8 15M49 59l10 15','M12 25l-3-8 7-11 6 7-2 12-6 5z'],details:['M32 36l8 8 9-8'] },
  Cyg: { caption: 'Der Schwan im Flug', paths: ['M12 40c13 3 18-5 28 1 10-6 15 2 28-1','M14 38l12-17 14 20 14-20 12 17','M40 41l-4 22 4 10 4-10z','M40 41l5-16-5-8-5 8z'],details:['M29 28l-9-16M51 28l9-16'] },
  Aql: { caption: 'Der Adler mit ausgebreiteten Flügeln', paths: ['M39 24l-6-9 7-8 7 8-6 9','M39 27L16 18 4 32l15 1-9 10 19-5 11 15 11-15 19 5-9-10 15-1-12-14-23 9','M34 50l-5 18M46 50l5 18'], details:['M38 15l2-3 2 3'] },
  Dra: { caption: 'Der Drache', paths: ['M8 57c12-20 22-7 27-26 4-16 19-13 20-3 1 7-7 16-4 23 2 8 18 6 19-1','M55 27l8-12 9 2 3 10-10 5-10-5','M26 47l-7 17M45 37l-1 17'], details:['M63 24h2','M70 50l4 10'] },
  Leo: { caption: 'Der Löwe', paths: ['M24 32c-13-12-6-24 8-24 15 0 19 11 15 21-4 9-16 15-23 3z','M44 38l18-3 7 11-8 14-13-2-11 2-8-15','M48 57v15M61 57l5 15M31 47l-3 24','M65 36c9-4 9-14 5-18'],details:['M27 25h2M37 26h2','M31 33l5 3 4-5'] },
  Tau: { caption: 'Der Stier mit mächtigen Hörnern', paths: ['M25 37c0-16 30-16 30 0v17c0 18-30 18-30 0z','M25 34C10 26 9 13 15 5c1 13 12 17 19 17','M55 34C70 26 71 13 65 5c-1 13-12 17-19 17','M30 54l-7 18M50 54l7 18'],details:['M32 43h2m12 0h2','M35 55l5 4 5-4'] },
  Gem: { caption: 'Kastor und Pollux', paths: ['M18 21a7 7 0 1 0 14 0a7 7 0 1 0-14 0M48 21a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M18 32l-6 24h24l-6-24M48 32l-6 24h24l-6-24','M17 56l-5 18M31 56l5 18M47 56l-5 18M61 56l5 18','M35 37l10 0'],details:['M20 40h9M50 40h9'] },
  UMa: { caption: 'Die große Bärin', paths: ['M8 43l10-8 8 3 15-11 17 2 10 10-9 17-25 1-15-4-8 3z','M24 52l-4 20M40 54l-3 18M56 55l3 17','M62 40l11-6'],details:['M17 43h2','M23 37l-3-8'] },
  UMi: { caption: 'Der Kleine Bär', paths: ['M14 43l13-10 12 4 8-10 12 3 7 13-10 12-22-1-12 5z','M29 53l-3 18M48 53l4 18M60 44l12-4'],details:['M24 41h2','M27 33l-5-8'] },
  Sco: { caption: 'Der Skorpion', paths: ['M15 15l8 11-8 11M65 15l-8 11 8 11','M23 26l12 9h10l12-9M35 35l-7 17 12 12 12-12-7-17','M40 64c8 13 21 6 23-2l-8 2M63 62l7-8'],details:['M34 38l-8-7M46 38l8-7'] },
  Boo: { caption: 'Der Hirte mit seinem Stab', paths: ['M35 18a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M34 29l-10 26 18 8 15-9-8-25','M25 40l-14-12M55 40l8-11','M32 59l-10 16M49 59l10 16','M63 12v62c0 0 11-2 9-13'], details:['M36 37h12'] },
  Aqr: { caption: 'Der Wasserträger mit Krug', paths: ['M23 18a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M23 30l-5 27 12 7 12-7-6-27','M22 56l-8 18M38 56l9 18','M37 37l18-3 10 12-17 6z','M54 55c7 4 6 8 1 11 6 3 7 8 3 10'],details:['M51 38h12'] },
  Ari: { caption: 'Der Widder', paths: ['M26 34c-11-8-9-22 3-24 14-2 21 12 13 23','M42 33c11-8 22-5 22 8 0 11-9 16-19 12l-13-3-10 6','M23 55l-3 16M49 55l5 16','M37 34l-2-9'],details:['M55 42h2'] },
  Cnc: { caption: 'Der Krebs', paths: ['M28 35c-12 0-14 22 0 25h24c14-3 12-25 0-25z','M29 36l-10-17-12 6M51 36l10-17 12 6','M27 48l-17-4M27 55l-17 10M53 48l17-4M53 55l17 10'],details:['M32 38l-4-7M48 38l4-7'] },
  CMa: { caption: 'Der große Hund', paths: ['M19 42l13-10 19 4 14-10 8 10-12 11-5 16-12-2-6-10-11 10-7-9-9 3z','M30 54l-4 18M53 59l6 13','M65 27l-3-12'],details:['M67 33h2'] },
  Lyr: { caption: 'Die Leier des Orpheus', paths: ['M22 12c-13 8-10 22 0 26M58 12c13 8 10 22 0 26','M21 35l8 33 22 0 8-33M29 34h22M33 35v33M40 35v33M47 35v33','M18 13l9-6M62 13l-9-6'],details:['M29 60h22'] },
  Oph: { caption: 'Der Schlangenträger', paths: ['M34 16a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M34 28l-7 27 13 7 13-7-7-27','M30 55l-8 19M50 55l8 19','M28 34c-15-8-20 3-16 13 5 11 23 7 29-6 11-17 24-4 30-15'],details:['M61 29l8-8 5 8'] },
  Sgr: { caption: 'Der Zentaur mit Bogen', paths: ['M31 20a6 6 0 1 0 12 0a6 6 0 1 0-12 0','M30 29l-8 17 21 14 15-12-12-19','M32 49l-10 19M47 52l12 17','M50 29c20-10 29 21 9 31M50 29l25 35','M48 43l27 21'],details:['M52 30l14-2'] },
  Cet: { caption: 'Das Seeungeheuer', paths: ['M10 43c9-14 29-17 39-8 10-7 22-3 23 9-6 15-16 12-24 19-17 11-35 2-38-20z','M23 39l-11-17M30 36l5-18M47 39l15-12','M15 52l-7 8M30 62l-4 11'],details:['M64 42h2'] }
}

export const illustratedConstellationIds = Object.keys(mythicFigures)

/** Lightweight, original SVG sketches; no images loaded from external services. */
export function MythicSketch({ id, large = false }: { id: string; large?: boolean }) {
  const figure = mythicFigures[id]
  if (!figure) return null
  return <svg className={large ? 'mythic-sketch large' : 'mythic-sketch'} viewBox="0 0 80 80" fill="none"
    strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={figure.caption}>
    <circle cx="40" cy="40" r="37" stroke="rgba(136,177,221,.16)" strokeWidth=".6"/>
    <path d="M8 64l8 6M63 9l7 6" stroke="rgba(169,199,234,.28)" strokeWidth=".8"/>
    {figure.paths.map((d, i) => <path key={i} d={d} stroke="#b4c8df" strokeWidth="1.18"/>)}
    {figure.details?.map((d, i) => <path key={i} d={d} stroke="#aa91e8" strokeWidth=".92"/>)}
  </svg>
}
