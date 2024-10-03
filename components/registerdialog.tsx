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

import { IoCheckmarkCircleOutline, IoLogIn } from "react-icons/io5"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Felhasznalo } from "@prisma/client";
import useUser from "@/hooks/useUser";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "sonner";
 
const formSchema = z.object({
  name: z.string().min(1, "Kötelező."),
  email: z.string().email("Hibás e-mail formátum."),
  password: z.string().min(1, "Kötelező."),
  birthDate: z.string().date("Adj meg egy érvényes születési dátumot."),
  address: z.string().min(1, "Kötelező."),
  phoneNumber: z.string().length(12, "Formátum: +36XXXXXXXXX")
})

const RegisterDialog = () => {
  const user = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthDate: new Date(Date.now()).toLocaleDateString(),
      address: "",
      phoneNumber: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const r = await fetch(`/api/user`, {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
        birthDate: values.birthDate,
        address: values.address,
        phoneNumber: values.phoneNumber
      })
    });

    if (r.status == 200) {
      const u = (await r.json()) as Felhasznalo;
      user.setUser(u);
      toast("Sikeres regisztráció!", {
        icon: <IoCheckmarkCircleOutline size={20}/>,
        className: "bg-green-500 border-green-900"
      })
    } else {
      const error = await r.text();
      if (error.includes("Email")) {
        form.setError("email", {message: "Ez az e-mail cím már használatban van."})
      } else {
        form.setError("phoneNumber", {message: "Ez a telefonszám már használatban van."})
      }
    }

    
  }

  return (
    <Dialog>
      <DialogTrigger className="outline-none">
      <div className='flex flex-row border border-red-500 p-2 items-center justify-center rounded-md gap-2 cursor-pointer'><FaRegUserCircle size={20} /> Regisztráció</div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 border-black">
        <DialogHeader>
          <DialogTitle className="mb-4">Regisztráció</DialogTitle>
          <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Név</FormLabel>
                    <FormControl>
                      <Input placeholder="Írd be a neved..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail cím</FormLabel>
                    <FormControl>
                      <Input placeholder="Írd be az e-mail címed..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jelszó</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Írd be a jelszavad..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lakcím</FormLabel>
                    <FormControl>
                      <Input placeholder="Írd be a lakcímed..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Születési dátum</FormLabel>
                    <FormControl>
                      <Input style={{colorScheme: "dark"}} defaultValue={form.control._defaultValues.birthDate} type="date" placeholder="Add meg a születési dátumod..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonszám</FormLabel>
                    <FormControl>
                      <Input placeholder="Írd be a telefonszámod..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterDialog