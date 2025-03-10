"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`text-sm rounded-md px-2 py-1 ${
        isActive ? "text-violet-900 font-bold bg-violet-100 " : "text-white"
      }`}
    >
      {children}
    </Link>
  );
}
