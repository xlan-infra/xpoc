import DataCard from "./data-card";
import NovoPocModal from "./novo-poc-modal";

async function Poc() {
  return (
    <main className="px-2 pb-2 pt-0">
      <NovoPocModal />
      <DataCard />
    </main>
  );
}

export default Poc;
