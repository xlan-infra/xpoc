import { getEquipamentosByPoc } from "@/app/actions/actions_equipamentos";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

async function VerEquipamentosPocModal({ itemId }) {
  const equipamentosByPocMap = await getEquipamentosByPoc(itemId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-green-600 p-0">
          equipamentos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Equipamentos</DialogTitle>
        </DialogHeader>
        {equipamentosByPocMap?.length > 0 ? equipamentosByPocMap?.map((item) => <p>{item.model}</p>) : <p>Não há equipamentos cadastrados</p>}
      </DialogContent>
    </Dialog>
  );
}

export default VerEquipamentosPocModal;
