"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProjeto() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projetos")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, projeto, dt_inicio, dt_fim, status `
    )
    .order("dt_inicio", { ascending: true });

  return data;
}

export async function addProjeto(data) {
  const {
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    projeto,
    dt_inicio,
    dt_fim,
    status,
  } = data;

  const supabase = createClient();
  const { error } = await supabase.from("projetos").insert({
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    projeto,
    dt_inicio,
    dt_fim,
    status,
  });

  if (error) {
    console.error("Erro ao inserir POC:", error);
  } else {
    revalidatePath("/projetos");
  }
}

export async function updateProjeto(data) {
  const {
    id,
    empresa,
    responsavel,
    cidade,
    estado,
    telefone,
    email,
    notas,
    projeto,
    dt_inicio,
    dt_fim,
    status,
  } = data;

  const supabase = createClient();
  const { error } = await supabase
    .from("projetos")
    .update({
      empresa,
      responsavel,
      cidade,
      estado,
      telefone,
      email,
      notas,
      projeto,
      dt_inicio,
      dt_fim,
      status,
    })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar POC:", error);
  } else {
    revalidatePath("/projetos");
  }
}

export async function deleteProjeto(formData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  const { error } = await supabase.from("projetos").delete().eq("id", excluir);

  if (error) {
    console.error("Erro ao deletar POC:", error);
  } else {
    revalidatePath("/projetos");
  }
}

export async function getProjetoCount() {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("projetos")
    .select("*", { count: "exact" });

  if (error) {
    console.error("Erro ao buscar POCs:", error);
    return null;
  }

  return count;
}

export async function getProjetoByStatus() {
  const supabase = createClient();
  const { data } = await supabase
    .from("projetos")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, projeto, dt_inicio, dt_fim, status `
    )
    .eq("status", "Em Andamento")
    .order("status", { ascending: true });

  return data;
}

export async function getProjetoById(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("projetos")
    .select(
      `id, empresa, responsavel, cidade, estado, telefone, email, notas, projeto, dt_inicio, dt_fim, status`
    )
    .eq("id", id);

  return data;
}
