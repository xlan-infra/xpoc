"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Eye} from "lucide-react";
import Link from "next/link";
import Utils from "../utils";

function DetalhesEquipamentoModal({
  itemId,
  itemModelo,
  itemNumSerial,
  itemMac,
  itemVersaoHardware,
  itemTipoEquipamento,
  itemStatus,
  itemPagina,
  itemNotas,
}) {
  const {isOpen, setIsOpen} = Utils();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-black hover:text-green-800 p-0">
          <Eye size={16} className="mr-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        {/* Status no canto superior direito */}
        <div className="flex justify-between items-center">
          <DialogTitle className="mb-2 text-xl">Detalhes do Equipamento</DialogTitle>
        </div>

        <DialogDescription>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <strong className="text-black">Modelo</strong>
              <span>{itemModelo}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Serial</strong>
              <span>{itemNumSerial ? itemNumSerial : "Não informado"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Mac Address</strong>
              <span>{itemMac ? itemMac : "Não informado"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Versão Hardware</strong>
              <span>{itemVersaoHardware ? itemVersaoHardware : "Não informado"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Tipo Equipamento</strong>
              <span>{itemTipoEquipamento ? itemTipoEquipamento : "Não informado"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Status</strong>
              <span>{itemStatus ? itemStatus : "Não informado"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-black">Página Oficial</strong>
              <Link className="underline text-violet-400" href={itemPagina}>
                Link
              </Link>
            </div>
            {itemNotas && (
              <div className="bg-amber-100 p-3 text-amber-600 rounded">{itemNotas}</div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default DetalhesEquipamentoModal;
