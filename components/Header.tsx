import { Computer } from "lucide-react";
import Link from "next/link";
import AuthButton from "./auth-button";

function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-background">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Computer className="w-6 h-6 text-primary" />
        <span className="text-lg font-semibold">XPOC</span>
      </Link>
      <AuthButton />
    </header>
  );
}

export default Header;
