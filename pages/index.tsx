import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRef, useEffect, useState } from "react"
import GridCard from "@components/GridCard"
import SkeletonCard from "@components/SkeletonCard"
import { isMobile } from "react-device-detect"
import { getPokemonsList } from "@helpers/pokeapi"
import { PokemonCardInterface } from "interfaces/pokemon"

const Sidebar = dynamic(() => import("@components/Sidebar"), { ssr: false })

const Home: NextPage = () => {
  let observer: any
  const endRef = useRef<any>(null)
  const limit = 20
  const firstSkeletonLimit = [...Array(limit)]
  const preLoadSkeletonLimit = [...Array(isMobile ? 1 : 4)]

  const [offset, setOffset] = useState<number>(0)
  const [pokemons, setPokemons] = useState<any>([])
  const [showLoading, setShowLoading] = useState<boolean>(false)

  const loadNextPokemons = () => {
    getPokemonsList({ limit, offset })
      .then((response) => {
        if (response.success === true) {
          setPokemons((prevData: any) => {
            return [...prevData, ...response.data]
          })
          setOffset((prevData: number) => {
            return prevData + limit
          })
        }
      })
      .then(() => {
        setShowLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    loadNextPokemons()

    observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setShowLoading(true)
      }
    })

    observer.observe(endRef.current)
  }, [])

  useEffect(() => {
    if (showLoading === true) {
      loadNextPokemons()
    }
  }, [showLoading])

  return (
    <main>
      <section
        id="pokemons-list"
        className="p-8 sm:p-0 sm:w-[960px] grid grid-cols-1 sm:grid-cols-4 gap-4 mx-auto min-h-screen"
      >
        {pokemons.length > 0 &&
          pokemons.map((pokemon: PokemonCardInterface, index: number) => (
            <GridCard {...pokemon} key={`pokemon-${pokemon.id}`} />
          ))}

        {pokemons.length === 0 &&
          firstSkeletonLimit.map((_: any, index: number) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}

        {showLoading &&
          preLoadSkeletonLimit.map((_: any, index: number) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
      </section>
      <footer ref={endRef}>End here</footer>
      <Sidebar />
    </main>
  )
}

export default Home
