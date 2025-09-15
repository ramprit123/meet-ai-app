/*
  script.js
  Node scaffolder to add Better Auth integration into a Next.js 15 (App Router) project (src/ folder)

  - Creates src/lib/auth.ts (Better Auth instance)
  - Creates src/app/api/auth/[...all]/route.ts (Next.js handler)
  - Creates simple credential endpoints: src/app/api/auth/credentials/route.ts
  - Creates auth pages: sign-in, sign-up, forgot under src/app/(auth)/
  - Creates basic server/client helpers for session

  Usage: node script.js
  (run from project root)
*/

import fs from "fs";
import path from "path";

/**
 * @param {fs.PathOrFileDescriptor} filePath
 * @param {string | NodeJS.ArrayBufferView<ArrayBufferLike>} content
 */
function write(filePath, content) {
  // @ts-ignore
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("WROTE:", filePath);
}

// 1) src/lib/auth.ts
write(
  "src/lib/auth.ts",
  `import { betterAuth } from 'better-auth';

// Export a single Better Auth instance. Adjust plugins/options to your needs.
// Keep secrets and base URL in environment variables.

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  // providers: { google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET } },
});
`,
);

// 2) API route for Better Auth handler
write(
  "src/app/api/auth/[...all]/route.ts",
  `import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

// Mount Better Auth's handler at /api/auth/[...all]
export const { GET, POST } = toNextJsHandler(auth.handler);
`,
);

// 3) Server helper to fetch session (server-side)
write(
  "src/lib/server/auth.ts",
  `import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getServerSession() {
  return await auth.api.getSession({ headers: await headers() });
}
`,
);

// 4) Simple client hook (client-side) to expose session state
write(
  "src/lib/client/useSession.tsx",
  `"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type SessionState = { user?: any; loading: boolean };
const SessionContext = createContext<SessionState>({ loading: true });

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SessionState>({ loading: true });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/auth/session');
        if (!mounted) return;
        if (res.ok) setState({ user: await res.json(), loading: false });
        else setState({ user: undefined, loading: false });
      } catch (e) {
        if (!mounted) return;
        setState({ user: undefined, loading: false });
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return <SessionContext.Provider value={state}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
`,
);

// 5) Auth pages: sign-in, sign-up, forgot
const signInPage = `import React from 'react';

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
      <form action="/api/auth/credentials/sign-in" method="post" className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input name="password" type="password" required className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-slate-800 text-white">Sign in</button>
      </form>
      <p className="mt-4 text-sm"><a href="/sign-up" className="underline">Create an account</a> · <a href="/forgot" className="underline">Forgot password?</a></p>
    </div>
  );
}
`;
write("src/app/(auth)/sign-in/page.tsx", signInPage);

const signUpPage = `import React from 'react';

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-semibold mb-6">Create account</h1>
      <form action="/api/auth/credentials/sign-up" method="post" className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input name="name" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input name="password" type="password" required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <select name="role" defaultValue="user" className="w-full border p-2 rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-slate-800 text-white">Create account</button>
      </form>
    </div>
  );
}
`;
write("src/app/(auth)/sign-up/page.tsx", signUpPage);

const forgotPage = `import React from 'react';

export default function ForgotPage() {
  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-semibold mb-6">Reset password</h1>
      <form action="/api/auth/credentials/forgot" method="post" className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" type="email" required className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-slate-800 text-white">Send reset email</button>
      </form>
    </div>
  );
}
`;
write("src/app/(auth)/forgot/page.tsx", forgotPage);

// 6) Credential handlers - simple delegators to Better Auth server API
write(
  "src/app/api/auth/credentials/route.ts",
  `import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname || '';
  const action = pathname.split('/').pop();

  const form = await req.formData();
  const email = form.get('email');
  const password = form.get('password');
  const name = form.get('name');
  const role = form.get('role') || 'user';

  try {
    if (action === 'sign-up') {
      await auth.api.createUser({ body: { email, password, name, role } });
      return NextResponse.redirect('/sign-in');
    }

    if (action === 'sign-in') {
      // This will call Better Auth sign-in; responses may set cookies
      const res = await auth.api.signInWithPassword({ body: { email, password } });
      return NextResponse.json(res);
    }

    if (action === 'forgot') {
      await auth.api.sendPasswordReset({ body: { email } });
      return NextResponse.redirect('/sign-in');
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
`,
);

console.log("\n--- MANUAL NEXT STEPS ---");
console.log("1) Install Better Auth: npm install better-auth");
console.log(
  "2) Add env vars: BETTER_AUTH_URL, DATABASE_URL, provider secrets if used.",
);
console.log(
  "3) Add Prisma field to User model (example below) and run prisma migrate.",
);
console.log("\nPrisma schema snippet:");
console.log(
  `model User {\n  id String @id @default(cuid())\n  email String @unique\n  name String?\n  role String @default("user")\n  createdAt DateTime @default(now())\n}\n`,
);
console.log(
  "4) Wrap your root layout or App with <SessionProvider> from src/lib/client/useSession.tsx to expose session client-side.",
);
console.log(
  "5) Read Better Auth docs for production configuration and options.",
);
console.log(
  "\nDone. Review generated files and adapt to your project patterns.",
);
