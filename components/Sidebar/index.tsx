import { FunctionComponent, useEffect, useState, useContext } from "react"
import AppContext from "@context/AppContext"
import { Button, Checkbox } from "antd"
import type { CheckboxValueType } from "antd/es/checkbox/Group"
import { getPokemontTypesList } from "@helpers/pokeapi"
import { PokemonTypeInterface } from "@interfaces/pokemon"
import { Wrapper } from "./index.style"
import { CheckboxLabelInterface } from "interfaces/general"

const Sidebar: FunctionComponent = () => {
  const context: any = useContext(AppContext)
  const [typeList, setTypeList] = useState<any>()

  useEffect(() => {
    getPokemontTypesList().then((response) => {
      if (response.success) {
        const checkBoxes = response.data.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          }
        })

        setTypeList(checkBoxes)
      }
    })
  }, [])

  const onChange = (checkedValues: CheckboxValueType[]) => {
    context.setComparePokemons(checkedValues)
  }

  return (
    <Wrapper className="absolute min-h-screen w-full sm:w-[360px] top-0 right-0 p-8">
      <h3>Filter</h3>
      <div>
        <Checkbox.Group options={typeList} onChange={onChange}></Checkbox.Group>
      </div>
      <Button
        onClick={() => {
          console.log(context.comparePokemons)
        }}
        className="w-max"
      >
        Search
      </Button>
    </Wrapper>
  )
}

export default Sidebar
