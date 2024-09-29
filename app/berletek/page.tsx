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
    {title: "Havi bérlet", price: 11990},
    {title: "10 alkalmas bérlet", price: 7990},
    {title: "Napijegy", price: 1190},
    {title: "Kedvezményes havi bérlet", price: 9990},
    {title: "Negyedéves bérlet", price: 32990},
    {title: "", price: 0},
    {title: "", price: 0},
    {title: "Havi páros bérlet", price: 15990},
  ]
  return (
    <motion.div initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }} className='min-h-screen bg-neutral-900 p-4 px-10 text-white flex flex-col items-start justify-start gap-16 pt-12'>
      <p className="text-[40px] uppercase tracking-widest font-light mx-auto">Jegyek, bérletek</p>
      <div className='w-full min-h-[100px] h-auto grid grid-flow-row grid-cols-3 place-items-center gap-y-16 mb-8'>
        <span className='text-[30px] uppercase tracking-widest font-light'>Napijegyek</span>
        <span className='text-[30px] uppercase tracking-widest font-light'>Havi bérletek</span>
        <span className='text-[30px] uppercase tracking-widest font-light'>Egyéb bérletek</span>
        {berletek.map((t) => <TicketCard title={t.title} price={t.price} />)}
      </div>
    </motion.div>
  )
}

export default Page