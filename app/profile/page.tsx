"use client";

import { motion } from 'framer-motion'
import React from 'react'

const Profile = () => {
  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    }} className="bg-neutral-900 min-h-screen text-white flex flex-col items-start justify-start p-8 pt-24 gap-16">
      Profile
    </motion.div>
  )
}

export default Profile