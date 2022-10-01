import { FunctionComponent, useEffect, useState, useContext } from "react"
import AppContext from "@context/AppContext"
import { CloseSquareOutlined } from "@ant-design/icons"
import { Button, Checkbox } from "antd"
import type { CheckboxValueType } from "antd/es/checkbox/Group"
import {
  getPokemonTypesList,
  getPokemonGenerationsList,
} from "@helpers/pokeapi"
import { Wrapper } from "./index.style"

const Sidebar: FunctionComponent = () => {
  const context: any = useContext(AppContext)
  const [typeList, setTypeList] = useState<any>()
  const [generationList, setGenerationList] = useState<any>()
  const [typeFilter, setTypeFilter] = useState<CheckboxValueType[]>([])
  const [generationFilter, setGenerationFilter] = useState<CheckboxValueType[]>(
    []
  )

  useEffect(() => {
    Promise.all([
      getPokemonTypesList().then((response) => {
        if (response.success) {
          const checkBoxes = response.data.map((item: any) => {
            return {
              label: item.name,
              value: item.name,
            }
          })

          setTypeList(checkBoxes)
        }
      }),
      getPokemonGenerationsList().then((response) => {
        if (response.success) {
          const checkBoxes = response.data.map((item: any) => {
            return {
              label: item.name.replace("generation-", ""),
              value: item.name,
            }
          })

          setGenerationList(checkBoxes)
        }
      }),
    ])
  }, [])

  return (
    <Wrapper
      className={`fixed min-h-screen w-full sm:w-[360px] top-0 right-0 p-8 shadow-2xl ${
        context.showSidebar === false ? "sidebar-hidden" : "sidebar-shown"
      }`}
    >
      <CloseSquareOutlined
        className="absolute top-8 right-8 text-2xl cursor-pointer"
        onClick={() => context.setShowSidebar(false)}
      />
      <h3 className="leading-2 text-lg font-bold">Filter</h3>
      <div>
        <h4 className="leading-3 text-base mb-4">By Type</h4>
        <div className="pokemon-type-filter mb-4">
          <Checkbox.Group
            options={typeList}
            onChange={(checkedValues: CheckboxValueType[]) => {
              setTypeFilter(checkedValues)
            }}
          ></Checkbox.Group>
        </div>
        <h4 className="leading-3 text-base mb-4">By Generation</h4>
        <div className="pokemon-generation-filter mb-4">
          <Checkbox.Group
            options={generationList}
            onChange={(checkedValues: CheckboxValueType[]) => {
              setGenerationFilter(checkedValues)
            }}
          ></Checkbox.Group>
        </div>
      </div>
      <Button
        onClick={() => {
          context.setTypeFilter(typeFilter)
          context.setGenerationFilter(generationFilter)
          context.doFilterPokemon()
          context.setShowSidebar(false)
        }}
        className="w-full rounded-lg"
      >
        Search
      </Button>
    </Wrapper>
  )
}

export default Sidebar
