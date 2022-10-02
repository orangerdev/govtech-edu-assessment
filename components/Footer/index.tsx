import { FunctionComponent, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import TypeLabel from "@components/Type"
import AppContext from "../../context/AppContext"
import { Wrapper } from "./index.style"

const Footer: FunctionComponent = () => {
  const context = useContext(AppContext)

  return (
    <Wrapper className="sticky bottom-0 left-0 w-full flex justify-between h-10 border-t p-2">
      <div className="filter-container flex flex-nowrap gap-2 w-1/2 overflow-x-auto overflow-y-hidden">
        {(context.generationFilter.length > 0 ||
          context.typeFilter.length > 0) && (
          <>
            <h3 className="m-0 hidden sm:inline-block">Filter By</h3>
            {context.typeFilter.length > 0 &&
              context.typeFilter.map((type: any) => (
                <TypeLabel key={`type-${type}`} type={type} />
              ))}

            {context.generationFilter.length > 0 &&
              context.generationFilter.map((generation: any) => (
                <span
                  key={`generation-${generation}`}
                  className="text-xs rounded-lg py-1 px-4 bg-gray-100"
                >
                  {generation}
                </span>
              ))}
          </>
        )}
      </div>
      <div className="compare-container">
        {context.showCompare && context.comparePokemons.length > 0 && (
          <>
            <div className="compare-scroll">
              {context.comparePokemons.map((pokemon: any) => (
                <figure key={`compare-pokemon-${pokemon.id}`}>
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    width={24}
                    height={24}
                    alt={pokemon.name}
                  />
                </figure>
              ))}
            </div>
            <Link href={`/compare?${context.queryString.join("&")}`}>
              <button
                type="button"
                className="rounded-md bg--water py-1 px-3 sm:px-2 text-xs text-white"
              >
                Compare &gt;
              </button>
            </Link>
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default Footer
