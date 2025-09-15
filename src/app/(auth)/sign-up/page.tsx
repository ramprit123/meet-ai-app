import React from "react";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md py-20">
      <h1 className="mb-6 text-2xl font-semibold">Create account</h1>
      <form
        action="/api/auth/credentials/sign-up"
        method="post"
        className="space-y-4"
      >
        <div>
          <label className="block text-sm">Name</label>
          <input name="name" required className="w-full rounded border p-2" />
        </div>
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
        <div>
          <label className="block text-sm">Role</label>
          <select
            name="role"
            defaultValue="user"
            className="w-full rounded border p-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded bg-slate-800 px-4 py-2 text-white"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
