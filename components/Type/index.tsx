import { FunctionComponent } from "react"
import { Wrapper } from "./index.style"

interface TypeLabelInterface {
  type: string
}

const TypeLabel: FunctionComponent<TypeLabelInterface> = (props) => {
  const { type } = props

  return (
    <Wrapper
      className={`inline-block text-xs rounded-lg py-1 px-4 bg--${type} white`}
    >
      {type}
    </Wrapper>
  )
}

export default TypeLabel
