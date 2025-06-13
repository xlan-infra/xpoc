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

        {/* Separate Tabs component to control status without changing project tab */}
        <Tabs value={status} onValueChange={setStatus} className="w-fit">
          <TabsList>
            <TabsTrigger value="Todos">Todos</TabsTrigger>
            <TabsTrigger value="Estoque">Estoque</TabsTrigger>
            <TabsTrigger value="Em Uso">Em Uso</TabsTrigger>
            <TabsTrigger value="RMA">RMA</TabsTrigger>
            <TabsTrigger value="Vendido">Vendido</TabsTrigger>
            <TabsTrigger value="Arquivado">Arquivado</TabsTrigger>
          </TabsList>
        </Tabs>
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

