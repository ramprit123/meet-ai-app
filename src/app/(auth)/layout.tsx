import React, { type PropsWithChildren } from "react";
import { Bot } from "lucide-react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile header - visible only on small screens */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white lg:hidden">
        <div className="flex items-center justify-center space-x-3">
          <Bot className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Meet AI</h1>
        </div>
        <p className="mt-2 text-sm text-white/80">Your intelligent companion</p>
      </div>

      {/* Left side - 40% on desktop */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 lg:flex lg:w-2/5">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="mb-8">
            <Bot className="h-24 w-24 text-white/90" />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold">Meet AI</h1>
          <p className="max-w-md text-center text-xl text-white/80">
            Your intelligent companion for seamless authentication and beyond
          </p>
          <div className="mt-12 space-y-4 text-center">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/70">Secure Authentication</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/70">AI-Powered Experience</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-white/70">Modern Interface</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-white/10 blur-xl" />
        <div className="absolute right-20 bottom-20 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Right side - 60% on desktop, full width on mobile */}
      <div className="flex min-h-[calc(100vh-120px)] flex-1 items-center justify-center bg-gray-50 p-4 sm:p-8 lg:min-h-screen lg:w-3/5">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
