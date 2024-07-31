"use client";

import NavBar from '@/components/navbar'
import TicketCard from '@/components/ticketcard';
import TicketData from '@/types/ticketdata';
import { motion } from 'framer-motion'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

const Page = () => {
  const berletek: TicketData[] = [
    {title: "Délelőtti napijegy", price: 990},
    {title: "Napijegy", price: 1290},
    {title: "Start bérlet", price: 3990},
    {title: "Félhavi bérlet", price: 5899},
    {title: "Diák és közalkalmazotti bérlet", price: 11999},
    {title: "Havi bérlet", price: 9999},
    {title: "10 alkalmas bérlet", price: 8999},
    {title: "Havi páros bérlet", price: 18999},
    {title: "Negyedéves bérlet", price: 22900}
  ]
  return (
    <motion.div initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }} className='min-h-screen bg-neutral-900 p-4 px-10 text-white flex flex-col items-start justify-start gap-16'>
      <p className="text-[40px] uppercase tracking-widest font-light mx-auto">Jegyek, bérletek</p>
      <div className='w-full min-h-[200px] h-auto grid grid-flow-row grid-cols-3 place-items-center gap-y-16 mb-8'>
        {berletek.map((t) => <TicketCard title={t.title} price={t.price} />)}
      </div>
    </motion.div>
  )
}

export default Page