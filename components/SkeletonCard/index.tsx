import { FunctionComponent } from "react"

const SkeletonCard: FunctionComponent = () => {
  return (
    <div className="animate-pulse flex justify-between flex-col rounded-lg h-64 p-4 bg-gray-300">
      <div className="w-[140px] mx-auto h-[140px] bg-gray-400 rounded-full"></div>
      <div>
        <div className="h-6 bg-gray-400 rounded mb-2"></div>
        <div className="h-6 bg-gray-400 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
