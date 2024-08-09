import { getEquipamentos } from "@/app/actions/actions_equipamentos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditarEquipamentoModal from "./editar-poc-modal";
import ExcluirEquipamentoModal from "./excluir-poc-modal";
import NovoPocModal from "./novo-poc-modal";

async function Poc() {
  const equipamentos = await getEquipamentos();

  return (
    <main className="mt-6">
      <NovoPocModal />

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Type</TableHead>

              <TableHead>Serial Number</TableHead>
              <TableHead>Mac</TableHead>
              <TableHead>Hardware Version</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell className="gap-2 flex">
                  <EditarEquipamentoModal
                    itemId={item.id}
                    itemModelo={item.model}
                    itemNumSerial={item.serial_number}
                    itemMac={item.mac}
                    itemVersaoHardware={item.hardware_version}
                    itemTipoEquipamento={item.type}
                    itemStatus={item.status}
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

export default Poc;
