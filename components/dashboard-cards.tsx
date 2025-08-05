import {
  getEquipamentosCadastrados,
  getEquipamentosStatus,
} from "@/app/actions/actions_equipamentos";
import {
  getProjetoCount,
  getProjetoStatusCount,
} from "@/app/actions/actions_projetos";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

async function DashboardCards() {
  const equipamentosCadastrados = await getEquipamentosCadastrados();
  const pocCount = await getProjetoCount();
  const pocStatus = await getProjetoStatusCount();
  const equipamentosStatus = await getEquipamentosStatus();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
      <Card className="hover:shadow-lg transition-shadow duration-500 hover:shadow-violet-100">
        <CardHeader className="pb-2">
          <CardDescription>Equipamentos cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          {equipamentosCadastrados.map((item, index) => (
            <Info
              key={`${item.equipamento_type}-${index}`}
              info1={item.tipo_count}
              info2={item.equipamento_type}
            />
          ))}
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow duration-500 hover:shadow-violet-100">
        <CardHeader className="pb-2">
          <CardDescription>Status dos equipamentos</CardDescription>
        </CardHeader>
        <CardContent>
          {equipamentosStatus.map((item, index) => (
            <Info
              key={`${item.equipamento_status}-${index}`}
              info1={item.status_count}
              info2={item.equipamento_status}
            />
          ))}
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow duration-500 hover:shadow-violet-100">
        <CardHeader className="pb-2">
          <CardDescription>Pocs cadastradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Info info1={pocCount} info2={"POCs"} />
          <Info info1={pocStatus.finalizadas} info2={"Finalizadas"} />
          <Info info1={pocStatus.emAndamento} info2={"Em Andamento"} />
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardCards;

export function Info({ info1, info2 }) {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xl text-violet-800 font-bold">{info1}</p>
      <p>{info2}</p>
    </div>
  );
}
