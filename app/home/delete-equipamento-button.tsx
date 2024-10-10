"use client";

import {Button} from "@/components/ui/button";
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
import {Trash} from "lucide-react";

export default function DeleteButton({handledelete, isOpen, setIsOpen, itemStatus}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-black hover:text-red-700 p-0"
          disabled={itemStatus}
        >
          <Trash size={16} className="mr-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir ?</DialogTitle>
          <DialogDescription>
            <p>
              Isso não pode ser desfeito. Isso excluirá seus dados <strong>permanentemente</strong>.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex gap-2">
          <DialogClose className="w-1/2" asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <form className="w-1/2" onSubmit={handledelete}>
            <Button variant="destructive" className="w-full" type="submit">
              Sim, quero excluir
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
