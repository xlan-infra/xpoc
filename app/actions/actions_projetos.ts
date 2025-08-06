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
  const { data: inserted, error } = await supabase
    .from("projetos")
    .insert({
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
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao inserir Projeto:", error);
    return null;
  } else {
    revalidatePath("/projetos");
    return inserted.id;
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
    console.error("Erro ao atualizar Projeto:", error);
  } else {
    revalidatePath("/projetos");
  }
}

export async function deleteProjeto(formData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  const { error } = await supabase.from("projetos").delete().eq("id", excluir);

  if (error) {
    console.error("Erro ao deletar Projeto:", error);
  } else {
    revalidatePath("/projetos");
  }
}

export async function getProjetoCount(projetoType?: string) {
  const supabase = createClient();
  let query = supabase
    .from("projetos")
    .select("*", { count: "exact", head: true });

  if (projetoType) {
    query = query.eq("projeto", projetoType);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Erro ao buscar Projetos:", error);
    return 0;
  }

  return count ?? 0;
}

export async function getProjetoStatusCount(projetoType?: string) {
  const supabase = createClient();

  const emAndamentoQuery = supabase
    .from("projetos")
    .select("*", { count: "exact", head: true })
    .eq("status", "Em Andamento");

  const finalizadasQuery = supabase
    .from("projetos")
    .select("*", { count: "exact", head: true })
    .eq("status", "Finalizada");

  if (projetoType) {
    emAndamentoQuery.eq("projeto", projetoType);
    finalizadasQuery.eq("projeto", projetoType);
  }

  const [emAndamento, finalizadas] = await Promise.all([
    emAndamentoQuery,
    finalizadasQuery,
  ]);

  if (emAndamento.error) {
    console.error("Erro ao buscar Projetos:", emAndamento.error);
  }
  if (finalizadas.error) {
    console.error("Erro ao buscar Projetos:", finalizadas.error);
  }

  return {
    emAndamento: emAndamento.count ?? 0,
    finalizadas: finalizadas.count ?? 0,
  };
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
