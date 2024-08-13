import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";

function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b border-neutral-100">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Logo />
      </Link>
      <AuthButton />
    </header>
  );
}

export default Header;
