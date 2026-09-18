import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client Singleton for Remix/Vite HMR
 *
 * Prevents instantiating multiple instances of PrismaClient during development
 * hot module reload (HMR) cycles.
 */

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient();
  }
  prisma = globalThis.__prisma;
}

export { prisma };
export const db = prisma;
