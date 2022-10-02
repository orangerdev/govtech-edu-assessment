import { FunctionComponent, ReactNode } from "react"

interface DataDisplayInterface {
  label: string
  content: ReactNode
}

const DataDisplay: FunctionComponent<DataDisplayInterface> = (props) => {
  const { label, content } = props
  return (
    <div className="flex grid-4 m-0 p-0 mb-4">
      <label className="w-1/3 text-slate-700 font-semibold">{label}</label>
      <div className="w-2/3">{content}</div>
    </div>
  )
}

export default DataDisplay
