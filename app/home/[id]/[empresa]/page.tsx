import {
  getEquipamentosByProjeto,
  getEquipamentosByProjetoHistory,
} from "@/app/actions/actions_equipamentos";
import { getProjetoById } from "@/app/actions/actions_projetos";
import Ping from "@/components/ping";
import PrintButton from "@/components/print-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownToLine, ArrowLeft, History } from "lucide-react";
import Link from "next/link";
import EditarProjetoModal from "../../modal/editar-projeto-modal";

async function page({ params }) {
  const id = params.id;

  const projetoId = await getProjetoById(id);
  const equipamentosByProjetoMap = await getEquipamentosByProjeto(id);
  const equipamentosByProjetoHistoryMap = await getEquipamentosByProjetoHistory(
    id
  );

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

  return (
    <>
      <div className="my-4 print:hidden">
        <Link href="/home">
          <Button className="p-0" variant="link">
            <ArrowLeft size={14} className="mr-1" />
            Voltar
          </Button>
        </Link>
      </div>

      {projetoId?.map((item) => (
        <Card
          className="print:mt-6 bg-gradient-to-bl from-violet-50/50 from-5%"
          key={item.id}
        >
          <CardHeader className="pb-4">
            <CardTitle
              className={`text-3xl ${
                item.status === "Finalizada" && "text-muted-foreground"
              }`}
            >
              {item.empresa}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Status
              </p>
              <div className="text-lg flex items-center gap-1">
                <Ping
                  color={
                    item.status === "Em Andamento"
                      ? "bg-green-500"
                      : "bg-neutral-400"
                  }
                />
                {item.status}
                {item.status === "Em Andamento" && (
                  <span className="text-neutral-400 italic text-xs">
                    por {calculateDaysSinceStart(item.dt_inicio)} dia(s)
                  </span>
                )}
                {item.status === "Finalizada" &&
                  ` em ${DateFormat(item.dt_fim)}`}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Data de Início
              </p>
              <p className="text-lg">{DateFormat(item.dt_inicio)}</p>
            </div>

            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Responsável
              </p>
              <p className="text-lg">{item.responsavel}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Data de Conclusão
              </p>
              <p className="text-lg">
                {item.dt_fim ? DateFormat(item.dt_fim) : "n/a"}
              </p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Telefone
              </p>
              <p className="text-lg">{item.telefone}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Email</p>
              <p className="text-lg">{item.email ? item.email : "n/a"}</p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Projeto
              </p>
              <span className="text-lg">
                {item.projeto ? (
                  <Badge
                    variant={"outline"}
                    className={
                      item.projeto === "poc"
                        ? "bg-blue-400 border-none capitalize text-white hover:bg-blue-600"
                        : "bg-orange-400 border-none capitalize text-white hover:bg-orange-600"
                    }
                  >
                    {item.projeto}
                  </Badge>
                ) : (
                  "n/a"
                )}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">Local</p>
              <p className="text-lg">
                {item.cidade ? `${item.cidade}, ${item.estado}` : "n/a"}
              </p>
            </div>
            <div className="flex items-center justify-between space-x-1 border-b border-neutral-100">
              <p className="text-lg text-muted-foreground font-medium">
                Observações
              </p>
              <p className="text-lg">{item.notas ? item.notas : "n/a"}</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 justify-between print:hidden">
              <PrintButton />
              <EditarProjetoModal
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
                itemProjeto={item.projeto}
              />
            </div>
          </CardFooter>
        </Card>
      ))}

      <Tabs defaultValue="atual" className=" mt-4">
        <TabsList>
          <TabsTrigger value="atual">
            <ArrowDownToLine className="pr-1" size={20} /> Equipamentos em Uso
            no Cliente
          </TabsTrigger>
          <TabsTrigger value="historico">
            <History className="pr-1" size={20} /> Histórico de Equipamentos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="atual">
          {equipamentosByProjetoMap?.length > 0 ? (
            <Table className="my-4">
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
                {equipamentosByProjetoMap.map((item) => (
                  <TableRow key={item.id} className="whitespace-nowrap">
                    <TableCell className="py-2">
                      <span className="flex items-center gap-1 px-1">
                        <Ping color="bg-green-500" />
                        {item.model}
                      </span>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="uppercase">
                      {item.hardware_version}
                    </TableCell>
                    <TableCell>{item.serial_number}</TableCell>
                    <TableCell>{item.mac ? item.mac : "n/a"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="mt-6">Nenhum equipamento em uso encontrado.</p>
          )}
        </TabsContent>
        <TabsContent value="historico">
          {equipamentosByProjetoHistoryMap?.length > 0 ? (
            <Table className="my-4 text-muted-foreground ">
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
                {equipamentosByProjetoHistoryMap.map((item) => (
                  <TableRow key={item.id} className="whitespace-nowrap">
                    <TableCell className="py-2">
                      <span className="flex items-center gap-1 px-1">
                        <Ping color="bg-neutral-400" />
                        {item.model}
                      </span>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell className="uppercase">
                      {item.hardware_version}
                    </TableCell>
                    <TableCell>{item.serial_number}</TableCell>
                    <TableCell>{item.mac ? item.mac : "n/a"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="mt-6">Nenhum histórico de equipamentos encontrado.</p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default page;
