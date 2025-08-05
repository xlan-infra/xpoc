import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";
import NavLink from "./nav-link";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-[#5F259F] print:hidden py-4">
      <nav className="flex w-6xl mx-auto items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          {user && (
            <div className="flex gap-4">
              <NavLink href="/home">Home</NavLink>
              <NavLink href="/equipamentos">Equipamentos</NavLink>
            </div>
          )}
        </div>
        <AuthButton />
      </nav>
    </header>
  );
}
