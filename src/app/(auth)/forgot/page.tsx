import React from 'react';

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
