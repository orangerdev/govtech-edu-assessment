import axios from "axios"
import { setupCache } from "axios-cache-adapter"
import { ResponseInterface } from "interfaces/general"
import {
  PokemonCardInterface,
  PokemonListResponseInterface,
} from "interfaces/pokemon"
import { getFromStorage, setToStorage } from "@helpers/localStorage"
import getListQuery from "query/list"
import getGenerationQuery from "query/generation"
import getFilterQuery from "query/type"
import getSinglePokemonQuery from "@query/single"
import getComparedPokemonsQuery from "@query/compare"

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
})

const api = axios.create({
  adapter: cache.adapter,
})

/**
 * Fetches pokemons list from PokeAPI
 * @param data
 * @returns
 */
export const getPokemonsList = async (data: {
  limit: number
  offset: number
  type?: string[] | undefined
  generation?: string[] | undefined
}): Promise<PokemonListResponseInterface> => {
  const { limit, offset, type, generation } = data

  const graphql = JSON.stringify({
    query: getListQuery({
      limit,
      offset,
      type,
      generation,
    }),
  })

  return await api({
    method: "post",
    url: "https://beta.pokeapi.co/graphql/v1beta",
    data: graphql,
  })
    .then((response) => {
      const pokemonCards: PokemonCardInterface[] =
        response.data.data.species.map((species: any) => {
          return {
            id: species.id,
            name: species.name,
            types: species.pokemons[0].types.map(
              (_type: any) => _type.type.name
            ),
          }
        })
      return {
        success: true,
        data: pokemonCards,
        message: "Pokemons list fetched successfully",
        aggregate: Number(response.data.data.species_aggregate.aggregate.count),
      }
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        message: error,
        aggregate: 0,
      }
    })
}

/**
 * Fetches pokemon types list from PokeAPI
 * @returns
 */
export const getPokemonTypesList = async (): Promise<ResponseInterface> => {
  // Check from localStorage first
  if (getFromStorage("pokemonTypes"))
    return JSON.parse(getFromStorage("pokemonTypes"))

  const graphql = JSON.stringify({
    query: getFilterQuery,
  })

  return await api({
    method: "post",
    url: "https://beta.pokeapi.co/graphql/v1beta",
    data: graphql,
  })
    .then((response) => {
      const returnResponse = {
        success: true,
        data: response.data.data.pokemon_v2_type,
        message: "Pokemon types list fetched successfully",
      }
      // Set to localStorage for future use
      setToStorage("pokemonTypes", JSON.stringify(returnResponse))

      return returnResponse
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        message: error,
      }
    })
}

/**
 * Fetches pokemon generations list from PokeAPI
 * @returns
 */
export const getPokemonGenerationsList =
  async (): Promise<ResponseInterface> => {
    // Check from localStorage first
    if (getFromStorage("pokemonGenerations"))
      return JSON.parse(getFromStorage("pokemonGenerations"))

    const graphql = JSON.stringify({
      query: getGenerationQuery,
    })

    return await api({
      method: "post",
      url: "https://beta.pokeapi.co/graphql/v1beta",
      data: graphql,
    })
      .then((response) => {
        const returnResponse = {
          success: true,
          data: response.data.data.pokemon_v2_generation,
          message: "Pokemon generations list fetched successfully",
        }

        // Set to localStorage for future use
        setToStorage("pokemonGenerations", JSON.stringify(returnResponse))

        return returnResponse
      })
      .catch((error) => {
        return {
          success: false,
          data: null,
          message: error,
        }
      })
  }

export const getSinglePokemon = async (
  name: string
): Promise<ResponseInterface> => {
  // Check from localStorage first
  const localStorageKey = `pokemnon-${name}`

  if (getFromStorage(localStorageKey))
    return JSON.parse(getFromStorage(localStorageKey))

  const graphql = JSON.stringify({
    query: getSinglePokemonQuery(name),
  })

  return await api({
    method: "post",
    url: "https://beta.pokeapi.co/graphql/v1beta",
    data: graphql,
  })
    .then((response) => {
      const returnResponse = {
        success: true,
        data: response.data?.data?.species[0],
        message: `Pokemon ${name} fetched successfully`,
      }

      // Set to localStorage for future use
      setToStorage(localStorageKey, JSON.stringify(returnResponse))

      return returnResponse
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        message: error,
      }
    })
}

export const getComparedPokemonsList = async (
  names: any
): Promise<ResponseInterface> => {
  const graphql = JSON.stringify({
    query: getComparedPokemonsQuery(names),
  })

  return await api({
    method: "post",
    url: "https://beta.pokeapi.co/graphql/v1beta",
    data: graphql,
  })
    .then((response) => {
      const returnResponse = {
        success: true,
        data: response.data?.data,
        message: `Compared pokemons fetched successfully`,
      }

      return returnResponse
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        message: error,
      }
    })
}
