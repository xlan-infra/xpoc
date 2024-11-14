"use client";

import DeleteEquipamentoButton from "../delete-equipamento-button";
import Utils from "../utils";

export default function ExcluirEquipamentoModal({
  itemId,
  equipamentoProjetoId,
}) {
  const { handleDelete, isOpen, setIsOpen } = Utils();

  return (
    <DeleteEquipamentoButton
      itemStatus={equipamentoProjetoId}
      handledelete={handleDelete(itemId)}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
}
