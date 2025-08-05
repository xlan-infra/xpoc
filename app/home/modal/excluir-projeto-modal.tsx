import Utils from "@/app/home/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

export default function ExcluirPocModal({ itemId, itemStatus }) {
  const { handleDelete, isOpen, setIsOpen } = Utils();
  const deleteItem = handleDelete(itemId);

  const status = itemStatus === "Em Andamento";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className={`text-red-500 hover:text-red-700 p-0 ${
            status && `hidden`
          }`}
          disabled={status}
        >
          <Trash size={14} className="mr-1" /> remover
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir ?</DialogTitle>
          <DialogDescription>
            Isso não pode ser desfeito. Isso excluirá seus dados{" "}
            <strong>permanentemente</strong>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2">
          <DialogClose className="w-1/2" asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <form className="w-1/2" onSubmit={deleteItem}>
            <Button variant="destructive" className="w-full" type="submit">
              Sim, quero excluir
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
