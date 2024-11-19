"use client";

import { formatDate } from '@/lib/utils'
import { FelhasznaloWithBerlet } from '@/types/prisma'
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode';

interface UserCardProps {
  user: FelhasznaloWithBerlet
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (user.berletek.length > 0) {
      QRCode.toDataURL(user.berletek[0].ID.toString(), {margin: 1}).then((v) => {
        setQr(v);
      });
    }
  }, [])

  return (
    <div key={user.ID} className='w-full basis-[24.3%] min-w-96 h-60 bg-neutral-800 rounded-md flex flex-col p-4 hover:bg-neutral-700 cursor-pointer transition-all'>
      <div className='w-full min-h-10 flex flex-row justify-between items-center'>
        <h2 className='font-bold text-lg'>{user.nev}</h2>
        <span className='text-neutral-300'>{user.ID}</span>
      </div>
      <div className='w-full h-full flex flex-col text-neutral-300'>
        <span>{user.email}</span>
        <span>{user.telefonszam}</span>
      </div>
      {user.berletek.length > 0 && <div className={`w-full min-h-fit flex flex-row justify-between`}>
        <div className='flex flex-col justify-end items-start'>
          <span>Lejárat dátuma: {formatDate(user.berletek[0].lejaratDatuma)}</span>
          {user.berletek[0].alkalom > 0 && <span>Alkalmak: {user.berletek[0].alkalom}</span>}
        </div>
        <img width={100} height={100} src={qr} />
      </div>}
    </div>
  )
}

export default UserCard