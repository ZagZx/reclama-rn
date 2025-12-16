import "@/public/css/form.css";
import { notFound } from "next/navigation";
import getReclamacao from "../actions";
import { FormAtualizarReclamacao } from "./FormAtualizarReclamacao";
import DadosAtuaisReclamacao from "./DadosAtuaisReclamacao";
import { PageReclamacaoProps } from "../props";

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

  return(
    <div className="flex align-center justify-center h-full gap-[20px]">
      <DadosAtuaisReclamacao reclamacao={reclamacao}/>
      <FormAtualizarReclamacao reclamacaoId={reclamacaoId}/>
    </div>
  );
}