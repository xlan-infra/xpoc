import { getPoc } from "@/app/actions/actions_poc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditarPocModal from "./editar-poc-modal";
import ExcluirPocModal from "./excluir-poc-modal";
import NovoPocModal from "./novo-poc-modal";
import VerEquipamentosPocModal from "./ver-equipamentos-poc-modal";

async function Poc() {
  const pocMap = await getPoc();

  return (
    <main className="mt-6">
      <NovoPocModal />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {pocMap?.map((item) => (
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{item.empresa}</CardTitle>
                  <CardDescription>{item.status}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <div className="text-muted-foreground">Responsável:</div>
                  <div>{item.responsavel}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <div className="text-muted-foreground">Local:</div>
                  <div>{item.local}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <div className="text-muted-foreground">Telefone:</div>
                  <div>{item.telefone}</div>
                </div>
                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <div className="text-muted-foreground">Email:</div>
                  <div>{item.email}</div>
                </div>
              </div>
            </CardContent>
            <div className="flex items-center gap-2 px-6">
              <VerEquipamentosPocModal itemId={item.id} />

              <EditarPocModal
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
