import axios from "axios"
import { ResponseInterface } from "interfaces/general"
import { PokemonCardInterface } from "interfaces/pokemon"

export const getPokemonsList = async (data: {
  limit: number
  offset: number
}): Promise<ResponseInterface> => {
  const { limit, offset } = data

  const graphql = JSON.stringify({
    query: `query getPokemons {
      species: pokemon_v2_pokemonspecies(
        limit: ${limit}
        offset: ${offset}
        order_by: {id: asc}
      ) {
        id
        name
        pokemons: pokemon_v2_pokemons {
          id
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
      }

      species_aggregate: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }`,
  })

  return await axios({
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
            types: species.pokemons[0].types.map((type: any) => type.type.name),
          }
        })
      return {
        success: true,
        data: pokemonCards,
        message: "Pokemons list fetched successfully",
      }
    })
    .catch((error) => {
      return {
        success: false,
        data: null,
        message: error,
      }
    })
}
