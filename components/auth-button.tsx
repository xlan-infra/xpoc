import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {Button} from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-white font-bold max-sm:hidden"> {user && user.email}</span>
      <form action={signOut}>
        {user && (
          <Button className="text-red-200 h-0" variant={"link"}>
            Sair
          </Button>
        )}
      </form>
    </div>
  );
}
