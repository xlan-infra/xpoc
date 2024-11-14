import { useState } from "react";
import { toast } from "sonner";
import {
  addEquipamentos,
  deleteEquipamentos,
  updateEquipamentos,
} from "../actions/actions_equipamentos";

export default function Utils() {
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(data) {
    addEquipamentos(data);
    toast.success("Equipamento adicionado com sucesso!");
    setIsOpen(false);
  }

  function handleUpdate(data) {
    updateEquipamentos(data);
    toast.info("Equipamento atualizado com sucesso!");
    setIsOpen(false);
  }

  const handleDelete = (itemId) => async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("excluir", itemId);
    await deleteEquipamentos(formData);
    toast.success("Equipamento removido com sucesso!");
    setIsOpen(false);
  };

  return { isOpen, setIsOpen, handleSubmit, handleUpdate, handleDelete };
}
