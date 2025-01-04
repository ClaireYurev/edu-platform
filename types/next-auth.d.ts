// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

// Option 1: Augment the Session interface

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      isSubscribed: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    isSubscribed: boolean
  }
}

// Here, we’re extending Session.user by merging it with DefaultSession["user"] (which includes name, email, image), plus our custom fields.
// Also note, you might define the interface for the User if you want to ensure user.isSubscribed is typed there as well.