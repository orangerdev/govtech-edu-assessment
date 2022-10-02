import { NextPage } from "next/types"
import { Tabs } from "antd"
import Link from "next/link"
import Image from "next/image"
import TypeLabel from "@components/Type"
import PokemonStat from "@components/Stats"
import DataDisplay from "@components/Data"
import { getSinglePokemon } from "@helpers/pokeapi"

interface SinglePokemonPageInterface {
  success: boolean
  pokemon: any
}

const SinglePokemonPage: NextPage<SinglePokemonPageInterface> = (props) => {
  console.log("props", props)
  const {
    pokemon: { name, description, id, pokemons },
    success,
  } = props

  const { weight, types, stats, height, abilities } = pokemons[0]

  return (
    <main className="sm:w-[480px] p-0 mx-auto">
      <header className={`bg-light--${types[0].type.name} p-4`}>
        <Link href="/">&lt; Back</Link>
        <h1 className="text-2xl font-bold text-gray-800 p-0 mb-4">
          {name} #{id}
        </h1>
        <div className="flex gap-4">
          {types.map((type: any, index: number) => (
            <TypeLabel key={index} type={type.type.name} />
          ))}
        </div>
        <figure className="w-[360px] mx-auto text-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width={360}
            height={360}
            alt={name}
          />
        </figure>
      </header>
      <section>
        <Tabs>
          <Tabs.TabPane tab="About" key="1">
            <p>{description[0].flavor_text}</p>
            <DataDisplay label="Height" content={`${height} m`} />
            <DataDisplay label="Weight" content={`${weight} kg`} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Base Stats" key="2">
            {stats.map((stat: any, index: number) => (
              <PokemonStat
                key={index}
                base_stat={stat.base_stat}
                name={stat.stat.name}
              />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Abilities" key="3">
            <div className="flex gap-4">
              {abilities.map((ability: any, index: number) => {
                return (
                  <TypeLabel
                    key={`ability-${index}`}
                    type={ability.ability.name}
                    background={types[0].type.name}
                  />
                )
              })}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </section>
    </main>
  )
}

export async function getServerSideProps(context: any) {
  const { res, params } = context

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=3600"
  )

  const pokemon = await getSinglePokemon(params.name).then(
    (response) => response
  )

  return {
    props: {
      success: pokemon.success,
      pokemon: pokemon.data,
    },
  }
}

export default SinglePokemonPage
