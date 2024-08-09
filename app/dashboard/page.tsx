import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Equipamentos from "./equipamentos/equipamentos";
import Poc from "./poc/poc";

export default function page() {
  return (
    <Tabs defaultValue="poc" className="mt-2">
      <TabsList className="grid grid-cols-2 w-80">
        <TabsTrigger value="poc">Pocs</TabsTrigger>
        <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
      </TabsList>

      <TabsContent value="poc">
        <Poc />
      </TabsContent>

      <TabsContent value="equipamentos">
        <Equipamentos />
      </TabsContent>
    </Tabs>
  );
}
