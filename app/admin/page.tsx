"use client";

import useUser from '@/hooks/useUser';
import { formatDate } from '@/lib/utils';
import { FelhasznaloWithBerlet } from '@/types/prisma';
import { Felhasznalo } from '@prisma/client';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import UserCard from '@/components/usercard';

const Page = () => {
  const user = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<FelhasznaloWithBerlet[]>([])

  async function fetchData() {
    const r = await fetch("/api/users");
    //const users = Array(100).fill({ID: 1, nev: "asd", email: "asd", lakcim: "asd", telefonszam: "asd", szuletesiDatum: "asd", regisztracioDatuma: "asd"}, 0, 100);
    const users = await r.json();
    setUsers(users);
  }

  useEffect(() => {
    if (user.user != undefined && !user.user?.admin) {
      router.push("/");
    } else if (user.user != undefined && user.user.admin) {
      fetchData();
    }
  }, [user.user])

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
      <h1 className="text-[32px] md:text-[40px] uppercase tracking-widest font-light mx-auto">Felhasználók</h1>
      <div className='w-full h-auto rounded-lg flex flex-row flex-wrap gap-4 justify-center items-start'>
        {users.map((u) => <UserCard key={u.ID} user={u} />)}
      </div>
      <div className='w-full h-auto bg-neutral-800 rounded-lg relative overflow-hidden hidden'>
        <table suppressHydrationWarning className='w-full h-full table-fixed'>
          <thead>
            <tr>
              <th className='text-left px-4 pt-2 w-16'>ID</th>
              <th className='text-left pt-2 w-auto'>Név</th>
              <th className='text-left pt-2'>E-mail cím</th>
              <th className='text-left pt-2'>Lakcím</th>
              <th className='text-left pt-2'>Telefonszám</th>
              <th className='text-left pt-2'>Születési dátum</th>
              <th className='text-left pt-2'>Regisztráció dátuma</th>
            </tr>
          </thead>
          <div className='min-h-2'></div>
          <div className='min-h-[1px] min-w-full bg-neutral-500 absolute left-0 top-10'></div>
          <tbody>
            {users.map((u) => <tr className='even:bg-neutral-800 odd:bg-neutral-700' key={u.ID}>
              <td className='px-4 py-2 w-16'>{u.ID}</td>
              <td className='w-auto'>{u.nev}</td>
              <td>{u.email}</td>
              <td>{u.lakcim}</td>
              <td>{u.telefonszam}</td>
              <td>{formatDate(u.szuletesiDatum)}</td>
              <td>{formatDate(u.regisztracioDatuma, true)}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default Page