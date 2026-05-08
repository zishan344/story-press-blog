import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.provider = account.provider;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.email ?? "";
        session.user.provider =
          typeof token.provider === "string" ? token.provider : "google";
      }

      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;
      session.idToken =
        typeof token.idToken === "string" ? token.idToken : undefined;

      return session;
    },
  },
});
