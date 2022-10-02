import { FunctionComponent } from "react"
import { Wrapper } from "./index.style"

interface TypeLabelInterface {
  type: string
  background?: string
}

const TypeLabel: FunctionComponent<TypeLabelInterface> = (props) => {
  const { type, background } = props
  return (
    <Wrapper
      className={`inline-block text-xs rounded-lg py-1 px-4 bg--${
        background === undefined ? type : background
      } white`}
    >
      {type}
    </Wrapper>
  )
}

export default TypeLabel
