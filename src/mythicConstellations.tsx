/** Original restrained line-art motifs inspired by classical star atlases.
 * These are interpretive illustrations, not astronomical star positions.
 */
export type MythicFigure = {
  caption: string
  paths: string[]
  details?: string[]
  hatching?: string[]
  anatomy?: string
}

export const mythicFigures: Record<string, MythicFigure> = {
  And: {
    "caption": "Andromeda in Ketten",
    "anatomy": "Die lange Sternkette lässt sich als Körper und ausgestreckte Arme Andromedas lesen. Die beiden äußeren Enden symbolisieren ihre Fesseln.",
    "paths": [
      "M35 23Q35 16 41 14Q48 15 47 24Q45 29 39 29Z",
      "M35 30L30 39 38 48 47 50 52 40 45 30",
      "M31 37Q21 35 11 32L7 29M49 37Q58 31 69 32L74 29",
      "M35 48L31 57 28 74M45 49L52 60 56 74",
      "M8 27l-3 5 5 4 4-6M69 29l5-4 5 6-4 5",
      "M30 40L25 48 23 57M49 40L54 50 58 57",
      "M34 22Q29 17 32 8M43 18Q52 12 53 8"
    ],
    "details": [
      "M35 32Q41 36 47 32",
      "M30 55l4 3M47 56l5 3",
      "M10 32l6 3M65 32l-4 3"
    ],
    "hatching": [
      "M32 39l11 9M35 38l10 7M38 37l10 7M31 44l8 7M43 48l5 5"
    ]
  },
  Cas: {
    "caption": "Kassiopeia auf ihrem sternförmigen Thron",
    "anatomy": "Die fünf hellen Sterne bilden das W der Kassiopeia. Es lässt sich als Rückenlehne, Arme und Sitz ihres Throns lesen.",
    "paths": [
      "M37 19C33 16 35 9 41 9C47 9 49 17 45 20Z",
      "M30 22L26 39 43 39 52 48 70 42",
      "M40 24L37 39 45 45 52 48 62 51",
      "M10 32L25 39 31 30",
      "M28 43L24 64 18 73M52 48L62 67 71 73",
      "M27 40L22 65 56 65 52 48M22 65L18 74M56 65L60 74",
      "M31 29L28 52Q41 56 53 50L50 27",
      "M34 12l-5-9 9 5 5-5 7 6-3 5"
    ],
    "details": [
      "M31 24l-8 12M49 26l7 15",
      "M28 45h18M26 53h24",
      "M27 39l-8-6M52 48l9-2",
      "M36 20l8 0"
    ],
    "hatching": [
      "M32 51l5 4M37 51l5 4M42 52l5 2M28 58h22"
    ]
  },
  Cep: { caption: 'Der König mit Krone und Zepter', paths: ['M32 23c0-12 16-12 16 0 0 12-16 12-16 0z','M31 32l-8 10 3 24h28l3-24-8-10M24 43l-12 17M56 43l9-12', 'M65 14v53M60 20l5-9 5 9'], details:['M31 14l1-9 8 7 8-7 1 9','M33 43h14'] },
  Per: {
    "caption": "Perseus mit Schwert und Medusenhaupt",
    "anatomy": "Die verzweigten Sternlinien zeigen die ausgestreckten Arme und Beine des Helden. Algol gehört zum getragenen Haupt der Medusa.",
    "paths": [
      "M43 21Q40 17 39 12Q41 5 48 7Q54 10 50 19L46 23",
      "M40 23L31 31 36 39 41 40 48 31",
      "M37 39L23 54 18 60M42 39L55 43 68 30",
      "M32 29Q23 30 14 30L9 23",
      "M37 40L35 45Q30 40 28 47Q30 56 39 56Q46 51 43 45Q42 40 37 40Z",
      "M35 45l-2-2M40 45l2-2M34 51l6 0",
      "M52 27L62 15 70 10M64 14l-3-11 8 3 5 7-10 1",
      "M42 39l3 15 8 8"
    ],
    "details": [
      "M38 15l5-1M47 14h2",
      "M30 43l-4-9M32 38l-5-7",
      "M31 42Q21 42 21 50M35 41Q29 36 26 38M42 43Q46 38 51 42",
      "M15 31l-8 1"
    ],
    "hatching": [
      "M38 27l-4 7M41 28l-3 7M46 28l-4 7M33 48l3 2M39 47l4 2"
    ]
  },
  Peg: {
    "caption": "Pegasus mit Flügeln am Großen Quadrat",
    "anatomy": "Das Große Pegasusquadrat bildet die zentrale Rumpfpartie. Die Sternlinie bis Enif führt über den Hals zum Kopf des geflügelten Pferdes.",
    "paths": [
      "M12 25Q25 18 38 26L39 47 12 48Z",
      "M37 26Q40 19 48 22Q57 24 62 32L57 43",
      "M38 46Q48 54 58 60Q64 63 71 57L75 57 73 62 65 67 59 66",
      "M12 47L9 68 16 74M34 48L30 68 36 74",
      "M37 26C31 14 33 4 42 4Q43 15 51 18L60 17Q57 27 48 32",
      "M38 26Q34 15 24 12Q31 24 32 30",
      "M58 61L54 70 59 75",
      "M70 56L74 51 77 54"
    ],
    "details": [
      "M69 57h2M42 31l-2 11M18 25l8 4",
      "M37 11l7 9M42 16l9 7M52 21l-7 6",
      "M12 32L8 28M24 47l3 11"
    ],
    "hatching": [
      "M17 33l6 5M20 29l6 4M25 23l8 5M39 19l6 5M43 22l6 3"
    ]
  },
  Ori: {
    "caption": "Orion mit Gürtel, Keule und Schild",
    "anatomy": "Beteigeuze und Bellatrix markieren die Schultern. Drei nahezu gerade stehende Sterne bilden den Gürtel; Rigel und Saiph liegen an den Beinen.",
    "paths": [
      "M35 23C33 20 32 14 36 10Q42 5 47 12Q49 20 44 24Z",
      "M37 26 Q31 29 28 35 L33 47 40 50 48 47 56 30 48 26",
      "M32 46 Q38 52 47 49 L47 57 40 60 34 56Z",
      "M34 56L29 69 32 74M46 56L48 67 46 75",
      "M28 35 Q20 37 17 30 L13 17M56 30L64 38 71 44",
      "M13 18L9 8 12 7 19 17 13 18",
      "M67 39C73 34 77 42 76 51L66 57 61 45Z",
      "M41 57l2 13-3 5"
    ],
    "details": [
      "M37 17l3 1 3-1M35 45l11 2",
      "M34 52l12 1",
      "M28 34l-6 9M52 32l8 11M24 43l-5 7",
      "M35 62l-4 8M46 62l4 8"
    ],
    "hatching": [
      "M35 31l3 7M38 31l3 7M41 31l3 7M31 40l6 3M49 40l6-5M68 44l4 2"
    ]
  },
  Her: {
    "caption": "Herakles, kniend mit Keule",
    "anatomy": "Das auffällige Sternviereck, der Schlussstein, bildet seinen Rumpf. Die äußeren Sternarme lassen sich als kräftige Arme und angewinkelte Beine deuten.",
    "paths": [
      "M49 17Q46 11 49 8Q55 5 58 12L56 20Q53 24 49 22",
      "M47 24L33 29 40 39 33 50 19 45",
      "M41 39Q44 49 53 56L34 68",
      "M33 50L27 57 12 43 19 37",
      "M47 26L61 18 70 18",
      "M69 18L71 5 76 3M70 6l-2-6M71 18l-6 16",
      "M31 29L20 28 15 28 10 37",
      "M34 65l7 9M14 45L7 47",
      "M30 30l-4 19 12 7"
    ],
    "details": [
      "M50 15h3M52 19l4 0",
      "M34 33l9 7M39 42l-6 7M43 45l6 4",
      "M20 37l-6 4"
    ],
    "hatching": [
      "M33 34l7 7M31 38l7 6M29 42l6 5M40 28l7 6M40 52l7 4"
    ]
  },
  Cyg: {
    "caption": "Der Schwan mit ausgebreiteten Schwingen",
    "anatomy": "Deneb kennzeichnet die Schwanzregion, Albireo den Kopf des Schwans. Die seitlichen Sternarme formen seine ausgebreiteten Flügel.",
    "paths": [
      "M10 61Q20 62 24 54Q29 45 37 41Q53 28 69 13",
      "M12 59L4 56 12 54 17 58",
      "M23 53 Q29 54 35 47L45 38",
      "M36 41 C27 35 22 27 13 8Q25 11 33 24L40 36",
      "M36 41 C45 48 56 55 74 70Q66 67 62 67L50 56L39 48",
      "M27 33Q15 27 6 13M30 35Q21 25 20 14M47 50Q57 64 68 70M44 47Q54 58 58 67",
      "M64 17l5-10 4-2-3 10"
    ],
    "details": [
      "M8 59l-3 1",
      "M31 41l7 2 8-6",
      "M32 33l-7-13M51 53l13 9",
      "M50 32l8-11"
    ],
    "hatching": [
      "M19 17l9 13M14 15l11 13M59 59l12 9M54 52l13 11"
    ]
  },
  Aql: { caption: 'Der Adler mit ausgebreiteten Flügeln', paths: ['M39 24l-6-9 7-8 7 8-6 9','M39 27L16 18 4 32l15 1-9 10 19-5 11 15 11-15 19 5-9-10 15-1-12-14-23 9','M34 50l-5 18M46 50l5 18'], details:['M38 15l2-3 2 3'] },
  Dra: { caption: 'Der Drache', paths: ['M8 57c12-20 22-7 27-26 4-16 19-13 20-3 1 7-7 16-4 23 2 8 18 6 19-1','M55 27l8-12 9 2 3 10-10 5-10-5','M26 47l-7 17M45 37l-1 17'], details:['M63 24h2','M70 50l4 10'] },
  Leo: {
    "caption": "Der Löwe mit Mähne und Schweif",
    "anatomy": "Die Sternsichel formt Kopf und Mähne des Löwen. Regulus liegt am unteren Ende der Sichel, Denebola am Hinterteil.",
    "paths": [
      "M60 26Q65 20 70 26Q76 32 71 37L73 42 66 44",
      "M61 27Q57 24 54 29Q49 32 50 42L58 53 70 46 73 39",
      "M50 38 Q42 34 29 37 L15 44 10 49",
      "M13 46Q23 49 33 47Q45 48 56 51",
      "M20 48L18 68 23 71M36 48L37 71 43 71M55 50L53 71 61 71",
      "M10 49Q4 44 10 33Q7 27 4 25",
      "M60 26L57 20 66 24 70 20 73 27",
      "M70 38l-5 3-6-2"
    ],
    "details": [
      "M65 33h2M69 35l4 1",
      "M53 34Q57 29 62 27M52 38l7-1M54 44l5 3",
      "M29 42l13 1M22 53l-1 10M43 54l-3 10",
      "M64 44l-5 5"
    ],
    "hatching": [
      "M56 29l-3 8M60 29l-4 9M64 28l-3 7M57 47l-3 4M30 45l8 2"
    ]
  },
  Tau: {
    "caption": "Der Stier mit V-förmigem Kopf und Hörnern",
    "anatomy": "Aldebaran markiert das Auge des Stiers; die Hyaden formen seinen V-förmigen Kopf. Die langen Sternarme weisen zu den Hornspitzen.",
    "paths": [
      "M45 38Q42 34 41 31L16 15",
      "M45 38Q34 34 10 28",
      "M16 15Q11 12 13 7L18 11Q22 18 22 22",
      "M10 28Q5 25 6 18L11 23",
      "M45 38Q47 46 57 50L70 50Q74 57 65 65",
      "M45 38Q39 42 38 52L46 58 54 52",
      "M38 52L34 65 29 73M55 52L61 66 67 73",
      "M34 38Q37 29 42 30L45 38Z",
      "M42 36l3 2-4 3",
      "M41 31Q34 25 27 25M53 43l8-2"
    ],
    "details": [
      "M38 35h2M44 39l4 1",
      "M45 42l-6 5M49 45l-8 7",
      "M59 51l5 5",
      "M16 15l5 7",
      "M10 28l5 3"
    ],
    "hatching": [
      "M50 45l-5 5M54 48l-6 5M58 50l-7 6M38 52l6 3"
    ]
  },
  Gem: { caption: 'Kastor und Pollux', paths: ['M18 21a7 7 0 1 0 14 0a7 7 0 1 0-14 0M48 21a7 7 0 1 0 14 0a7 7 0 1 0-14 0','M18 32l-6 24h24l-6-24M48 32l-6 24h24l-6-24','M17 56l-5 18M31 56l5 18M47 56l-5 18M61 56l5 18','M35 37l10 0'],details:['M20 40h9M50 40h9'] },
  UMa: { caption: 'Die große Bärin', paths: ['M8 43l10-8 8 3 15-11 17 2 10 10-9 17-25 1-15-4-8 3z','M24 52l-4 20M40 54l-3 18M56 55l3 17','M62 40l11-6'],details:['M17 43h2','M23 37l-3-8'] },
  UMi: { caption: 'Der Kleine Bär', paths: ['M14 43l13-10 12 4 8-10 12 3 7 13-10 12-22-1-12 5z','M29 53l-3 18M48 53l4 18M60 44l12-4'],details:['M24 41h2','M27 33l-5-8'] },
  Sco: {
    "caption": "Der Skorpion mit gekrümmtem Giftstachel",
    "anatomy": "Antares liegt am Körper des Skorpions. Die lange geschwungene Sternkette bildet seinen Schwanz, an dessen Ende der Stachel sitzt.",
    "paths": [
      "M66 19 C61 22 57 23 54 29 C49 38 44 43 42 51 C39 59 42 65 29 67 C19 70 10 63 11 58 C12 54 16 51 20 49",
      "M62 25 C56 30 53 34 49 42 C44 50 46 59 38 68 C32 74 17 74 9 64",
      "M11 58 L8 52 18 48 21 49 17 55",
      "M60 24 Q63 17 67 15 L72 10 L73 21 L68 24",
      "M54 29 Q52 22 48 20 L42 16 L43 25 L49 31",
      "M53 34l-13-9-10 4M50 40l-16-1-6 10M47 46l-15 7-4 10",
      "M57 34l9-5 8 3M53 40l11 0 7 8M49 48l12 9 7-2"
    ],
    "details": [
      "M57 27l-5-2M55 31l-7 2M49 42l-7 2M41 51l-7 0M40 60l-7 1M28 67l-4-4M19 66l-3-4",
      "M9 58l-5 0m4 6-4 4",
      "M69 16l5-10M45 18l-4-9"
    ],
    "hatching": [
      "M51 35l-8 6M49 37l-7 6M46 44l-7 5M40 55l-6 3M35 65l-5 3"
    ]
  },
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

/** Ten normalized mini star charts traced from D3-Celestial's original RA/Dec lines.
 * East is left, north is up; these remain educational diagrams, not a local sky projection.
 */
const referenceStarLines: Record<string, number[][][]> = {
  "Sco": [
    [
      [
        70,
        28.1
      ],
      [
        69.2,
        20.4
      ],
      [
        66.4,
        14.1
      ]
    ],
    [
      [
        69.2,
        20.4
      ],
      [
        57.7,
        26.9
      ],
      [
        53.1,
        28.8
      ],
      [
        49.6,
        32.7
      ],
      [
        41.7,
        46.1
      ],
      [
        40.7,
        54.4
      ],
      [
        39.2,
        63.9
      ],
      [
        29.6,
        65.9
      ],
      [
        15.7,
        65.3
      ],
      [
        10,
        59
      ],
      [
        12.8,
        56.6
      ],
      [
        17.7,
        52.3
      ]
    ]
  ],
  "Ori": [
    [
      [
        21.6,
        21
      ],
      [
        28.2,
        10
      ],
      [
        23.5,
        10.3
      ],
      [
        19.4,
        22.2
      ],
      [
        24.2,
        31.3
      ],
      [
        27.8,
        35.8
      ],
      [
        42.9,
        37.9
      ],
      [
        58,
        30.3
      ]
    ],
    [
      [
        56.2,
        47.2
      ],
      [
        58.4,
        45.7
      ],
      [
        59.9,
        39.4
      ],
      [
        60.6,
        36.7
      ],
      [
        60.2,
        32.8
      ],
      [
        58,
        30.3
      ],
      [
        57.3,
        23.5
      ],
      [
        53.2,
        19.8
      ],
      [
        50.6,
        19.4
      ]
    ],
    [
      [
        48.2,
        67.1
      ],
      [
        43.2,
        55.4
      ],
      [
        39.4,
        51.2
      ],
      [
        42.9,
        37.9
      ],
      [
        37.9,
        30.7
      ],
      [
        27.8,
        35.8
      ],
      [
        35.1,
        54.5
      ],
      [
        31.6,
        70
      ]
    ],
    [
      [
        35.1,
        54.5
      ],
      [
        37.3,
        53
      ],
      [
        39.4,
        51.2
      ]
    ]
  ],
  "Cas": [
    [
      [
        10,
        31.9
      ],
      [
        26.3,
        39.7
      ],
      [
        42.9,
        38.6
      ],
      [
        52.1,
        48.1
      ],
      [
        70,
        42.2
      ]
    ]
  ],
  "Cyg": [
    [
      [
        10,
        61.6
      ],
      [
        23.8,
        53.9
      ],
      [
        36.3,
        40.8
      ],
      [
        55.6,
        30.7
      ],
      [
        63.5,
        17.1
      ],
      [
        70,
        13.7
      ]
    ],
    [
      [
        26.3,
        30.4
      ],
      [
        36.3,
        40.8
      ],
      [
        49.7,
        51.6
      ],
      [
        62.9,
        66.3
      ]
    ]
  ],
  "Leo": [
    [
      [
        59,
        53.7
      ],
      [
        59.5,
        44.3
      ],
      [
        53.4,
        38.3
      ],
      [
        27,
        37
      ],
      [
        10,
        48.6
      ],
      [
        27,
        46.9
      ],
      [
        59,
        53.7
      ]
    ],
    [
      [
        53.4,
        38.3
      ],
      [
        55,
        31.4
      ],
      [
        66.6,
        26.3
      ],
      [
        70,
        30.7
      ]
    ]
  ],
  "Peg": [
    [
      [
        59.6,
        18.3
      ],
      [
        46.3,
        23
      ],
      [
        38,
        26.5
      ],
      [
        12,
        24.9
      ],
      [
        10,
        47.3
      ],
      [
        37.6,
        47.2
      ],
      [
        44.8,
        52.1
      ],
      [
        46.9,
        54.3
      ],
      [
        59.5,
        61.7
      ],
      [
        70,
        55.8
      ]
    ],
    [
      [
        37.6,
        47.2
      ],
      [
        38,
        26.5
      ],
      [
        43.5,
        32.1
      ],
      [
        44.9,
        33.8
      ],
      [
        60.8,
        30.9
      ],
      [
        69.8,
        30.4
      ]
    ]
  ],
  "Per": [
    [
      [
        22.1,
        58.4
      ],
      [
        18.2,
        59.1
      ],
      [
        16.3,
        52.9
      ],
      [
        16.8,
        46.2
      ],
      [
        21.8,
        42.1
      ],
      [
        22.7,
        33.8
      ],
      [
        25.2,
        33.2
      ],
      [
        30.1,
        30.5
      ],
      [
        37.8,
        24.7
      ],
      [
        43.4,
        20.9
      ],
      [
        42,
        25.9
      ],
      [
        36.1,
        30.9
      ],
      [
        35.9,
        38.5
      ],
      [
        36.5,
        44.7
      ],
      [
        35.2,
        46.8
      ],
      [
        37.7,
        48
      ],
      [
        40.2,
        46.7
      ],
      [
        39.8,
        44.5
      ],
      [
        36.5,
        44.7
      ]
    ],
    [
      [
        13.3,
        29.7
      ],
      [
        10,
        32.8
      ],
      [
        12.5,
        33.9
      ],
      [
        22.7,
        33.8
      ]
    ],
    [
      [
        36.1,
        30.9
      ],
      [
        46,
        31.5
      ],
      [
        70,
        29.2
      ]
    ]
  ],
  "And": [
    [
      [
        10,
        31.7
      ],
      [
        27.9,
        40.5
      ],
      [
        37.9,
        46.8
      ],
      [
        48.1,
        49.1
      ]
    ],
    [
      [
        32,
        56.6
      ],
      [
        35.2,
        55.5
      ],
      [
        38.1,
        48.9
      ],
      [
        37.9,
        46.8
      ],
      [
        38.7,
        43
      ],
      [
        58.1,
        30.4
      ],
      [
        70,
        31.7
      ]
    ],
    [
      [
        58.1,
        30.4
      ],
      [
        57.3,
        29
      ],
      [
        58.2,
        26.2
      ]
    ],
    [
      [
        27.9,
        40.5
      ],
      [
        32.1,
        36.7
      ],
      [
        34.4,
        33.3
      ],
      [
        27.9,
        25.2
      ],
      [
        18.5,
        23.4
      ]
    ],
    [
      [
        57.3,
        29
      ],
      [
        55.5,
        26.3
      ]
    ]
  ],
  "Her": [
    [
      [
        57,
        59.9
      ],
      [
        53.3,
        55.8
      ],
      [
        48.4,
        37.8
      ],
      [
        47.7,
        24.7
      ],
      [
        51.6,
        18.5
      ],
      [
        58,
        11.6
      ],
      [
        62.8,
        14
      ],
      [
        70,
        18.5
      ]
    ],
    [
      [
        48.4,
        37.8
      ],
      [
        39.9,
        39
      ]
    ],
    [
      [
        47.7,
        24.7
      ],
      [
        33.4,
        28.5
      ]
    ],
    [
      [
        15,
        27.7
      ],
      [
        29.5,
        27.9
      ],
      [
        33.4,
        28.5
      ],
      [
        39.9,
        39
      ],
      [
        33.4,
        49.8
      ],
      [
        19.4,
        44.7
      ],
      [
        14.3,
        42
      ],
      [
        10,
        42.8
      ]
    ],
    [
      [
        33.5,
        68.4
      ],
      [
        53.3,
        55.8
      ]
    ]
  ],
  "Tau": [
    [
      [
        10,
        28
      ],
      [
        37.9,
        36.4
      ],
      [
        41.2,
        37.5
      ],
      [
        45.2,
        38
      ],
      [
        43.7,
        34.5
      ],
      [
        41.2,
        31.6
      ],
      [
        15.1,
        14.5
      ]
    ],
    [
      [
        45.2,
        38
      ],
      [
        53.8,
        43.6
      ],
      [
        68.9,
        48.6
      ],
      [
        52.7,
        55.4
      ]
    ],
    [
      [
        68.9,
        48.6
      ],
      [
        70,
        49.9
      ],
      [
        64.6,
        65.5
      ]
    ]
  ]
}

export const illustratedConstellationIds = Object.keys(mythicFigures)

/** Lightweight, original SVG sketches; no images loaded from external services. */
export function MythicSketch({ id, large = false }: { id: string; large?: boolean }) {
  const figure = mythicFigures[id]
  if (!figure) return null
  return <>
    <img className={large ? 'mythic-engraving large' : 'mythic-engraving'} src={`./constellation-art/${id}.webp`} alt={figure.caption}
      onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling?.classList.remove('engraving-fallback') }} />
    <svg className={large ? 'mythic-sketch large engraving-fallback' : 'mythic-sketch engraving-fallback'} viewBox="0 0 80 80" fill="none"
    strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={figure.caption}>
    <title>{figure.caption}</title>
    <desc>{figure.anatomy || 'Symbolische Darstellung einer Figur am Sternenhimmel'}</desc>
    <circle cx="40" cy="40" r="37" stroke="rgba(136,177,221,.18)" strokeWidth=".65"/>
    <path d="M8 64l8 6M63 9l7 6" stroke="rgba(169,199,234,.28)" strokeWidth=".8"/>
    {figure.paths.map((d, i) => <path key={i} d={d} stroke="#b4c8df" strokeWidth="1.12"/>)}
    {figure.hatching?.map((d, i) => <path key={i} d={d} stroke="rgba(167,198,228,.48)" strokeWidth=".55"/>)}
    {figure.details?.map((d, i) => <path key={i} d={d} stroke="#aa91e8" strokeWidth=".92"/>)}
    {referenceStarLines[id]?.map((line, i) => <g key={i}>
      <polyline points={line.map(([x, y]) => `${x},${y}`).join(' ')} stroke="rgba(154,194,246,.47)" strokeWidth=".7" strokeLinejoin="round"/>
      {line.map(([x, y], j) => <circle key={j} cx={x} cy={y} r=".95" stroke="none" fill="#eff5ff"/>)}
    </g>)}
  </svg>
  </> 
}
