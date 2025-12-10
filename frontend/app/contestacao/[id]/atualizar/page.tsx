import "@/public/css/form.css";
import { notFound } from "next/navigation";
import FormAtualizarContestacao from "./FormAtualizarContestacao";
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
  // const contestacao = response.data.contestacao;

  return (
    <div className="flex justify-center">
      <FormAtualizarContestacao contestacaoId={contestacaoId}/>
    </div>
  );
}
