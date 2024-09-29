import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'

interface TicketCardProps {
  title: string
  price: number
}

const TicketCard: React.FC<TicketCardProps> = ({title, price}) => {
  return (
    <div className={`w-full md:w-2/3 lg:w-[300px] xl:w-[390px] h-[200px] bg-neutral-900 border border-red-500 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-black/80 shadow-black/50 flex flex-col items-center justify-between p-8 transition ${title === "" ? "opacity-0" : "opacity-100"}`}>
      <p className='tracking-wider text-2xl font-medium text-center'>{title}</p>
      <div className='w-full h-12 bg-transparent border border-red-500 hover:bg-red-500 rounded-md cursor-pointer flex flex-row items-center justify-center gap-2 tracking-wide transition-colors'><FaShoppingCart size={20}/>{price} Ft</div>
    </div>
  )
}

export default TicketCard