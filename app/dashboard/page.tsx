import DashboardCards from "@/components/dashboard-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEquipamentos } from "../actions/actions_equipamentos";
import { getPoc } from "../actions/actions_poc";
import { DataTable } from "./equipamentos/equipamentos";
import Poc from "./poc/poc";

export default async function page() {
  const equipamentos = await getEquipamentos();
  const poc = await getPoc();

  return (
    <main className="p-2">
      <DashboardCards />

      <Tabs defaultValue="equipamentos" className="mt-6">
        <TabsList className="grid grid-cols-2 w-80">
          <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
          <TabsTrigger value="poc">Pocs</TabsTrigger>
        </TabsList>

        <TabsContent value="equipamentos">
          <DataTable data={equipamentos} pocMap={poc} />
        </TabsContent>

        <TabsContent value="poc">
          <Poc />
        </TabsContent>
      </Tabs>
    </main>
  );
}
