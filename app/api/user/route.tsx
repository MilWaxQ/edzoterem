import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash, compare } from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    const email = req.nextUrl.searchParams.get("email")!;
    const pass = req.nextUrl.searchParams.get("password")!;

    const user = await prisma.felhasznalo.findFirst({where: {email: email}});
    if (user == null) {
      return new NextResponse("User not found", {status: 404})
    }

    const passwordCorrect = await compare(pass, user.jelszo);
    if (passwordCorrect) {
      return new NextResponse(JSON.stringify(user), {status: 200})
    }

    return new NextResponse("Wrong password", {status: 401})
  } else {
    const b = await req.json();
    const name = b.name;
    const email = b.email;
    const password = b.password;
    const birthDate = new Date(b.birthDate).toISOString();
    const address = b.address;
    const phoneNumber = b.phoneNumber;

    const hashedPassword = await hash(password, 10);
    const registerDate = new Date(Date.now()).toISOString();
    var r;

    try {
      r = await prisma.felhasznalo.create({
        data: {
          nev: name,
          email: email,
          jelszo: hashedPassword,
          szuletesiDatum: birthDate,
          lakcim: address,
          telefonszam: phoneNumber,
          regisztracioDatuma: registerDate
        }
      })
    } catch (e) {
      const error = (e as PrismaClientKnownRequestError).meta!.target;
      if (error == "email") {
        return new NextResponse("Email alredy in use", {status: 409});
      } else {
        return new NextResponse("Phone number alredy in use", {status: 409});
      }
    }

    return new NextResponse(JSON.stringify(r), {status: 200});
  }
}

export {handler as GET, handler as POST}