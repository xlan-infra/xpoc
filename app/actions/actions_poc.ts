"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPoc() {
  const supabase = createClient();
  const { data } = await supabase
    .from("poc")
    .select(`id, empresa, responsavel, local, telefone, email, notas, status `)
    .order("created_at", { ascending: true });

  return data;
}

export async function addPoc(data) {
  const { empresa, responsavel, local, telefone, email, notas, status } = data;

  const supabase = createClient();
  const { error } = await supabase.from("poc").insert({
    empresa,
    responsavel,
    local,
    telefone,
    email,
    notas,
    status,
  });

  if (error) {
    console.error("Erro ao inserir POC:", error);
  } else {
    revalidatePath("/dashboard");
  }
}

export async function updatePoc(data) {
  const { id, empresa, responsavel, local, telefone, email, notas, status } = data;

  const supabase = createClient();
  await supabase
    .from("poc")
    .update({
      empresa,
      responsavel,
      local,
      telefone,
      email,
      notas,
      status,
    })
    .eq("id", id);

  revalidatePath("/dashboard");
}

export async function deletePoc(formData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  await supabase.from("poc").delete().eq("id", excluir);

  revalidatePath("/dashboard");
}
