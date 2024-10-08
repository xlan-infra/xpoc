"use server";

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

export async function getPoc() {
  const supabase = createClient();
  const {data} = await supabase
    .from("poc")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, categoria, dt_inicio, dt_fim, status `
    )
    .order("dt_inicio", {ascending: true});

  return data;
}

export async function addPoc(data) {
  const {
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    categoria,
    dt_inicio,
    dt_fim,
    status,
  } = data;

  const supabase = createClient();
  const {error} = await supabase.from("poc").insert({
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    categoria,
    dt_inicio,
    dt_fim,
    status,
  });

  if (error) {
    console.error("Erro ao inserir POC:", error);
  } else {
    revalidatePath("/poc");
  }
}

export async function updatePoc(data) {
  const {
    id,
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    categoria,
    dt_inicio,
    dt_fim,
    status,
  } = data;

  const supabase = createClient();
  const {error} = await supabase
    .from("poc")
    .update({
      empresa,
      responsavel,
      cidade,
      estado,
      telefone,
      email,
      notas,
      categoria,
      dt_inicio,
      dt_fim,
      status,
    })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar POC:", error);
  } else {
    revalidatePath("/poc");
  }
}

export async function deletePoc(formData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  const {error} = await supabase.from("poc").delete().eq("id", excluir);

  if (error) {
    console.error("Erro ao deletar POC:", error);
  } else {
    revalidatePath("/poc");
  }
}

export async function getPocCount() {
  const supabase = createClient();
  const {count, error} = await supabase.from("poc").select("*", {count: "exact"});

  if (error) {
    console.error("Erro ao buscar POCs:", error);
    return null;
  }

  return count;
}

export async function getPocByStatus() {
  const supabase = createClient();
  const {data} = await supabase
    .from("poc")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, categoria, dt_inicio, dt_fim, status `
    )
    .eq("status", "Em Andamento")
    .order("status", {ascending: true});

  return data;
}

export async function getPocById(id) {
  const supabase = createClient();
  const {data} = await supabase
    .from("poc")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, categoria, dt_inicio, dt_fim, status`
    )
    .eq("id", id);

  return data;
}
