import {
  getEquipamentosCadastrados,
  getEquipamentosStatus,
} from "@/app/actions/actions_equipamentos";
import {getPocCount} from "@/app/actions/actions_projetos";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";

async function DashboardCards() {
  const equipamentosCadastrados = await getEquipamentosCadastrados();
  const pocCount = await getPocCount();
  const equipamentosStatus = await getEquipamentosStatus();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <Card className="bg-gradient-to-bl from-violet-50/50 from-5% ">
        <CardHeader className="pb-2">
          <CardDescription>Equipamentos cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          {equipamentosCadastrados.map((item) => (
            <Info
              key={item.equipamento_type}
              info1={item.tipo_count}
              info2={item.equipamento_type}
            />
          ))}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-bl from-violet-50/50 from-5%">
        <CardHeader className="pb-2">
          <CardDescription>Status dos equipamentos</CardDescription>
        </CardHeader>
        <CardContent>
          {equipamentosStatus.map((item) => (
            <Info
              key={item.equipamento_status}
              info1={item.status_count}
              info2={item.equipamento_status}
            />
          ))}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-bl from-violet-50/50 from-5%">
        <CardHeader className="pb-2">
          <CardDescription>Pocs cadastradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Info info1={pocCount} info2={"POCs"} />
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardCards;

export function Info({info1, info2}) {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-xl text-violet-800 font-bold">{info1}</p>
      <p>{info2}</p>
    </div>
  );
}
