import React from "react";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <form
        action="/api/auth/credentials/sign-in"
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
        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-slate-800 px-4 py-2 text-white"
        >
          Sign in
        </button>
      </form>
      <p className="mt-4 text-sm">
        <a href="/sign-up" className="underline">
          Create an account
        </a>{" "}
        ·{" "}
        <a href="/forgot" className="underline">
          Forgot password?
        </a>
      </p>
    </div>
  );
}
