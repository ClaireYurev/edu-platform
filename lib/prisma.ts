// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Extend global object for better type safety
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

// Use the global object to store the PrismaClient instance in development.
// This prevents multiple instances from being created due to hot-reloading.
const globalForPrisma = global as NodeJS.Global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn", "query"], // Add query logging in development
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
