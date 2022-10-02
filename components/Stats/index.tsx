import { FunctionComponent } from "react"
import { Progress } from "antd"

interface PokemonStatInterface {
  base_stat: number
  name: string
}

const PokemonStat: FunctionComponent<PokemonStatInterface> = (props) => {
  const { base_stat: base, name } = props
  return (
    <div className={`mb-4`}>
      <span className="uppercase">{name}</span>
      <div className="flex gap-4">
        <Progress percent={base} showInfo={false} />
        <span>{base}</span>
      </div>
    </div>
  )
}

export default PokemonStat
