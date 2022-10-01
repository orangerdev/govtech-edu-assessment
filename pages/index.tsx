import type { NextPage } from "next"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useRef, useEffect, useState } from "react"
import { FilterOutlined } from "@ant-design/icons"
import AppContext from "@context/AppContext"
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
  const [totalPokemons, setTotalPokemons] = useState<number>(0)
  const [pokemons, setPokemons] = useState<PokemonCardInterface[]>([])
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [generationFilter, setGenerationFilter] = useState<string[]>([])
  const [comparePokemons, setComparePokemons] = useState<
    PokemonCardInterface[]
  >([])

  /**
   * Load next pokemons routine
   */
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
          setTotalPokemons(response.aggregate)
        }
      })
      .then(() => {
        setShowLoading(false)
      })
  }

  /**
   * Load first pokemons and register observer
   */
  useEffect(() => {
    loadNextPokemons()

    observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setShowLoading(true)
      }
    })

    observer.observe(endRef.current)
  }, [])

  /**
   * If showLoading is true, load next pokemons,
   * triggered by showLoading state value change event
   */
  useEffect(() => {
    if (showLoading === true) {
      loadNextPokemons()
    }
  }, [showLoading])

  return (
    <AppContext.Provider
      value={{
        comparePokemons,
        setComparePokemons,

        showSidebar,
        setShowSidebar,

        typeFilter,
        setTypeFilter,

        generationFilter,
        setGenerationFilter,
      }}
    >
      <main className="sm:w-[960px] p-4 sm:p-0 sm:py-4 mx-auto">
        <header>
          <figure className="text-center mb-4">
            <Image
              src="/img/pokedex.png"
              width={235}
              height={77}
              alt="Pokedex"
            />
          </figure>
          <div className="text-2xl pb-4 flex gap-4 justify-between">
            <div>{totalPokemons} Pokemon(s)</div>
            <div className="flex gap-4">
              <button type="button">Compare</button>
              <button type="button" onClick={() => setShowSidebar(true)}>
                Filter{" "}
                <FilterOutlined className="float-right mt-[4px] ml-[4px]" />
              </button>
            </div>
          </div>
        </header>
        <section
          id="pokemons-list"
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 mx-auto min-h-screen"
        >
          {pokemons.length > 0 &&
            pokemons.map((pokemon: PokemonCardInterface) => (
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
    </AppContext.Provider>
  )
}

export default Home
