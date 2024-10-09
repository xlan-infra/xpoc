"use client";

import {useState} from "react";
import {toast} from "sonner";
import {addProjeto, deleteProjeto, updateProjeto} from "../actions/actions_projetos";

export default function Utils() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Em Andamento");
  const [categoria, setCategoria] = useState("poc");
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(data) {
    addProjeto(data);
    toast.success("Poc adicionada com sucesso!");
    setIsOpen(false);
  }

  function handleUpdate(data) {
    updateProjeto(data);
    toast.info("Poc atualizada com sucesso!");
    setIsOpen(false);
  }

  const handleDelete = (itemId) => async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excluir", itemId);
    await deleteProjeto(formData);
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

  function calculateDaysSinceStart(dt_inicio) {
    const startDate = new Date(dt_inicio);
    const currentDate = new Date();
    const timeDifference = currentDate - startDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  function formatarNome(nomeCompleto) {
    const nomes = nomeCompleto.split(" ");
    if (nomes.length > 1) {
      return `${nomes[0]} ${nomes[1][0]}.`;
    }
    return nomes[0];
  }

  return {
    isOpen,
    setIsOpen,
    handleSubmit,
    handleUpdate,
    handleDelete,
    DateFormat,
    calculateDaysSinceStart,
    formatarNome,
    statusFilter,
    setStatusFilter,
    categoria,
    setCategoria,
    searchTerm,
    setSearchTerm,
  };
}
