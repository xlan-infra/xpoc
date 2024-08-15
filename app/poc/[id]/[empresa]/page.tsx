import { getEquipamentosByPoc } from "@/app/actions/actions_equipamentos";
import { getPocById } from "@/app/actions/actions_poc";
import Ping from "@/components/ping";
import PrintButton from "@/components/print-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditarPocModal from "../../editar-poc-modal";
import ExcluirPocModal from "../../excluir-poc-modal";

async function page({ params }) {
  const id = params.id;

  const pocId = await getPocById(id);
  const equipamentosByPocMap = await getEquipamentosByPoc(id);

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
    <>
      <div className="mb-4 print:hidden">
        <Link href="/poc">
          <Button variant="link">
            <ArrowLeft size={14} className="mr-1" />
            Voltar
          </Button>
        </Link>
      </div>

      {pocId?.map((item) => (
        <Card className="print:mt-6" key={item.id}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-4xl ${item.status === "Finalizada" && "text-muted-foreground"}`}>{item.empresa}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Status</p>
              <div className="text-lg flex items-center gap-1">
                <Ping color={item.status === "Em Andamento" ? "bg-green-500" : "bg-neutral-400"} />
                {item.status}
                {item.status === "Finalizada" && ` em ${DateFormat(item.dt_fim)}`}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Data de Início</p>
              <p className="text-lg">{DateFormat(item.dt_inicio)}</p>
            </div>

            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Responsável</p>
              <p className="text-lg">{item.responsavel}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Data de Conclusão</p>
              <p className="text-lg">{item.dt_fim ? DateFormat(item.dt_fim) : "n/a"}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Telefone</p>
              <p className="text-lg">{item.telefone}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Email</p>
              <p className="text-lg">{item.email ? item.email : "n/a"}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Observações</p>
              <p className="text-lg">{item.notas ? item.notas : "n/a"}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Local</p>
              <p className="text-lg">{item.local ? item.local : "n/a"}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 justify-between print:hidden">
              <PrintButton />

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
          </CardFooter>
        </Card>
      ))}
      {equipamentosByPocMap?.length > 0 ? (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Modelo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Versão de Hw</TableHead>
              <TableHead>SN</TableHead>
              <TableHead>Mac</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentosByPocMap.map((item) => (
              <TableRow key={item.id} className="whitespace-nowrap">
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.hardware_version}</TableCell>
                <TableCell>{item.serial_number}</TableCell>
                <TableCell>{item.mac}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="mt-6">Nenhum equipamento encontrado.</p>
      )}
    </>
  );
}

export default page;
