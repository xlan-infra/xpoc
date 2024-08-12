import { getPoc } from "@/app/actions/actions_poc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EditarPocModal from "./editar-poc-modal";
import ExcluirEquipamentoModal from "./excluir-poc-modal";
import NovoPocModal from "./novo-poc-modal";

async function Poc() {
  const pocMap = await getPoc();

  return (
    <main className="mt-6">
      <NovoPocModal />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pocMap?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-bold">{item.empresa}</TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell>{item.local}</TableCell>
                <TableCell>{item.telefone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="gap-2 flex">
                  <EditarPocModal
                    itemId={item.id}
                    itemEmpresa={item.empresa}
                    itemResponsavel={item.responsavel}
                    itemLocal={item.local}
                    itemTelefone={item.telefone}
                    itemEmail={item.email}
                    itemStatus={item.status}
                  />

                  <ExcluirEquipamentoModal itemId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        {pocMap?.map((item) => (
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{item.empresa}</CardTitle>
                  <CardDescription>{item.status}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <EditarPocModal
                    itemId={item.id}
                    itemEmpresa={item.empresa}
                    itemResponsavel={item.responsavel}
                    itemLocal={item.local}
                    itemTelefone={item.telefone}
                    itemEmail={item.email}
                    itemStatus={item.status}
                  />

                  <ExcluirEquipamentoModal itemId={item.id} />
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
          </Card>
        ))}
      </div>
    </main>
  );
}

export default Poc;
