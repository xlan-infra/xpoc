"use client";

import Ping from "@/components/ping";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {NotepadText} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import ExcluirPocModal from "./modal/excluir-projeto-modal";
import FinalizarPocModal from "./modal/finalizar-projeto-modal";
import NovoProjetoModal from "./modal/novo-projeto-modal";
import Utils from "./utils";

function DataCard({data}) {
  const [statusFilter, setStatusFilter] = useState("Em Andamento");
  const [categoria, setCategoria] = useState("poc");
  const [searchTerm, setSearchTerm] = useState("");

  const {DateFormat, calculateDaysSinceStart} = Utils();

  const filteredPocMap = data
    ?.filter((item) => {
      if (statusFilter === "Todos") return true;
      return item.status === statusFilter;
    })
    .filter((item) => {
      if (categoria === "Todos") return true;
      if (categoria === "poc") return item.categoria === "poc";
      if (categoria === "locação") return item.categoria === "locação";
    })
    .filter((item) => {
      if (searchTerm === "") return true;
      return item.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="mt-4">
      <div className="mb-4 w-full flex justify-between sm:space-x-4 max-sm:gap-2">
        <div className="flex justify-start">
          <NovoProjetoModal />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poc">Poc</SelectItem>
                <SelectItem value="locação">Locação</SelectItem>
                <SelectItem value="Todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                <SelectItem value="Finalizada">Finalizada</SelectItem>
                <SelectItem value="Todos">Todos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              placeholder="Pesquisar por empresa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredPocMap?.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-lg transition-shadow duration-500 hover:shadow-violet-100"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between">
                <CardTitle className={item.status === "Finalizada" && "text-muted-foreground"}>
                  {item.empresa}
                </CardTitle>
                <Badge
                  className={
                    item.categoria === "poc"
                      ? "bg-green-400 hover:bg-green-600 capitalize"
                      : "bg-orange-400 hover:bg-orange-600 capitalize"
                  }
                >
                  {item.categoria}
                </Badge>
              </div>

              <CardDescription className="flex items-center gap-1">
                <Ping color={item.status === "Em Andamento" ? "bg-green-500" : "bg-neutral-400"} />
                {item.status}
                {item.status === "Em Andamento" && (
                  <span className="text-neutral-400 italic text-xs">
                    por {calculateDaysSinceStart(item.dt_inicio)} dia(s)
                  </span>
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
                <Link href={`/projetos/${item.id}/${item.empresa.toLowerCase()}`}>
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
                  itemCidade={item.cidade}
                  itemEstado={item.estado}
                  itemTelefone={item.telefone}
                  itemEmail={item.email}
                  itemStatus={item.status}
                  itemNotas={item.notas}
                  itemCategoria={item.categoria}
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
