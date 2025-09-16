import React from 'react';

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
