import React from 'react'

interface DataCardProps{
  label: string
  value: string
}

const DataCard: React.FC<DataCardProps> = ({label, value}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between text-white">
      <span className="tracking-wider font-bold">{label}:</span>
      <span className="text-neutral-300 tracking-wider">{value}</span>
    </div>
  )
}

export default DataCard