import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
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
  session: {
    // strategy: "jwt",
    maxAge: 4 * 60 * 60, // 4 hours
  },
  //   pages: {
  //     signIn: "/auth/signin",
  //     newUser: "/auth/signup",
  //   },
};
