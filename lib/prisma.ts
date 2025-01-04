// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Use the global object to store the PrismaClient instance in development.
// This prevents multiple instances from being created due to hot-reloading.
const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn", "query"], // Add query logging in development
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
