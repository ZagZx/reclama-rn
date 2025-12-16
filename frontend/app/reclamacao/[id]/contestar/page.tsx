
import "@/public/css/form.css";
import { FormAddContestacao } from "./FormAddContestacao";
import getReclamacao from "../actions";
import { notFound } from "next/navigation";
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
  return (
    <div className="flex flex-1 items-center justify-center">
      <FormAddContestacao reclamacaoId={reclamacaoId}/>
    </div>
  );
}
