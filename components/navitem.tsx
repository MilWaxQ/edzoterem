"use client";

import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'

interface NavItemProps {
  title: string
  icon: ReactNode
  path: string
}

const NavItem: React.FC<NavItemProps> = ({title, icon, path}) => {
  const currentPath = usePathname();
  const router = useRouter();
  
  return (
    <span onClick={() => {router.push(path)}} className={`p-2 rounded-md flex flex-row items-center gap-2 cursor-pointer transition-all ${currentPath === path ? "bg-red-500" : "bg-transparent hover:bg-red-500 hover:bg-opacity-30"}`}>
      {icon}
      {title}
    </span>
  )
}

export default NavItem