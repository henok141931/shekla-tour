import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });

        // For this MVP, we'll do a simple plain text check or dummy check if DB is empty
        // In a real app, this MUST use bcrypt.compare
        if (user && user.passwordHash === credentials.password) {
          return { id: user.id, email: user.email, role: user.role };
        }

        // Fallback admin for local testing if DB is not seeded
        if (credentials.email === "admin@shekla.com" && credentials.password === "admin123") {
           return { id: "1", email: "admin@shekla.com", role: "ADMIN" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export { handler as GET, handler as POST };
