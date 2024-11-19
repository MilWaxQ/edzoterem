import { Prisma } from "@prisma/client"

export type FelhasznaloWithBerlet = Prisma.FelhasznaloGetPayload<{
  include: { berletek: true }
}>