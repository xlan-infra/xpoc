"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getEquipamentos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("equipamentos")
    .select("id, model, serial_number, mac, hardware_version, type, status, pagina, notas, poc_id (id, empresa, responsavel)")
    .order("created_at", { ascending: true });

  return data;
}

export async function addEquipamentos(data) {
  const { model, serialNumber, mac, hardwareVersion, type, status, pagina, notas, poc_id } = data;

  const supabase = createClient();
  const { error } = await supabase
    .from("equipamentos")
    .insert({ model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status, pagina, notas, poc_id });

  if (error) {
    console.error("Erro ao inserir equipamento:", error);
  } else {
    revalidatePath("/equipamentos");
  }
}

export async function deleteEquipamentos(formData: FormData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  await supabase.from("equipamentos").delete().eq("id", excluir);
  revalidatePath("/equipamentos");
}

export async function updateEquipamentos(data) {
  const { id, model, serialNumber, mac, hardwareVersion, type, status, pagina, notas, poc_id } = data;

  const supabase = createClient();
  await supabase
    .from("equipamentos")
    .update({ id, model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status, pagina, notas, poc_id })
    .eq("id", id);

  revalidatePath("/equipamentos");
}

export async function getEquipamentosByPoc(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("equipamentos")
    .select("id, model, serial_number, mac, hardware_version, type, status, pagina, notas, poc_id (id, empresa, responsavel)")
    .eq("poc_id", id)
    .order("created_at", { ascending: true });

  return data;
}

export async function getEquipamentosByPocHistory(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("equipamentos_history")
    .select("id, model, serial_number, mac, hardware_version, type, status, pagina, notas, poc_id (id, empresa, responsavel)")
    .eq("poc_id", id)
    .order("created_at", { ascending: true });

  return data;
}

export async function getEquipamentosCadastrados() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_equipamentos_count");

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export async function getEquipamentosStatus() {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_equipamentos_status_count");

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
