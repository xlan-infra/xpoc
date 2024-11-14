import { Briefcase } from "lucide-react";
import { getProjeto } from "../actions/actions_projetos";
import DataCard from "./data-card";

async function page() {
  const projectMap = await getProjeto();

  return (
    <main className="px-2 pb-2 pt-4">
      <h1 className="border-b pb-2 text-xl font-bold tracking-tight first:mt-0 flex items-center gap-1">
        <Briefcase className="text-primary" /> Projetos
      </h1>
      <DataCard data={projectMap} />
    </main>
  );
}

export default page;
