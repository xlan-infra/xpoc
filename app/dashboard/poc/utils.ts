import { useState } from "react";
import { toast } from "sonner";
import { addPoc, deletePoc, updatePoc } from "../../actions/actions_poc";

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

  return { isOpen, setIsOpen, handleSubmit, handleUpdate, handleDelete };
}
