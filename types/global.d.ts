// The issue arises because of the ESLint rule 
// Alternative Approach: Refactor Without Namespaces
// If you prefer not to suppress the ESLint rule, you can refactor to avoid using declare global. This involves using a global.d.ts file, as mentioned in the previous solution.

// Create a Global Declaration File:

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}