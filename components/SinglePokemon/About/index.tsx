import { FunctionComponent } from "react"
import DataDisplay from "@components/Data"

interface SinglePokemonAboutSectionInterface {
  pokemon: any
}

const SinglePokemonAboutSection: FunctionComponent<
  SinglePokemonAboutSectionInterface
> = (props) => {
  const { pokemon } = props

  const { height, weight } = pokemon.pokemons[0]

  return (
    <>
      <p>{pokemon.description[0].flavor_text}</p>
      <DataDisplay label="Height" content={`${height} m`} />
      <DataDisplay label="Weight" content={`${weight} kg`} />
      <DataDisplay
        label="Egg Group"
        content={pokemon.egg_groups.map((egg_group: any, index: number) => {
          return (
            <>
              <span key={`egg_group-${index}`}>{egg_group.group.name}</span>
              &nbsp;
            </>
          )
        })}
      />
      <DataDisplay label="Cycles" content={pokemon.hatch_counter} />
    </>
  )
}

export default SinglePokemonAboutSection
