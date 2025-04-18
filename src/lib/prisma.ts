import PrismaClient from "@prisma/client";

export const prisma = new PrismaClient.PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma