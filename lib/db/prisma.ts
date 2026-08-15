import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

let dbInstance: PrismaClient | null = null;

try {
  dbInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = dbInstance;
  }
} catch (error) {
  console.warn(
    "Prisma client is not ready yet. Falling back to non-DB storage mode.",
    error instanceof Error ? error.message : error
  );
}

export const db = dbInstance;
export const isPrismaReady = () => Boolean(db);
