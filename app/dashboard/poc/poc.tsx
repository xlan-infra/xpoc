import { getPoc } from "@/app/actions/actions_poc";
import Ping from "@/components/ping";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditarPocModal from "./editar-poc-modal";
import ExcluirPocModal from "./excluir-poc-modal";
import NovoPocModal from "./novo-poc-modal";
import VerEquipamentosPocModal from "./ver-equipamentos-poc-modal";

async function Poc() {
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
    <main className="mt-6 p-2">
      <NovoPocModal />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {pocMap?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className={item.status === "Finalizada" && "text-muted-foreground"}>{item.empresa}</CardTitle>
                  <span className="flex items-center gap-2">
                    <Ping color={item.status === "Em Andamento" ? "bg-green-500" : "bg-neutral-400"} />
                    <CardDescription>
                      {item.status} {item.status === "Finalizada" && `em ${DateFormat(item.dt_fim)}`}
                    </CardDescription>
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-y-1">
                <div className="text-muted-foreground">Data de Início</div>
                <div>{DateFormat(item.dt_inicio)}</div>
                <div className="text-muted-foreground">Responsável</div>
                <div>{item.responsavel}</div>
                <div className="text-muted-foreground">Local</div>
                <div>{item.local}</div>
                <div className="text-muted-foreground">Telefone</div>
                <div>{item.telefone}</div>
                <div className="text-muted-foreground">Email</div>
                <div>{item.email ? item.email : "-"}</div>
              </div>
            </CardContent>

            <div className="flex items-center gap-2 px-6 pb-4">
              <VerEquipamentosPocModal itemId={item.id} />

              <EditarPocModal
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
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Poc;
