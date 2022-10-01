import { FunctionComponent } from "react"
import { CheckboxLabelInterface } from "interfaces/general"
import { Checkbox } from "antd"

const CheckboxLabel: FunctionComponent<CheckboxLabelInterface> = (props) => {
  const { id, name, value, onChange } = props

  return (
    <>
      <Checkbox onChange={onChange} name={`${name}[]`} value={value}>
        {value}
      </Checkbox>
    </>
  )
}

export default CheckboxLabel
