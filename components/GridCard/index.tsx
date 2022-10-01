import { FunctionComponent, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import TypeLabel from "@components/Type"
import AppContext from "context/AppContext"
import { Checkbox } from "antd"
import { PokemonCardInterface } from "interfaces/pokemon"
import { Wrapper } from "./index.style"

const GridCard: FunctionComponent<PokemonCardInterface> = (props) => {
  const context = useContext(AppContext)
  const { id, name, types } = props

  return (
    <Wrapper
      className={`flex justify-between flex-col bg-light--${types[0]} rounded-lg h-64 p-4 relative`}
    >
      {context.showCompare && (
        <Checkbox
          onChange={(e) => {
            context.changeComparisonData({
              id,
              name,
              types,
              isChecked: e.target.checked,
            })
          }}
          className="absolute top-2 right-2"
        ></Checkbox>
      )}
      <Link href={`/pokemon/${name}`}>
        <figure className="w-[140px] mx-auto cursor-pointer">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            width={140}
            height={140}
            alt={name}
          />
        </figure>
      </Link>
      <div className="">
        <h2 className={`mb-2`}>{name}</h2>
        <div className="flex gap-2 text-white">
          {types.map((type: string) => (
            <TypeLabel key={`type-${type}`} type={type} />
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default GridCard
