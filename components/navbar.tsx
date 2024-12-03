"use client";

import React, { useEffect, useRef, useState } from 'react'
import { FaHome, FaRegBell, FaRegUserCircle, FaUser } from 'react-icons/fa'
import { IoTicket, IoLogIn, IoCamera } from 'react-icons/io5'
import NavItem from './navitem';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { IoCheckmarkOutline } from 'react-icons/io5';
import NotificationCard from './notificationcard';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import LoginDialog from './logindialog';
import RegisterDialog from './registerdialog';

const NavBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const user = useUser();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const globalNotificationControls = useAnimationControls()
  const router = useRouter();

  const outsideClick = (e: MouseEvent) => {
    if (!notificationsRef.current?.contains(e.target as Node)) {
      setShowNotifications(false);
      //e.preventDefault();
      //e.stopPropagation();
    }
  }

  const removeAllNotifications = () => {
    globalNotificationControls.start({
      x: 500,
      transition: {
        type: "tween",
        duration: 0.2
      }
    })
    setTimeout(() => {
      globalNotificationControls.start({
        height: 0,
        transition: {
          type: "tween",
          duration: 0.2
        }
      })

      setTimeout(() => {
        setShowNotifications(false);
        user.clearNotifications();
      }, 10)
    }, 200)
  }

  useEffect(() => {
    window.addEventListener("mousedown", outsideClick);
  }, [])

  return (
    <div className="w-[96vw] lg:w-[98vw] mt-4 h-16 bg-neutral-800 rounded-lg shadow-xl flex flex-row items-center justify-evenly overflow-visible lg:px-8 px-4 fixed left-1/2 -translate-x-1/2 z-10">
      <div className="w-full h-full flex flex-row items-center justify-start">
        <div onClick={() => {
          //user.addNotification({title: "Sikeres vásárlás!", description: "Megvásároltad ezt: ", item: "Napijegy", date: "07/31", success: true})
          router.push("/")
        }} className='rounded-full overflow-hidden p-5 relative bg-white cursor-pointer'><Image src={"/images/logo.jpg"} alt='' fill style={{padding: "4px", objectFit: 'contain'}} ></Image></div>
      </div>
      <div className="w-full h-full flex flex-row items-center justify-center lg:justify-center gap-4">
        {/*<NavItem title='Főoldal' path='/' icon={<FaHome size={20}/>}/>*/}
        <NavItem title='Jegyek & Bérletek' path='/berletek' icon={<IoTicket size={20}/>}/>
        <NavItem title='Galéria' path='/galeria' icon={<IoCamera size={20}/>}/>
        {user.user?.admin && <NavItem title='Admin' path='/admin' icon={<FaUser size={20} />} />}
      </div>
      <div className="w-full h-full flex flex-row items-center justify-end gap-4">
        <AnimatePresence mode='wait'>
          {user.user != undefined && <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{type: "spring", stiffness: "500", damping: "30"}} exit={{ scale: 0, opacity: 0, transition: {duration: 0.1} }} key={"user"} className='flex flex-row items-center gap-2'>
            <div className='cursor-pointer'><div onClick={() => {if(!showNotifications) setShowNotifications(true)}} className={`p-2 relative ${showNotifications ? 'pointer-events-none' : 'pointer-events-auto'}`}><FaRegBell size={24}/>
              <motion.div animate={user.notifications.length > 0 ? 'visible' : 'initial'} variants={{initial: {scale: 0}, visible: {scale: 1}}} className='w-3 h-3 rounded-full bg-red-500 absolute right-0 bottom-0 flex items-center justify-center text-xs p-2'>{user.notifications.length}</motion.div>
            </div>
            </div>
            <motion.div ref={notificationsRef} onClick={(e) => {e.stopPropagation(); e.preventDefault()}} style={{originX: 0.925, originY: 0}} animate={showNotifications ? 'visible' : 'hidden'} initial={{scale: 0, opacity: 0}} variants={{visible: {opacity: 1, scale: 1}, hidden: {opacity: 0, scale: 0}}} className={`absolute w-72 h-80 right-[77px] top-[4.5rem] bg-neutral-800 cursor-default rounded-lg flex flex-col items-start justify-start ${showNotifications ? 'pointer-events-auto' : 'pointer-events-none'}`}>
              <div className='absolute bg-transparent border-8 border-t-transparent border-r-transparent border-l-transparent border-neutral-800 w-0 h-0 top-[-1rem] right-4 z-10'></div>
              <div className='w-full h-full overflow-x-hidden overflow-y-auto flex flex-col items-center'>
                {user.notifications.map((n) => <NotificationCard globalController={globalNotificationControls} key={n.description} notification={n}/>)}
                {user.notifications.length > 0 ? <div onClick={() => {removeAllNotifications();}} className='w-8 h-8 p-2 rounded-full bg-neutral-700 flex items-center justify-center my-4 cursor-pointer'>X</div> : <div className='my-auto flex flex-row gap-2'><IoCheckmarkOutline size={26} className='text-green-500' /> Nincs értesítésed.</div>}
              </div>
            </motion.div>
            <div onClick={() => {router.push("/profile")}} className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer'>{user.user.nev.split(" ")[1].substring(0, 1)}</div>
            </motion.div>}
          {user.user == undefined && <motion.div initial={{ scaleX: 0, opacity: 0, originX: 1 }} animate={{ scaleX: 1, opacity: 1 }} transition={{type: "spring", stiffness: "500", damping: "30"}} exit={{ scaleX: 0, opacity: 0, transition: {duration: 0.1}}} key={"buttons"} className='flex flex-row gap-4'>
            <LoginDialog />
            <RegisterDialog />
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NavBar