import Ping from "@/components/ping";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getPoc } from "../actions/actions_poc";
import ExcluirPocModal from "./excluir-poc-modal";
import FinalizarPocModal from "./finalizar-poc-modal";

async function DataCard() {
  const pocMap = await getPoc();

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
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
      {pocMap?.map((item) => (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className={item.status === "Finalizada" && "text-muted-foreground"}>{item.empresa}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Ping color={item.status === "Em Andamento" ? "bg-green-500" : "bg-neutral-400"} />
              {item.status}
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
                  <Plus size={14} className="mr-1" /> detalhes
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

              <ExcluirPocModal itemId={item.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DataCard;
