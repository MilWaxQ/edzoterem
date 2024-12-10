import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

async function handler(req: NextRequest) {
  if (req.method == "GET") {
    const data = await prisma.felhasznalo.findMany();
    const berletek = await prisma.berlet.findMany();
    const users = data.map((u) => ({ID: u.ID, nev: u.nev, email: u.email, lakcim: u.lakcim, telefonszam: u.telefonszam, szuletesiDatum: u.szuletesiDatum, regisztracioDatuma: u.regisztracioDatuma, berletek: berletek.filter((b) => b.felhasznaloID == u.ID)}));
    return new NextResponse(JSON.stringify(users), {status: 200})
  }
}

export {handler as GET}