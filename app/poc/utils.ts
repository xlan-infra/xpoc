"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addPoc, deletePoc, updatePoc } from "../actions/actions_poc";

export default function Utils() {
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(data) {
    addPoc(data);
    toast.success("Poc adicionada com sucesso!");
    setIsOpen(false);
  }

  function handleUpdate(data) {
    updatePoc(data);
    toast.info("Poc atualizada com sucesso!");
    setIsOpen(false);
  }

  const handleDelete = (itemId) => async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excluir", itemId);
    await deletePoc(formData);
    toast.success("Poc removida com sucesso!");
    setIsOpen(false);
  };

  function DateFormat(dateString) {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
      .format(date)
      .replace(".", "")
      .replace(" de", "");
  }

  return { isOpen, setIsOpen, handleSubmit, handleUpdate, handleDelete, DateFormat };
}
