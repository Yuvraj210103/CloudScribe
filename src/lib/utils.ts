import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import API from '@/API';
import type { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (typeof credentials !== 'undefined') {
          const { data } = await API.authenticate({ email: credentials.email, password: credentials.password });
          if (typeof data !== 'undefined') {
            return { ...data.user, apiToken: data.accessToken };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== 'iat' && c !== 'exp' && c !== 'jti' && c !== 'apiToken') {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user }) {
      if (typeof user !== 'undefined') {
        // user has just signed in so the user object is populated
        return user as unknown as JWT;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
