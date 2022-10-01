import { FunctionComponent } from "react"
import { PokemonCardInterface } from "interfaces/pokemon"
import Image from "next/image"
import Link from "next/link"
import TypeLabel from "@components/Type"
import { Wrapper } from "./index.style"

const GridCard: FunctionComponent<PokemonCardInterface> = (props) => {
  const { id, name, types } = props
  return (
    <Link href={`/pokemon/${name}`}>
      <Wrapper
        className={`flex justify-between flex-col bg-light--${types[0]} rounded-lg h-64 p-4`}
      >
        <figure className="w-[140px] mx-auto">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width={140}
            height={140}
            alt={name}
          />
        </figure>
        <div className="">
          <h2 className={`mb-2`}>{name}</h2>
          <div className="flex gap-2 text-white">
            {types.map((type: string) => (
              <TypeLabel key={`type-${type}`} type={type} />
            ))}
          </div>
        </div>
      </Wrapper>
    </Link>
  )
}

export default GridCard
