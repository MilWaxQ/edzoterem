import prisma from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";

async function handler(req: NextRequest) {
  if (req.method == "GET") {
    const params = req.nextUrl.searchParams;
    const userID = Number(params.get("user"))
    const now = new Date(Date.now());
    const berlet = await prisma.berlet.findFirst({where: {felhasznaloID: userID}, orderBy: {lejaratDatuma: "desc"}});

    if (berlet != null) {
      if (berlet.lejaratDatuma < now) {
        return new NextResponse(JSON.stringify({}), {status: 200})
      }
    }

    return new NextResponse(JSON.stringify(berlet ?? {}), {status: 200});
  } else if (req.method == "POST") {
    const b = await req.json();
    const userID = b.userID;
    const title: string = b.title.toString();
    const now = new Date(Date.now());
    const expireDate = new Date(now);

    if (title.toLowerCase().includes("havi") || title.toLowerCase().includes("vip")) {
      expireDate.setMonth(expireDate.getMonth() + 1);
    } else if (title.toLowerCase().includes("negyedéves")) {
      expireDate.setMonth(expireDate.getMonth() + 3);
    } else if (title.toLowerCase().includes("10 alkalmas")) {
      expireDate.setDate(expireDate.getDate() + 45);
    }

    const id = uuidv4();
    var r;

    const berlet = await prisma.berlet.findFirst({where: {felhasznaloID: userID}});

    if (berlet != null) {
      if (berlet.lejaratDatuma >= now) {
        return new NextResponse(JSON.stringify({success: false, message: "Már van érvényes bérleted"}), {status: 409})
      }
    }

    if (!title.toLowerCase().includes("bérlet")) {
      return new NextResponse(JSON.stringify({success: true}), {status: 200})
    }

    try {
      r = await prisma.berlet.create({
        data: {
          ID: id,
          berlet: title,
          lejaratDatuma: expireDate,
          felhasznaloID: userID,
          vasarlasDatuma: now,
          alkalom: title.toLowerCase().includes("10 alkalmas") ? 10 : 0
        }
      })
    } catch (e) {
      return new NextResponse(JSON.stringify({success: false}), {status: 409});
    }

    return new NextResponse(JSON.stringify({success: true}), {status: 200})
  } else if (req.method == "PATCH") {
    const b: {ID: string, alkalom: number} = await req.json();

    try {
      const update = await prisma.berlet.update({
        data: {
          alkalom: b.alkalom
        },
        where: {
          ID: b.ID
        }
      });

      return new NextResponse(JSON.stringify({success: true}), {status: 200})
    } catch (error) {
      return new NextResponse(JSON.stringify({success: false}), {status: 500})
    }
  }
}

export {handler as GET, handler as POST, handler as PATCH}