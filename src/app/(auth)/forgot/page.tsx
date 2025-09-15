import React from "react";

export default function ForgotPage() {
  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="mb-6 text-2xl font-semibold">Reset password</h1>
      <form
        action="/api/auth/credentials/forgot"
        method="post"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-slate-800 px-4 py-2 text-white"
        >
          Send reset email
        </button>
      </form>
    </div>
  );
}
