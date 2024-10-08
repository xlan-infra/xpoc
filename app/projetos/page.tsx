import {getProjeto} from "../actions/actions_projetos";
import DataCard from "./data-card";

async function page() {
  const pocMap = await getProjeto();

  return (
    <main className="px-2 pb-2 pt-0">
      <DataCard data={pocMap} />
    </main>
  );
}

export default page;
