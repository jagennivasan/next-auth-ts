import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;  
        }

        const passwordMatch = await argon2.verify(
          existingUser.password,
          credentials.password
        );
        if (!passwordMatch) {
          return null;
        }

        // If the password matches, return the user object
        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, user);

      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
      return session;
    },
  },
};
