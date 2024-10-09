import {getProjeto} from "../actions/actions_projetos";
import DataCard from "./data-card";

async function page() {
  const projectMap = await getProjeto();

  return (
    <main className="px-2 pb-2 pt-0">
      <DataCard data={projectMap} />
    </main>
  );
}

export default page;
