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
import { toast } from "sonner";
 
const formSchema = z.object({
  email: z.string().email("Hibás e-mail formátum."),
  password: z.string()
})

const LoginDialog = () => {
  const user = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const r = await fetch(`/api/user?email=${values.email}&password=${values.password}`);

    if (r.status == 200) {
      const u = (await r.json()) as Felhasznalo;
      user.setUser(u);
      toast("Sikeres bejelentkezés!", {
        icon: <IoCheckmarkCircleOutline size={20}/>,
        className: "bg-green-500 border-green-900"
      })
    } else {
      form.setError("email", {message: "Hibás e-mail cím vagy jelszó"})
      form.setError("password", {message: "Hibás e-mail cím vagy jelszó"})
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="outline-none">
      <div className='flex flex-row bg-red-500 p-2 items-center justify-center rounded-md gap-2 cursor-pointer'><IoLogIn size={22} /> Bejelentkezés</div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 border-black">
        <DialogHeader>
          <DialogTitle className="mb-4">Bejelentkezés</DialogTitle>
          <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <Button type="submit">Bejelentkezés</Button>
            </form>
          </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog