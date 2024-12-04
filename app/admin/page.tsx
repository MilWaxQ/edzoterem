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
        {users.map((u) => <UserCard key={u.ID} userData={u} />)}
      </div>
    </motion.div>
  )
}

export default Page