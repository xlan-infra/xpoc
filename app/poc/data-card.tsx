"use client";

import Ping from "@/components/ping";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Importe o componente de Input
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotepadText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ExcluirPocModal from "./excluir-poc-modal";
import FinalizarPocModal from "./finalizar-poc-modal";
import NovoPocModal from "./novo-poc-modal";

function DataCard({ data }) {
  const [statusFilter, setStatusFilter] = useState("Em Andamento");
  const [searchTerm, setSearchTerm] = useState("");

  function DateFormat(dateString) {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .format(date)
      .replace(".", "")
      .replace(" de", "");
  }

  function calculateDaysSinceStart(dt_inicio) {
    const startDate = new Date(dt_inicio);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  const filteredPocMap = data
    ?.filter((item) => {
      if (statusFilter === "Todos") return true;
      return item.status === statusFilter;
    })
    .filter((item) => {
      if (searchTerm === "") return true;
      return item.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="mt-4">
      <div className="mb-4 w-full flex justify-between sm:space-x-4 max-sm:gap-2">
        <div className="flex justify-start">
          <NovoPocModal />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Label>
              <span className="text-muted-foreground text-sm">Filtrar por status</span>
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
                <SelectItem value="Todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input placeholder="Pesquisar por empresa" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {filteredPocMap?.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-4">
              <CardTitle className={item.status === "Finalizada" && "text-muted-foreground"}>{item.empresa}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Ping color={item.status === "Em Andamento" ? "bg-green-500" : "bg-neutral-400"} />
                {item.status}
                {item.status === "Em Andamento" && (
                  <span className="text-neutral-400 italic text-xs">por {calculateDaysSinceStart(item.dt_inicio)} dia(s)</span>
                )}
                {item.status === "Finalizada" && ` em ${DateFormat(item.dt_fim)}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 grid gap-2">
              <div className="flex items-center justify-between space-x-1">
                <p className="text-sm text-muted-foreground font-medium">Data de Início</p>
                <p className="text-sm">{DateFormat(item.dt_inicio)}</p>
              </div>
              <div className="flex items-center justify-between space-x-1">
                <p className="text-sm text-muted-foreground font-medium">Responsável</p>
                <p className="text-sm">{item.responsavel}</p>
              </div>

              <div className="flex items-center gap-2 justify-between border-t-2 border-neutral-200">
                <Link href={`/poc/${item.id}/${item.empresa.toLowerCase()}`}>
                  <Button variant={"link"} className="text-black p-0">
                    <NotepadText size={14} className="mr-1" /> detalhes
                  </Button>
                </Link>

                <FinalizarPocModal
                  itemDataInicio={item.dt_inicio}
                  itemDataFim={item.dt_fim}
                  itemId={item.id}
                  itemEmpresa={item.empresa}
                  itemResponsavel={item.responsavel}
                  itemLocal={item.local}
                  itemTelefone={item.telefone}
                  itemEmail={item.email}
                  itemStatus={item.status}
                  itemNotas={item.notas}
                />

                <ExcluirPocModal itemId={item.id} itemStatus={item.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DataCard;
