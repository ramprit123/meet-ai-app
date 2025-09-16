import React from 'react';

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
