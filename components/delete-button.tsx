"use client";

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

export default function DeleteButton({ handledelete, isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-red-500 p-0">
          excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir ?</DialogTitle>
          <DialogDescription>
            <p>
              Isso não pode ser desfeito. Isso excluirá <strong>permanentemente</strong> seu lançamento e removerá seus dados de nossos servidores.
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
