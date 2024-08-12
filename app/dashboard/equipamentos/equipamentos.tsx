import { getEquipamentos } from "@/app/actions/actions_equipamentos";
import { getPoc } from "@/app/actions/actions_poc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditarEquipamentoModal from "./editar-equipamento-modal";
import ExcluirEquipamentoModal from "./excluir-equipamento-modal";
import NovoModal from "./novo-equipamento-modal";

async function Equipamentos() {
  const equipamentos = await getEquipamentos();
  const poc = await getPoc();

  return (
    <main className="mt-6">
      <NovoModal pocMap={poc} />

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Mac</TableHead>
              <TableHead>Hw Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Poc</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentos.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-bold">{item.model}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.serial_number}</TableCell>
                <TableCell>{item.mac}</TableCell>
                <TableCell>{item.hardware_version}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.poc_id?.empresa ? item.poc_id?.empresa : "-"}</TableCell>

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
