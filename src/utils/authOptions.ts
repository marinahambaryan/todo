import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { configValues } from "./config";

const { NEXTAUTH_SECRET } = configValues;

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      authorize(credentials, req) {
        // Perform database operations
        if (
          credentials?.email === "admin@example.com" &&
          credentials.password === "admin"
        ) {
          return {
            id: "1",
            email: "admin@example.com",
          };
        }
        return null;
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
