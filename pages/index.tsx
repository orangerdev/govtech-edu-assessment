import type { NextPage } from "next"
import { useEffect, useState } from "react"
import GridCard from "@components/GridCard"
import { getPokemonsList } from "@helpers/pokeapi"
import { PokemonCardInterface } from "interfaces/pokemon"

const Home: NextPage = () => {
  const limit = 20
  const [offset, setOffset] = useState<number>(0)
  const [pokemons, setPokemons] = useState<any>([])

  const loadNextPokemons = () => {
    getPokemonsList({ limit, offset }).then((response) => {
      if (response.success === true) {
        setPokemons((prevData: any) => {
          return [...prevData, ...response.data]
        })
        setOffset((prevData: number) => {
          return prevData + limit
        })
      }
    })
  }

  useEffect(() => {
    getPokemonsList({ limit, offset }).then((response) => {
      if (response.success === true) {
        setPokemons(response.data)
        setOffset((prevData: number) => {
          return prevData + limit
        })
      }
    })
  }, [])

  useEffect(() => {
    console.log(pokemons)
  }, [pokemons])

  return (
    <main className="sm:w-[960px] grid grid-cols-1 sm:grid-cols-4 gap-4 mx-auto">
      {pokemons.map((pokemon: PokemonCardInterface, index: number) => (
        <GridCard {...pokemon} key={`pokemon-${pokemon.id}`} />
      ))}
      <button type="button" onClick={loadNextPokemons}>
        Next
      </button>
    </main>
  )
}

export default Home
