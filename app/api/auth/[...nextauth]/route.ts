import NextAuth, { AuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  session: {
    strategy: "database", // Uses the `Session` model in Prisma
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isSubscribed = user.isSubscribed;
      }
      return session;
    },
  },
};

// Use NextAuth for both GET and POST methods
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
