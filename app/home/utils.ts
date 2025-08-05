"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  addProjeto,
  deleteProjeto,
  updateProjeto,
} from "../actions/actions_projetos";
import { assignEquipamentosProjeto } from "../actions/actions_equipamentos";

export default function Utils() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Em Andamento");
  const [projeto, setProjeto] = useState("poc");
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSubmit(data) {
    const { equipamentos, ...projetoData } = data;
    const projetoId = await addProjeto(projetoData);
    if (equipamentos?.length && projetoId) {
      await assignEquipamentosProjeto(equipamentos, projetoId);
    }
    toast.success("Projeto adicionado com sucesso!");
    setIsOpen(false);
  }

  async function handleUpdate(data) {
    const { equipamentos, ...projetoData } = data;
    await updateProjeto(projetoData);
    if (equipamentos?.length) {
      await assignEquipamentosProjeto(equipamentos, projetoData.id);
    }
    toast.info("Projeto atualizado com sucesso!");
    setIsOpen(false);
  }

  const handleDelete = (itemId) => async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excluir", itemId);
    await deleteProjeto(formData);
    toast.success("Projeto removido com sucesso!");
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
    projeto,
    setProjeto,
    searchTerm,
    setSearchTerm,
  };
}
