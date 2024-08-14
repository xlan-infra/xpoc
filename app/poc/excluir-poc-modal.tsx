import { getEquipamentosByPoc } from "@/app/actions/actions_equipamentos";
import DeletePocButton from "./delete-poc-button";

async function ExcluirPocModal({ itemId }) {
  const equipamentosByPocMap = await getEquipamentosByPoc(itemId);

  return <DeletePocButton itemId={itemId} itemStatus={equipamentosByPocMap.length > 0} />;
}

export default ExcluirPocModal;
