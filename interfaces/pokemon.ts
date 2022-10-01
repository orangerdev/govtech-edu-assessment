import { ResponseInterface } from "./general"
export interface PokemonTypeInterface {
  id: number
  name: string
}

export type PokemonGenerationInterface = PokemonTypeInterface

export interface PokemonCardInterface {
  id: number
  name: string
  types: string[]
}

export type PokemonListResponseInterface = ResponseInterface & {
  data: null | PokemonCardInterface[]
  aggregate: number
}
