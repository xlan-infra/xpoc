"use client";

import DeleteEquipamentoButton from "../delete-equipamento-button";
import Utils from "../utils";

export default function ExcluirEquipamentoModal({ itemId, itemStatus }) {
  const { handleDelete, isOpen, setIsOpen } = Utils();

  return (
    <DeleteEquipamentoButton
      handledelete={handleDelete(itemId)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      itemStatus={itemStatus}
    />
  );
}
