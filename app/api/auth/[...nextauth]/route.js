import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "@/lib/db";
import crypto from "crypto";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const hashedPassword = crypto
            .createHash("sha1")
            .update(credentials.password)
            .digest("hex");

          const query = `
            SELECT u.*, ut.user_type_name, po.provincial_office
            FROM users u
            JOIN usertypes ut ON u.user_type_id = ut.user_type_id
            LEFT JOIN provincial_office po ON u.province_id = po.province_id
            WHERE u.username = ? AND u.password = ? AND u.is_active = 1
          `;

          const users = await executeQuery({
            query,
            values: [credentials.username, hashedPassword],
          });

          if (users && users.length > 0) {
            const user = users[0];
            return {
              id: user.user_id.toString(),
              name: user.full_name,
              email: user.email,
              role: user.user_type_name,
              provinceId: user.province_id,
              provinceName: user.provincial_office,
            };
          }

         return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.provinceId = user.provinceId;
        token.provinceName = user.provinceName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.provinceId = token.provinceId;
        session.user.provinceName = token.provinceName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
