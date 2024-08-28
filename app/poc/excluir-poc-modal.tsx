"use client";
import DeletePocButton from "./delete-poc-button";

function ExcluirPocModal({ itemId, itemStatus }) {
  return <DeletePocButton itemId={itemId} itemStatus={itemStatus} />;
}

export default ExcluirPocModal;
