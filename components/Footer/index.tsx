import { FunctionComponent, useContext } from "react"
import TypeLabel from "@components/Type"
import AppContext from "../../context/AppContext"
import { Wrapper } from "./index.style"

const Footer: FunctionComponent = () => {
  const context = useContext(AppContext)
  return (
    <Wrapper className="sticky bottom-0 left-0 w-full flex justify-between h-10 border-t p-2">
      <div className="filter-container flex flex-nowrap gap-2">
        {(context.generationFilter.length > 0 ||
          context.typeFilter.length > 0) && (
          <>
            <h3>Filter By</h3>
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
      <div className="compare-container">s</div>
    </Wrapper>
  )
}

export default Footer
