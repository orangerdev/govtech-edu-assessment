const listByAllFiltersQuery = (data: {
  limit: number
  offset: number
  type: string[]
  generation: string[]
}) => {
  const { limit, offset, type, generation } = data
  return `
    query getPokemons {
      species: pokemon_v2_pokemonspecies(
        limit: ${limit}
        offset: ${offset}
        order_by: {id: asc}      
        where: {
          
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {
                name: {
                  _in: ${JSON.stringify(type)}
                }
              }
            }
          }

          pokemon_v2_generation: { name: { _in: ${JSON.stringify(
            generation
          )} } }
      
        }
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
      
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: {
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: {
              name: {
                _in: ${JSON.stringify(type)}
              }
            }
          }
        }
        pokemon_v2_generation: { name: { _in: ${JSON.stringify(generation)} } }
  
      }
    ) {
      aggregate {
        count
      }
    }
  }`
}

const listByGenerationQuery = (data: {
  limit: number
  offset: number
  generation: string[]
}) => {
  const { limit, offset, generation } = data

  return `
    query getPokemons {
      species: pokemon_v2_pokemonspecies(
        limit: ${limit}
        offset: ${offset}
        order_by: {id: asc}      
        where: {
          pokemon_v2_generation: { name: { _in: ${JSON.stringify(
            generation
          )} } }
        }
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
      
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: {
        pokemon_v2_generation: { name: { _in: ${JSON.stringify(generation)} } }
      }
    ) {
      aggregate {
        count
      }
    }
  }`
}

const listByFilterQuery = (data: {
  limit: number
  offset: number
  type: string[]
}) => {
  const { limit, offset, type } = data

  return `
    query getPokemons {
      species: pokemon_v2_pokemonspecies(
        limit: ${limit}
        offset: ${offset}
        order_by: {id: asc}      
        where: {
          
          pokemon_v2_pokemons: {
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {
                name: {
                  _in: ${JSON.stringify(type)}
                }
              }
            }
          }
      
        }
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
      
    species_aggregate: pokemon_v2_pokemonspecies_aggregate(
      where: {
        pokemon_v2_pokemons: {
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: {
              name: {
                _in: ${JSON.stringify(type)}
              }
            }
          }
        }  
      }
    ) {
      aggregate {
        count
      }
    }
  }`
}

const basicListQuery = (data: { limit: number; offset: number }) => {
  const { limit, offset } = data

  return `query getPokemons {
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
    }`
}

const getListQuery = (data: {
  limit: number
  offset: number
  type: string[] | undefined
  generation: string[] | undefined
}) => {
  const { limit, offset, type, generation } = data

  if (
    generation !== undefined &&
    generation.length > 0 &&
    (type === undefined || type.length === 0)
  ) {
    return listByGenerationQuery({ limit, offset, generation })
  } else if (
    (generation === undefined || generation.length === 0) &&
    type !== undefined &&
    type.length > 0
  ) {
    return listByFilterQuery({ limit, offset, type })
  } else if (
    generation !== undefined &&
    generation.length > 0 &&
    type !== undefined &&
    type.length > 0
  ) {
    return listByAllFiltersQuery({ limit, offset, type, generation })
  } else {
    return basicListQuery({ limit, offset })
  }
}

export default getListQuery
