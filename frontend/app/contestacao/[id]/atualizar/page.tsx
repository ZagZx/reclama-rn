import "@/public/css/form.css";
import { notFound } from "next/navigation";
import FormAtualizarContestacao from "./FormAtualizarContestacao";
import DadosAtuaisContestacao from "./DadosAtuaisContestacao";
import { getContestacao } from "../actions";

interface PageProps {
  params:{
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const contestacaoId = Number(id);
  if (!Number.isInteger(contestacaoId)) {
    notFound();
  } 
  const response = await getContestacao(contestacaoId);
  if (response.status === 404) {
    notFound();
  }
  const contestacao = response.data.contestacao;

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-20">
        <DadosAtuaisContestacao contestacao={contestacao} />
        <FormAtualizarContestacao contestacao={contestacao} contestacaoId={contestacaoId} />
      </div>
    </div>
  );
}
