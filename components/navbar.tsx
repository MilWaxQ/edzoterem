"use client";

import React, { useState } from 'react'
import { FaHome, FaRegUserCircle } from 'react-icons/fa'
import { IoTicket, IoLogIn } from 'react-icons/io5'
import NavItem from './navitem';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="w-full h-16 bg-neutral-800 rounded-lg shadow-xl flex flex-row items-center justify-evenly overflow-hidden px-8 mb-8">
      <div className="w-full h-full flex flex-row items-center justify-start">
        <p>Edzőterem</p>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center gap-4">
        <NavItem title='Főoldal' path='/' icon={<FaHome/>}/>
        <NavItem title='Bérletek' path='/berletek' icon={<IoTicket/>}/>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-end gap-4">
        <AnimatePresence mode='wait'>
          {loggedIn && <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{type: "spring", stiffness: "500", damping: "30"}} exit={{ scale: 0, opacity: 0, transition: {duration: 0.1} }} key={"user"} onClick={() => {setLoggedIn(false)}} className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer'>M</motion.div>}
          {!loggedIn && <motion.div initial={{ scaleX: 0, opacity: 0, originX: 1 }} animate={{ scaleX: 1, opacity: 1 }} transition={{type: "spring", stiffness: "500", damping: "30"}} exit={{ scaleX: 0, opacity: 0, transition: {duration: 0.1}}} key={"buttons"} className='flex flex-row gap-4'>
            <div onClick={() => {setLoggedIn(true)}} className='flex flex-row bg-red-500 p-2 items-center justify-center rounded-md gap-2 cursor-pointer'><IoLogIn size={22} /> Bejelentkezés</div>
            <div onClick={() => {setLoggedIn(true)}} className='flex flex-row border border-red-500 p-2 items-center justify-center rounded-md gap-2 cursor-pointer'><FaRegUserCircle size={20} /> Regisztráció</div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NavBar