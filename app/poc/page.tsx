import { getPoc } from "../actions/actions_poc";
import DataCard from "./data-card";

async function page() {
  const pocMap = await getPoc();

  return (
    <main className="px-2 pb-2 pt-0">
      <DataCard data={pocMap} />
    </main>
  );
}

export default page;
