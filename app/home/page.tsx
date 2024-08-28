import DashboardCards from "@/components/dashboard-cards";
import { getEquipamentos, getUrlEquipamentos } from "../actions/actions_equipamentos";
import { getPocByStatus } from "../actions/actions_poc";
import { DataTable } from "./data-table";

export default async function page() {
  const equipamentos = await getEquipamentos();
  const poc = await getPocByStatus();
  const urlMap = await getUrlEquipamentos();

  return (
    <main className="px-2 pb-2 pt-0">
      <DashboardCards />
      <DataTable urlMap={urlMap} data={equipamentos} pocMap={poc} />
    </main>
  );
}
