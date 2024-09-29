"use client";

import NavBar from '@/components/navbar'
import TicketCard from '@/components/ticketcard';
import TicketData from '@/types/ticketdata';
import { motion } from 'framer-motion'
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

const Page = () => {
  const berletek: TicketData[] = [
    {title: "Délelőtti napijegy", price: 1190, type: "daily"},
    {title: "Havi bérlet", price: 11990, type: "monthly"},
    {title: "10 alkalmas bérlet", price: 7990, type: "other"},
    {title: "Napijegy", price: 1490, type: "daily"},
    {title: "Kedvezményes havi bérlet", price: 9990, type: "monthly"},
    {title: "Negyedéves bérlet", price: 32990, type: "other"},
    {title: "Kedvezményes napijegy", price: 990, type: "daily"},
    {title: "Havi páros bérlet", price: 15990, type: "monthly"},
    {title: "VIP bérlet", price: 14990, type: "other"},
  ]
  return (
    <motion.div initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }} className='min-h-screen bg-neutral-900 p-4 px-10 text-white flex flex-col items-start justify-start gap-16 pt-24'>
      <p className="text-[32px] md:text-[40px] uppercase tracking-widest font-light mx-auto">Jegyek, bérletek</p>
      <div className='w-full min-h-[100px] h-auto grid-flow-row grid-cols-3 place-items-center gap-y-16 mb-8 hidden lg:grid'>
        <span className='text-[30px] uppercase tracking-widest font-light'>Napijegyek</span>
        <span className='text-[30px] uppercase tracking-widest font-light'>Havi bérletek</span>
        <span className='text-[30px] uppercase tracking-widest font-light'>Egyéb bérletek</span>
        {berletek.map((t) => <TicketCard title={t.title} price={t.price} />)}
      </div>
      <div className='w-full h-auto flex-col flex lg:hidden items-center gap-y-4'>
        <span className='text-[24px] md:text-[30px] uppercase tracking-widest font-light mb-4'>Napijegyek</span>
        {berletek.filter((t) => t.type === "daily").map((t) => <TicketCard title={t.title} price={t.price} />)}
        <span className='text-[24px] md:text-[30px] uppercase tracking-widest font-light mb-4 mt-4'>Havi bérletek</span>
        {berletek.filter((t) => t.type === "monthly").map((t) => <TicketCard title={t.title} price={t.price} />)}
        <span className='text-[24px] md:text-[30px] uppercase tracking-widest font-light mb-4 mt-4'>Egyéb bérletek</span>
        {berletek.filter((t) => t.type === "other").map((t) => <TicketCard title={t.title} price={t.price} />)}
      </div>
    </motion.div>
  )
}

export default Page