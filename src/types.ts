export type Location = {
  name: string
  lat: number
  lng: number
  timeZone: string
}

export type Star = {
  id: number
  ra: number
  dec: number
  mag: number
  bv: number
  name?: string
}

export type Constellation = {
  id: string
  name: string
  latin: string
  center: [number, number]
  lines: [number, number][][]
  partCenters?: [number, number][]
}

export type Selection =
  | { kind: 'star'; star: Star }
  | { kind: 'constellation'; constellation: Constellation }
  | null
