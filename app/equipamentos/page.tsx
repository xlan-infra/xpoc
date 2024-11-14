import { Wifi } from "lucide-react";
import {
  getEquipamentos,
  getUrlEquipamentos,
} from "../actions/actions_equipamentos";
import { getProjetoByStatus } from "../actions/actions_projetos";
import { DataTable } from "./data-table";

export default async function page() {
  const equipamentos = await getEquipamentos();
  const poc = await getProjetoByStatus();
  const urlMap = await getUrlEquipamentos();

  return (
    <main className="px-2 pb-2 pt-4">
      {/* <DashboardCards /> */}
      <h1 className="border-b pb-2 text-xl font-bold tracking-tight flex items-center gap-1">
        <Wifi className="text-primary" /> Equipamentos
      </h1>
      <DataTable urlMap={urlMap} data={equipamentos} pocMap={poc} />
    </main>
  );
}
