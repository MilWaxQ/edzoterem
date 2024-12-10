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
        <GalleryCard key={"1"} source='/images/IMG_0437.JPEG' />
        <GalleryCard key={"2"} source='/images/IMG_0438.JPEG' />
        <GalleryCard key={"3"} source='/images/IMG_0455.JPEG' />
        <GalleryCard key={"4"} source='/images/IMG_0456.JPEG' />
        <GalleryCard key={"5"} source='/images/IMG_0457.JPEG' />
        <GalleryCard key={"6"} source='/images/IMG_0458.JPEG' />
        <GalleryCard key={"7"} source='/images/IMG_0459.JPEG' />
        <GalleryCard key={"8"} source='/images/IMG_0460.JPEG' />
        <GalleryCard key={"9"} source='/images/IMG_0461.JPEG' />
      </motion.div>
    </motion.div>
  )
}

export default Galeria