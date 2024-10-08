import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";

function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-2 md:px-2 bg-background print:hidden">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <Link href="/home" className="font-medium text-muted-foreground hover:text-primary">
          Home
        </Link>
        <Link href="/projetos" className="font-medium text-muted-foreground hover:text-primary">
          Projetos
        </Link>
      </div>

      <AuthButton />
    </header>
  );
}

export default Header;
