"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getEquipamentos() {
  const supabase = createClient();
  const { data } = await supabase
    .from("equipamentos")
    .select("id, model, serial_number, mac, hardware_version, type, status, poc_id (id, empresa, responsavel)")
    .order("created_at", { ascending: true });

  return data;
}

export async function addEquipamentos(data) {
  const { model, serialNumber, mac, hardwareVersion, type, status, poc_id } = data;

  const supabase = createClient();
  const { error } = await supabase
    .from("equipamentos")
    .insert({ model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status, poc_id });

  if (error) {
    console.error("Erro ao inserir equipamento:", error);
  } else {
    revalidatePath("/dashboard");
  }
}

export async function deleteEquipamentos(formData: FormData) {
  const excluir = formData.get("excluir");

  const supabase = createClient();
  await supabase.from("equipamentos").delete().eq("id", excluir);
  revalidatePath("/dashboard");
}

export async function updateEquipamentos(data) {
  const { id, model, serialNumber, mac, hardwareVersion, type, status, poc_id } = data;

  const supabase = createClient();
  await supabase
    .from("equipamentos")
    .update({ id, model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status, poc_id })
    .eq("id", id);

  revalidatePath("/dashboard");
}
