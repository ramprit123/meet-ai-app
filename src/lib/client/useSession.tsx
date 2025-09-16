/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  // Add other fields as needed
};

type SessionState = { user?: User; loading: boolean };
const SessionContext = createContext<SessionState>({ loading: true });

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>({ loading: true });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/auth/session");
        if (!mounted) return;
        if (res.ok) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const user: User = await res.json();
          setState({ user, loading: false });
        } else {
          setState({ user: undefined, loading: false });
        }
      } catch {
        if (!mounted) return;
        setState({ user: undefined, loading: false });
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
