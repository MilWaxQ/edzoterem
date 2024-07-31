"use client";

import useUser from '@/hooks/useUser';
import NotificationData from '@/types/notificationdata';
import { AnimationControls, motion, useAnimationControls } from 'framer-motion';
import React, { forwardRef } from 'react'
import { FaExclamation } from 'react-icons/fa6'
import { IoCheckmarkOutline } from 'react-icons/io5'

interface NotificationCardProps {
  notification: NotificationData
  globalController: AnimationControls
}

const NotificationCard: React.FC<NotificationCardProps> = ({notification, globalController}) => {
  const user = useUser();
  const controls = useAnimationControls()

  const removeNotification = () => {
    controls.start({
      x: 500,
      transition: {
        type: "tween",
        duration: 0
      }
    })
    setTimeout(() => {
      controls.start({
        height: 0,
        transition: {
          type: "tween",
          duration: 0
        }
      })

      setTimeout(() => {
        user.removeNotification(notification)
      }, 200)
    }, 200)
  }

  return (
    <motion.div inherit={false} style={{originX: 1}} animate={globalController}>
      <motion.div inherit={false} style={{originX: 1}} animate={controls} onClick={removeNotification} className='w-full h-16 border-b border-neutral-700 flex flex-row items-center px-2 gap-2 hover:bg-red-500/10 transition-all cursor-pointer'>
        {notification.success ? <IoCheckmarkOutline size={26} className='text-green-500' /> : <FaExclamation size={26} className='text-orange-500' />}
        <div className='w-full h-full flex flex-row justify-between items-center'>
          <div className='flex flex-col justify-center items-start '>
            <span className='text-sm'>{notification.title}</span>
            <span className='inline-block whitespace-nowrap text-ellipsis overflow-hidden w-[192px] text-xs font-light text-neutral-300'>{notification.description}<b className='text-white text-xs'>{notification.item}</b></span>
          </div>
          <span className='text-sm font-light text-neutral-300'>{notification.date}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NotificationCard