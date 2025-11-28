import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const adminEmail = process.env.ADMIN_EMAIL || "admin@bsdeveloper.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        // Verificar credenciais
        if (credentials.email !== adminEmail) {
          throw new Error("Credenciais inválidas");
        }

        // Em produção, usar hash. Por simplicidade, comparação direta aqui
        const isValidPassword = credentials.password === adminPassword;

        if (!isValidPassword) {
          throw new Error("Credenciais inválidas");
        }

        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
          role: "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
