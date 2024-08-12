"use client";

import DeleteButton from "@/components/delete-button";
import Utils from "./utils";

export default function ExcluirEquipamentoModal({ itemId }) {
  const { handleDelete, isOpen, setIsOpen } = Utils();

  return <DeleteButton handledelete={handleDelete(itemId)} isOpen={isOpen} setIsOpen={setIsOpen} />;
}
