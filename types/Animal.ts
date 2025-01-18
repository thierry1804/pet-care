export interface Weight {
  date: string
  weight: number
}

export interface Vaccination {
  date: string
  vaccine: string
}

export interface Treatment {
  date: string
  treatment: string
}

export interface Animal {
  id: string
  name: string
  species: string
  birthdate: string
  weights: Weight[]
  vaccinations: Vaccination[]
  treatments: Treatment[]
}

