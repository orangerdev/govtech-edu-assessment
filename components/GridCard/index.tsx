import { FunctionComponent } from "react"
import { PokemonCardInterface } from "interfaces/pokemon"
import Image from "next/image"
import Link from "next/link"

const GridCard: FunctionComponent<PokemonCardInterface> = (props) => {
  const { id, name, types } = props
  return (
    <Link href={`/pokemon/${name}`}>
      <div className={`bg-light--${types[0]} rounded-lg h-64 p-4`}>
        <figure className="w-[160px] mx-auto">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width={160}
            height={160}
          />
        </figure>
        <h2 className={`mb-2`}>{name}</h2>
        <div className="flex gap-2 text-white">
          {types.map((type: string) => (
            <span
              key={`type-${type}`}
              className={`text-xs rounded-lg py-1 px-4 bg--${type}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default GridCard
