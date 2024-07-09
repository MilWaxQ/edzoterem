"use client";

import NavBar from '@/components/navbar'
import { motion } from 'framer-motion'
import React from 'react'

const Page = () => {
  return (
    <motion.div initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }} className='min-h-screen bg-neutral-900 p-4 px-16 text-white flex flex-col items-start justify-start'>
      <NavBar />
      <p>Bérletek</p>
    </motion.div>
  )
}

export default Page