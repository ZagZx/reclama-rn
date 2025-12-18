import CardReclamacao from "./CardReclamacao";
import { getReclamacao } from "./actions";
import { notFound } from "next/navigation";
import { PageReclamacaoProps } from "./props";

export default async function Page({ params }: PageReclamacaoProps) {
  const { id } = await params;

  const reclamacaoId = Number(id);
  if (!Number.isInteger(reclamacaoId)) {
    notFound();
  } 
  const response = await getReclamacao(reclamacaoId);
  if (response.status === 404) {
    notFound();
  }
  const reclamacao = response.data.reclamacao;

  return (
    <div className="flex flex-col px-20 py-5 gap-2">
      <CardReclamacao reclamacaoInicial={reclamacao}/>
    </div>
  );
}
