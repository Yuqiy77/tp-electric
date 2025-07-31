import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // For demo purposes, using hardcoded admin credentials
        // In production, you should store these in a database
        const adminUsername = "tpelectric";
        const adminPassword = "Tpc1969.08.13";
        
        if (credentials.username === adminUsername) {
          // For demo, using simple password check
          // In production, use bcrypt.compare(credentials.password, adminPassword)
          if (credentials.password === adminPassword) {
            return {
              id: "1",
              name: "Admin",
              email: "admin@tpelectric.com",
              role: "admin"
            };
          }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 