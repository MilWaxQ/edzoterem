"use client";
import { v4 as uuidv4 } from 'uuid';

import QRCode from 'qrcode'
import DataCard from "@/components/datacard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { GrContactInfo } from 'react-icons/gr';
import { LiaDumbbellSolid } from 'react-icons/lia';
import { GoSignOut } from 'react-icons/go';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Berlet } from '@prisma/client';

const Profile = () => {
  const user = useUser();
  const router = useRouter()
  const [qr, setQr] = useState("");
  const [berlet, setBerlet] = useState<Berlet>();

  async function loadBerlet() {
    const berletData = await (await fetch("/api/berlet?user=1")).json();
    if (berletData.ID != null) {
      const qrSource = await QRCode.toDataURL(berletData.ID.toString(), {margin: 1});
      setQr(qrSource)
      setBerlet(berletData)
    }
  }

  useEffect(() => {
    /*const uuid = uuidv4();
    QRCode.toDataURL(uuid, {margin: 1}).then((v) => {
      setQr(v);
      setId(uuid);
    })*/
   loadBerlet()
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem("user-storage") == null) {
      router.push("/");
      return;
    }
    if (user.user == undefined && user.isHydrated) {
      router.push("/");
      return;
    }
  }, [user])

  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    }} className="bg-neutral-900 min-h-screen text-white flex flex-col items-center justify-center p-8 pt-36 md:pt-24 gap-16">
      <div className='md:h-[75vh] w-full md:w-[32rem] bg-neutral-800 relative rounded-lg drop-shadow-lg flex flex-col items-center pt-24 px-4 md:px-8 gap-4 pb-4'>
        <div className='w-32 h-32 bg-red-500 border-[12px] border-neutral-900 rounded-full flex items-center justify-center text-5xl drop-shadow-2xl absolute left-1/2 -translate-x-1/2 -top-12'>M</div>
        <div className='text-2xl font-bold tracking-widest'>{user.user?.nev ?? ""}</div>
        <Accordion className="w-full border-none" type="single" collapsible defaultValue="item-1">
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="text-lg flex flex-row justify-between">
              <div className='flex flex-row justify-start gap-2 items-center'>
                <GrContactInfo size={24} />
                <span>Adatok</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 flex flex-col gap-4">
              <DataCard label="E-mail cím" value={user.user?.email ?? ""} />
              <DataCard label="Telefonszám" value={user.user?.telefonszam ?? ""} />
              <DataCard label="Születési dátum" value={(new Date(user.user?.szuletesiDatum ?? "").toLocaleDateString())} />
              <DataCard label="Regisztráció dátuma" value={(new Date(user.user?.regisztracioDatuma ?? "").toLocaleDateString())} />
              <DataCard label="Lakcím" value={user.user?.lakcim ?? ""} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className="text-lg flex flex-row justify-between">
              <div className='flex flex-row justify-start gap-2 items-center'>
                <LiaDumbbellSolid size={24} />
                <span>Bérletem</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 flex flex-col items-center gap-4">
              {berlet != undefined && berlet != null ? <div className='w-full flex flex-col items-center gap-4'>
                <DataCard label="Azonosító" value={berlet?.ID.toString() ?? "-"} />
                <DataCard label="Érvényesség kezdete" value={(new Date(berlet?.vasarlasDatuma ?? "").toLocaleDateString())} />
                <DataCard label="Lejárat dátuma" value={(new Date(berlet?.lejaratDatuma ?? "").toLocaleDateString())} />
                {berlet.alkalom > 0 ? <DataCard label="Hátralévő alkalmak" value={berlet.alkalom.toString()} /> : null}
                <div className="w-full h-32 flex items-center justify-center mt-4">
                  <img width={140} height={140} src={qr} />
                </div>
              </div> : <span className='text-lg font-bold'>Nincs bérleted</span>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className='h-full flex-grow'></div>
        <div onClick={() => {user.setUser(undefined); router.push("/"); toast("Sikeres kijelentkezés!", {icon: <IoCheckmarkCircleOutline size={20}/>,className: "bg-green-500 border-green-900"})}} className='w-40 min-h-12 text-red-500 rounded-md hover:bg-red-500/20 transition-all cursor-pointer flex flex-row items-center justify-center gap-2'>
          <GoSignOut size={20} />
          <span>Kijelentkezés</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile