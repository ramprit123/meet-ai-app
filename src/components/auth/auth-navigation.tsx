import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const authRoutes = [
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
  { href: "/forgot", label: "Forgot Password" },
];

export function AuthNavigation() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex justify-center space-x-1">
      {authRoutes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "rounded-md px-3 py-1 text-sm transition-colors",
            pathname === route.href
              ? "bg-blue-100 font-medium text-blue-700"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
