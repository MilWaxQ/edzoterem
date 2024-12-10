import { animate, motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'

interface GalleryCardProps {
  source: string
}

const GalleryCard: React.FC<GalleryCardProps> = ({source}) => {
  return (
    <motion.div variants={{initial: {opacity: 0}, animate: {opacity: 1}}} className='w-full basis-[24.3%] flex-grow min-w-80 h-60 rounded-lg overflow-hidden flex items-center justify-center group transition-all duration-200 relative'>
      <div className='transition-all w-full h-full'>
        <Image className='z-50' style={{width: "100%", height: "100%"}} src={source} alt='' fill objectFit='cover' objectPosition='center' />
      </div>
    </motion.div>
  )
}

export default GalleryCard