/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SessionProvider } from 'next-auth/react';

export default function ClientProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  console.log(session, 'session');
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
