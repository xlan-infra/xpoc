"use client";

import DeleteEquipamentoButton from "../delete-equipamento-button";
import Utils from "../utils";

export default function ExcluirEquipamentoModal({itemId, equipamentoPocId}) {
  const {handleDelete, isOpen, setIsOpen} = Utils();

  return (
    <DeleteEquipamentoButton
      itemStatus={equipamentoPocId}
      handledelete={handleDelete(itemId)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
