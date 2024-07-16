import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
import connectDatabase from "@/config/database";
import { verifyPassword } from "@/libs/auth";

export const options: NextAuthOptions = {
  session: {
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      },

      async authorize(credentials) {
        try {
          await connectDatabase();
          const user = await User.findOne({ email: credentials?.email });

          console.log(user);
          if (user) {
            const isMatched = await verifyPassword(
              credentials?.password ?? "",
              user.password
            );

            if (isMatched) {
              delete user.password;

              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token._doc = user._doc;
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
