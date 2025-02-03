import { SubmitButton } from "@/components/submit-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/?message=Email ou Senha incorretos");
    }

    return redirect("/home");
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col w-full max-w-md gap-4 m-36">
        <div className="flex justify-center mb-4 text-md uppercase">
          Entre com sua a conta
        </div>
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md px-4 py-2 border"
          name="email"
          placeholder="seu@email.com"
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          className="rounded-md px-4 py-2 border"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-[#5F259F]"
          pendingText="Entrando..."
        >
          Login
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-2 p-2 bg-red-100 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
