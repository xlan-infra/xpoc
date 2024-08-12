import { getEquipamentos } from "@/app/actions/actions_equipamentos";
import { getPoc } from "@/app/actions/actions_poc";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditarEquipamentoModal from "./editar-equipamento-modal";
import ExcluirEquipamentoModal from "./excluir-equipamento-modal";
import NovoModal from "./novo-equipamento-modal";

async function Equipamentos() {
  const equipamentos = await getEquipamentos();
  const poc = await getPoc();

  return (
    <main className="mt-6 p-2">
      <NovoModal pocMap={poc} />

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modelo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>SN</TableHead>
              <TableHead>Mac</TableHead>
              <TableHead>Versão Hw</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Poc</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentos.map((item) => (
              <TableRow key={item.id} className="whitespace-nowrap">
                <TableCell className="font-bold">{item.model}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.serial_number}</TableCell>
                <TableCell>{item.mac}</TableCell>
                <TableCell>{item.hardware_version}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      item.status === "Em Estoque"
                        ? "border-green-500 text-green-500 hover:border-green-600 hover:text-green-600 bg-transparent hover:bg-transparent"
                        : item.status === "Locado"
                        ? "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 bg-transparent hover:bg-transparent "
                        : item.status === "RMA"
                        ? "border-orange-500 text-orange-500 hover:border-orange-600 hover:text-orange-600 bg-transparent hover:bg-transparent"
                        : ""
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={"outline"}>{item.poc_id?.empresa ? item.poc_id?.empresa : "Nenhum"}</Badge>
                </TableCell>

                <TableCell className="gap-2 flex">
                  <EditarEquipamentoModal
                    itemId={item.id}
                    itemModelo={item.model}
                    itemNumSerial={item.serial_number}
                    itemMac={item.mac}
                    itemVersaoHardware={item.hardware_version}
                    itemTipoEquipamento={item.type}
                    itemStatus={item.status}
                    itemNotas={item.notas}
                    ItemPocId={item.poc_id?.id}
                    itemPocMap={poc}
                  />

                  <ExcluirEquipamentoModal itemId={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default Equipamentos;
