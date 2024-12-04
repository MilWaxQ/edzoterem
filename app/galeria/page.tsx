"use client";

import GalleryCard from '@/components/gallerycard';
import { motion, Variants } from 'framer-motion'
import React from 'react'

const Galeria = () => {

  const variants: Variants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    }} className="bg-neutral-900 min-h-screen h-screen text-white p-8 pt-24 gap-16">
      <motion.div initial="initial" animate="animate" variants={variants} className='w-full h-auto flex flex-row flex-wrap gap-4 justify-center items-start pb-8'>
        {Array.from(Array(10)).map((v, i) => <GalleryCard key={i} />)}
      </motion.div>
    </motion.div>
  )
}

export default Galeria