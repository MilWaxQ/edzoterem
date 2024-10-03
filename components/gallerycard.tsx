import { animate, motion } from 'framer-motion'
import React from 'react'

const GalleryCard = () => {
  return (
    <motion.div variants={{initial: {opacity: 0}, animate: {opacity: 1}}} className='w-full basis-[24.3%] flex-grow min-w-80 h-60 bg-red-500 rounded-lg overflow-hidden flex items-center justify-center group grayscale hover:grayscale-0 transition-all duration-200'>
      <div className='group-hover:blur-none blur-[2px] transition-all'>Kép</div>
    </motion.div>
  )
}

export default GalleryCard