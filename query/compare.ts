const getComparedPokemonsQuery = (names: string[]) => {
  const query: string[] = ["query getPokemon {"]

  names.forEach((name: string, index: number) => {
    query.push(`
    pokemon${index}:
    pokemon_v2_pokemonspecies(where: {name: { _eq: "${name}" }} limit: 1) {
      id
      name
      gender_rate
      hatch_counter
      description: pokemon_v2_pokemonspeciesflavortexts(limit: 1 where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
        flavor_text
      }
      egg_groups: pokemon_v2_pokemonegggroups {
        group: pokemon_v2_egggroup {
          name
        }
      }
      pokemons: pokemon_v2_pokemons {
        id
        name
        height
        weight
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            name
          }
        }
        stats: pokemon_v2_pokemonstats {
          base_stat
          stat: pokemon_v2_stat {
            name
          }
        }
      }
    }
  `)
  })

  query.push("}")

  return query.join("")
}

export default getComparedPokemonsQuery
