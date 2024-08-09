"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getEquipamentos() {
  const supabase = createClient();
  const { data } = await supabase.from("equipamentos").select(`id, model, serial_number, mac, hardware_version, type, status `);

  return data;
}

export async function addEquipamentos(data) {
  const { model, serialNumber, mac, hardwareVersion, type, status } = data;

  const supabase = createClient();
  const { error } = await supabase
    .from("equipamentos")
    .insert({ model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status });

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
  const { id, model, serialNumber, mac, hardwareVersion, type, status } = data;

  const supabase = createClient();
  await supabase
    .from("equipamentos")
    .update({ id, model, serial_number: serialNumber, mac, hardware_version: hardwareVersion, type, status })
    .eq("id", id);
  revalidatePath("/dashboard");
}
