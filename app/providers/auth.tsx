'use client';

import { TSession } from 'app/types';
import { createContext, PropsWithChildren } from 'react';

export const AuthContext = createContext<TSession | null>(null);

export function AuthProvider({
  children,
  session
}: PropsWithChildren<{ session: TSession | null }>) {
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
