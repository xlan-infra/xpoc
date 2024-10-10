import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";

function Header() {
  return (
    <header className=" bg-violet-100 items-center py-3 print:hidden">
      <nav className="flex max-w-screen-lg mx-auto items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <Link href="/home" className="font-medium text-black hover:text-primary">
            Home
          </Link>
          <Link href="/projetos" className="font-medium text-black hover:text-primary">
            Projetos
          </Link>
        </div>

        <AuthButton />
      </nav>
    </header>
  );
}

export default Header;
