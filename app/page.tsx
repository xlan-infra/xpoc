import Logo from "@/components/logo";
import {SubmitButton} from "@/components/submit-button";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default function Page({searchParams}: {searchParams: {message: string}}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Email ou Senha incorreto");
    }

    return redirect("/home");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <div className="w-full flex justify-center mb-6">
          <Logo />
        </div>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <SubmitButton
          formAction={signIn}
          className="mb-2 bg-violet-500 hover:bg-violet-700"
          pendingText="Entrando..."
        >
          Login
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-50 text-foreground text-center">{searchParams.message}</p>
        )}
      </form>
    </div>
  );
}
