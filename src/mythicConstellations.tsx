/** Illustrationen: Johan Meuris / Stellarium, Free Art License 1.3.
 * https://github.com/Stellarium/stellarium-skycultures/tree/master/western
 * https://artlibre.org/licence/lal/en/
 */
export const mythicFigures: Record<string, { caption: string }> = {
  "And": {
    "caption": "Die gefesselte Prinzessin"
  },
  "Cas": {
    "caption": "Die Königin auf ihrem Thron"
  },
  "Cep": {
    "caption": "Der König mit Krone und Zepter"
  },
  "Per": {
    "caption": "Perseus mit Medusenhaupt"
  },
  "Peg": {
    "caption": "Das geflügelte Pferd"
  },
  "Ori": {
    "caption": "Orion, der Jäger"
  },
  "Her": {
    "caption": "Herakles mit seiner Keule"
  },
  "Cyg": {
    "caption": "Der Schwan im Flug"
  },
  "Aql": {
    "caption": "Der Adler mit ausgebreiteten Flügeln"
  },
  "Dra": {
    "caption": "Der Drache"
  },
  "Leo": {
    "caption": "Der Löwe"
  },
  "Tau": {
    "caption": "Der Stier"
  },
  "Gem": {
    "caption": "Kastor und Pollux"
  },
  "UMa": {
    "caption": "Die große Bärin"
  },
  "UMi": {
    "caption": "Der Kleine Bär"
  },
  "Sco": {
    "caption": "Der Skorpion"
  },
  "Boo": {
    "caption": "Der Hirte mit seinem Stab"
  },
  "Aqr": {
    "caption": "Der Wasserträger mit Krug"
  },
  "Ari": {
    "caption": "Der Widder"
  },
  "Cnc": {
    "caption": "Der Krebs"
  },
  "CMa": {
    "caption": "Der große Hund"
  },
  "Lyr": {
    "caption": "Die Leier des Orpheus"
  },
  "Oph": {
    "caption": "Der Schlangenträger"
  },
  "Sgr": {
    "caption": "Der Zentaur mit Bogen"
  },
  "Cet": {
    "caption": "Das Seeungeheuer"
  }
}

export const illustratedConstellationIds = Object.keys(mythicFigures)

export function MythicSketch({ id, large = false }: { id: string; large?: boolean }) {
  const figure = mythicFigures[id]
  if (!figure) return null
  return (
    <img
      className={large ? 'mythic-engraving large' : 'mythic-engraving'}
      src={`./constellation-art/${id}.webp`}
      alt={figure.caption}
      loading="lazy"
      decoding="async"
    />
  )
}
