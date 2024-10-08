"use client";
import DeletePocButton from "../delete-projeto-button";

function ExcluirPocModal({itemId, itemStatus}) {
  return <DeletePocButton itemId={itemId} itemStatus={itemStatus} />;
}

export default ExcluirPocModal;
