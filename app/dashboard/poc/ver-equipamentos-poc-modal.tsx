import { getEquipamentosByPoc } from "@/app/actions/actions_equipamentos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function VerEquipamentosPocModal({ itemId }) {
  const equipamentosByPocMap = await getEquipamentosByPoc(itemId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-black p-0">
          equipamentos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Equipamentos no Cliente</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader hidden={equipamentosByPocMap?.length === 0}>
            <TableRow>
              <TableHead>Modelo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>SN</TableHead>
              <TableHead>Mac</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipamentosByPocMap?.length > 0 ? (
              equipamentosByPocMap?.map((item) => (
                <TableRow key={item.id} className="whitespace-nowrap">
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.serial_number}</TableCell>
                  <TableCell>{item.mac}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>Nenhum equipamento encontrado.</p>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default VerEquipamentosPocModal;
