import { Wifi } from "lucide-react";
import {
  getEquipamentos,
  getUrlEquipamentos,
} from "../actions/actions_equipamentos";
import { getProjetoByStatus } from "../actions/actions_projetos";
import EquipmentTabs from "./equipment-tabs";

export default async function page() {
  const equipamentos = await getEquipamentos();
  const poc = await getProjetoByStatus();
  const urlMap = await getUrlEquipamentos();

  const equipamentosPoc = equipamentos.filter(
    (item) => item.projeto_id?.projeto === "poc"
  );
  const equipamentosLocacao = equipamentos.filter(
    (item) => item.projeto_id?.projeto === "locação"
  );

  return (
    <main className="px-2 pb-2 pt-4">
      {/* <DashboardCards /> */}
      <h1 className="border-b pb-2 text-xl font-bold tracking-tight flex items-center gap-1">
        <Wifi className="text-primary" /> Equipamentos
      </h1>

      <EquipmentTabs
        equipamentosPoc={equipamentosPoc}
        equipamentosLocacao={equipamentosLocacao}
        pocMap={poc}
        urlMap={urlMap}
      />
    </main>
  );
}
