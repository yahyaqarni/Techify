import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbPool from "@/lib/db";
import bcrypt from 'bcrypt';
import crypto from "crypto";

const adminEmails = ["yahya@gmail.com"];
const promisePool = dbPool.promise();

export const authOptions = {
  secret: process.env.NEW_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      session: {
        jwt: true,
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          const [results] = await promisePool.query(
            "SELECT UserID, fName, Email, Password FROM `Users` WHERE Email = ?",
            [email]
          );

          if (results && results.length > 0) {
            if (bcrypt.compareSync(password, results[0].Password)) {
              const user = {
                id: results[0].UserID,
                name: results[0].fName,
                email: results[0].Email,
              };
              return user;
            } else return null;
          } else {
            return null; // No user found with provided credentials
          }
        } catch (err) {
          console.log(err);
          return null; // Error occurred during database query
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      console.log(token);
      return token;
    },

    async session({ session, token, user }) {
      //if (!user) return;
      session.user = token.user;
      console.log(session.user);
      return session;
    },

  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}
