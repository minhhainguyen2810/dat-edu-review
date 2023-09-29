'use client';

import { Session } from 'next-auth';
import { createContext, PropsWithChildren } from 'react';

export const AuthContext = createContext<Session | null>(null);

export function Providers({
  children,
  session
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
