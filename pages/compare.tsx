import { useState, useEffect } from "react"
import { NextPage } from "next/types"
import { useRouter } from "next/router"
import { getComparedPokemonsList } from "@helpers/pokeapi"
import Image from "next/image"
import TypeLabel from "@components/Type"
import SinglePokemonAboutSection from "@components/SinglePokemon/About"
import PokemonStat from "@components/Stats"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ComparisonPage: NextPage = () => {
  const router = useRouter()
  const [pokemons, setPokemons] = useState<any>([])

  useEffect(() => {
    if (!router.query["name[]"]) return

    getComparedPokemonsList(router.query["name[]"]).then((response) => {
      if (response.success) {
        const pokemonData = response.data
        const pokemonsTemp: any = []
        Object.keys(pokemonData).forEach((key: string, index: number) => {
          pokemonsTemp.push(pokemonData[key])
        })
        setPokemons(pokemonsTemp)
      }
    })
  }, [router.query])

  const settings = {
    dots: false,
    arrow: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <Slider {...settings}>
        {pokemons.length > 0 &&
          pokemons.map((pokemonA: any, index: number) => {
            const { types, stats, abilities } = pokemonA[0].pokemons[0]
            return (
              <div key={`pokemon-${index}`}>
                <header
                  className={`bg-light--${pokemonA[0].pokemons[0].types[0].type.name} p-4`}
                >
                  <h1 className="text-2xl font-bold text-gray-800 p-0 mb-4">
                    {pokemonA[0].name} #{pokemonA[0].id}
                  </h1>
                  <div className="flex gap-4">
                    {pokemonA[0].pokemons[0].types.map(
                      (type: any, typeindex: number) => (
                        <TypeLabel
                          key={`type-${index}-${typeindex}`}
                          type={type.type.name}
                        />
                      )
                    )}
                  </div>
                  <figure className="w-[180px] mx-auto text-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonA[0].id}.png`}
                      width={180}
                      height={180}
                      alt={pokemonA[0].name}
                    />
                  </figure>
                </header>
                <div className="p-4">
                  <SinglePokemonAboutSection
                    showDescription={false}
                    pokemon={pokemonA[0]}
                  />
                  <div className="flex gap-4 mb-4">
                    {abilities.map((ability: any, abindex: number) => {
                      return (
                        <TypeLabel
                          key={`ability-${abindex}`}
                          type={ability.ability.name}
                          background={types[0].type.name}
                        />
                      )
                    })}
                  </div>
                  {stats.map((stat: any, statindex: number) => (
                    <PokemonStat
                      key={`stat-${statindex}`}
                      base_stat={stat.base_stat}
                      name={stat.stat.name}
                    />
                  ))}
                </div>
              </div>
            )
          })}
      </Slider>
    </>
  )
}

export default ComparisonPage
