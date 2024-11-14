import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AuthButton from "./auth-button";
import Logo from "./logo";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-[#5F259F] print:hidden py-4">
      <nav className="flex max-w-screen-lg mx-auto items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          {user && (
            <>
              <Link
                href="/home"
                className="text-white hover:underline underline-offset-4 text-sm"
              >
                Home
              </Link>
              <Link
                href="/equipamentos"
                className="text-white hover:underline underline-offset-4 text-sm"
              >
                Equipamentos
              </Link>
            </>
          )}
        </div>
        <AuthButton />
      </nav>
    </header>
  );
}
