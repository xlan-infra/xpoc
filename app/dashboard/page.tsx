import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clientes from "./clientes/clientes";
import Equipamentos from "./equipamentos/equipamentos";
import Poc from "./poc/poc";

export default function page() {
  return (
    <Tabs defaultValue="equipamentos" className="mt-2">
      <TabsList className="grid grid-cols-3 w-80">
        <TabsTrigger value="poc">Pocs</TabsTrigger>
        <TabsTrigger value="clientes">Clientes</TabsTrigger>
        <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
      </TabsList>

      <TabsContent value="poc">
        <Poc />
      </TabsContent>

      <TabsContent value="clientes">
        <Clientes />
      </TabsContent>

      <TabsContent value="equipamentos">
        <Equipamentos />
      </TabsContent>
    </Tabs>
  );
}
