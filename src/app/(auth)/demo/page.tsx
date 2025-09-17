"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, LogIn, Key } from "lucide-react";

export default function AuthDemoPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Authentication System</h1>
        <p className="text-gray-600">
          Complete responsive auth system with 40/60 layout, shadcn/ui
          components, and Zod validation
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <LogIn className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Login form with email/password, remember me, and social auth
                  options
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in">
              <Button className="w-full">
                View Sign In Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-green-100 p-2">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Registration form with name, email, password confirmation, and
                  role selection
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/sign-up">
              <Button className="w-full">
                View Sign Up Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-orange-100 p-2">
                <Key className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                  Password reset form with email verification and success state
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/forgot">
              <Button className="w-full">
                View Forgot Password Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-6">
        <h3 className="mb-3 font-semibold">Features Included:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✅ Responsive 40/60 layout with AI branding</li>
          <li>✅ shadcn/ui components with proper styling</li>
          <li>✅ Zod validation with react-hook-form</li>
          <li>✅ Password visibility toggles</li>
          <li>✅ Confirm password validation</li>
          <li>✅ Role selection dropdown</li>
          <li>✅ Social authentication UI</li>
          <li>✅ Loading states and success feedback</li>
          <li>✅ Proper form error handling</li>
          <li>✅ Mobile-responsive design</li>
        </ul>
      </div>
    </div>
  );
}
