import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";

function Header() {
  return (
    <header className="flex items-center justify-between h-20 md:px-2 bg-background ">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <Link href="/equipamentos" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Equipamentos
        </Link>
        <Link href="/poc" className="text-sm font-medium text-muted-foreground hover:text-primary">
          POCs
        </Link>
      </div>

      <AuthButton />
    </header>
  );
}

export default Header;
