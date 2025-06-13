"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { DataTable } from "./data-table";

interface EquipmentTabsProps {
  equipamentosPoc: any[];
  equipamentosLocacao: any[];
  pocMap: any[];
  urlMap: any[];
}

export default function EquipmentTabs({
  equipamentosPoc,
  equipamentosLocacao,
  pocMap,
  urlMap,
}: EquipmentTabsProps) {
  const [status, setStatus] = useState("Todos");

  return (
    <Tabs defaultValue="poc" className="mt-4 w-full">
      <div className="flex items-center gap-4">
        <TabsList className="w-fit">
          <TabsTrigger value="poc">POC</TabsTrigger>
          <TabsTrigger value="locacao">Locação</TabsTrigger>
        </TabsList>

        <TabsList className="w-fit">
          <TabsTrigger value="Todos" onClick={() => setStatus("Todos")}>Todos</TabsTrigger>
          <TabsTrigger value="Estoque" onClick={() => setStatus("Estoque")}>Estoque</TabsTrigger>
          <TabsTrigger value="Em Uso" onClick={() => setStatus("Em Uso")}>Em Uso</TabsTrigger>
          <TabsTrigger value="RMA" onClick={() => setStatus("RMA")}>RMA</TabsTrigger>
          <TabsTrigger value="Vendido" onClick={() => setStatus("Vendido")}>Vendido</TabsTrigger>
          <TabsTrigger value="Arquivado" onClick={() => setStatus("Arquivado")}>Arquivado</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="poc">
        <DataTable
          urlMap={urlMap}
          data={equipamentosPoc}
          pocMap={pocMap}
          statusFilter={status}
        />
      </TabsContent>

      <TabsContent value="locacao">
        <DataTable
          urlMap={urlMap}
          data={equipamentosLocacao}
          pocMap={pocMap}
          statusFilter={status}
        />
      </TabsContent>
    </Tabs>
  );
}

