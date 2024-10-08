"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCloseSharp, IoLogIn } from "react-icons/io5"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Felhasznalo } from "@prisma/client";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

interface PurchaseDialogProps {
  price: number
  title: string
}

const PurchaseDialog: React.FC<PurchaseDialogProps> = ({title, price}) => {
  const user = useUser();
  const [open, setOpen] = useState(false);

  async function onSubmit() {
    setOpen(false);

    const r = await fetch("/api/berlet", {
      method: "POST",
      body: JSON.stringify({
        userID: user.user!.ID,
        title: title,
      })
    })

    if (r.ok) {
      const now = new Date(Date.now());
      const month = (now.getMonth()+1) < 10 ? `0${now.getMonth()+1}` : now.getMonth()+1;
      const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
      const notificationId = user.notifications.length > 0 ? user.notifications[user.notifications.length-1].ID+1 : 1;
      toast("Sikeres vásárlás!", {
        icon: <IoCheckmarkCircleOutline size={20}/>,
        className: "bg-green-500 border-green-900"
      })
      user.addNotification(
        {ID: notificationId, title: "Sikeres vásárlás!", description: "Megvásároltad ezt: ", item: title, date: `${month}/${day}`, success: true},
      )
    } else {
      const message = (await r.json()).message;
      toast(message ?? "Valami hiba történt :(", {
        icon: <IoCloseCircleOutline size={20}/>,
        className: "bg-red-500 border-red-900"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger  className="outline-none w-full">
      <div onClick={(e) => {
        if (user.user == undefined) {
          toast("A vásárláshoz be kell jelentkezned!", {icon: <IoCloseSharp className='' size={20}/>,className: "bg-red-500 border-red-900"})
          setOpen(false);
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }} className='w-full h-12 bg-transparent border border-red-500 hover:bg-red-500 rounded-md cursor-pointer flex flex-row items-center justify-center gap-2 tracking-wide transition-colors'><FaShoppingCart size={20}/>{price} Ft</div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 border-black">
        <DialogHeader>
          <DialogTitle className="mb-4">Vásárlás</DialogTitle>
          <DialogDescription className="flex flex-col gap-10">
            <span className="text-white">Biztosan meg szeretnéd vásárolni ezt a bérletet?</span>
            <div className="flex flex-row gap-2">
              <Button onClick={onSubmit} className="w-20 hover:bg-red-500">Igen</Button>
              <Button onClick={() => {setOpen(false)}} className="w-20">Nem</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseDialog