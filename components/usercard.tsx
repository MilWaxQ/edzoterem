"use client";

import { formatDate } from '@/lib/utils'
import { FelhasznaloWithBerlet } from '@/types/prisma'
import React, { useEffect, useReducer, useState } from 'react'
import QRCode from 'qrcode';
import { FaMinus, FaPlus } from 'react-icons/fa';
import useForceUpdate from '@/lib/forceupdate';

interface UserCardProps {
  userData: FelhasznaloWithBerlet
}

const UserCard: React.FC<UserCardProps> = ({userData}) => {
  const [qr, setQr] = useState("");
  const [user, setUser] = useState<FelhasznaloWithBerlet>(userData);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (user.berletek.length > 0) {
      QRCode.toDataURL(user.berletek[0].ID.toString(), {margin: 1}).then((v) => {
        setQr(v);
      });
    }
  }, [])

  async function decreaseCount(ID: string) {
    const aktualisBerlet = user.berletek.filter((b) => b.ID == ID);
    if (aktualisBerlet.length > 0) {
      const r = await fetch("/api/berlet", {
        method: "PATCH",
        body: JSON.stringify({ID: ID, alkalom: aktualisBerlet[0].alkalom-1})
      })
      if (r.status == 200) {
        aktualisBerlet[0].alkalom = aktualisBerlet[0].alkalom-1
        forceUpdate()
      }
    }
  }

  async function incrementCount(ID: string) {
    const aktualisBerlet = user.berletek.filter((b) => b.ID == ID)
    if (aktualisBerlet.length > 0) {
      const r = await fetch("/api/berlet", {
        method: "PATCH",
        body: JSON.stringify({ID: ID, alkalom: aktualisBerlet[0].alkalom+1})
      })
      if (r.status == 200) {
        aktualisBerlet[0].alkalom = aktualisBerlet[0].alkalom+1
        forceUpdate()
      }
    }
  }

  return (
    <div key={user.ID} className='w-full basis-[24.3%] min-w-96 h-60 bg-neutral-800 rounded-md flex flex-col p-4 hover:bg-neutral-700 cursor-pointer transition-all'>
      <div className='w-full min-h-10 flex flex-row justify-between items-center'>
        <h2 className='font-bold text-lg'>{user.nev}</h2>
        <span className='text-neutral-600 text-6xl'>{user.ID}</span>
      </div>
      <div className='w-full h-full flex flex-col text-neutral-300'>
        <span>{user.email}</span>
        <span>{user.telefonszam}</span>
      </div>
      {user.berletek.length > 0 && <div className={`w-full min-h-fit flex flex-row justify-between`}>
        <div className='flex flex-col justify-end items-start'>
          <span>Lejárat dátuma: {formatDate(user.berletek[0].lejaratDatuma)}</span>
          {user.berletek[0].alkalom > 0 && <div className='flex flex-row items-center gap-2'>
            <span>Alkalmak: </span>
            <FaMinus onClick={(e) => {e.stopPropagation(); decreaseCount(user.berletek[0].ID)}} className='text-red-500 mt-1 cursor-pointer select-none' />
            <span>{user.berletek[0].alkalom}</span>
            <FaPlus onClick={(e) => {e.stopPropagation(); incrementCount(user.berletek[0].ID)}} className='text-green-500 mt-1 cursor-pointer select-none' />
          </div>}
        </div>
        <img width={100} height={100} src={qr} />
      </div>}
    </div>
  )
}

export default UserCard