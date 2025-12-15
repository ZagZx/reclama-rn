"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { Reclamacao } from "@/types";
import Button from "@/components/ui/Button";

export default function ListaReclamacoes({
  reclamacoes,
}: {
  reclamacoes: Reclamacao[];
}) {
  const router = useRouter();
  const { usuario } = useAuth();

  async function handleResolver(reclamacaoId: number) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    await fetch(`${apiUrl}/api/reclamacao/${reclamacaoId}/resolver`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
    });
  }

  return (
    <div className="flex justify-center items-center flx-row gap-3 mx-[20px] text-gray-600">
      {reclamacoes.map((reclamacao) => (
        <div
          key={reclamacao.id}
          className="p-5 bg-white border-2 border-neutral-200 rounded-xl flex flex-col gap-2 w-10/12"
        >
          <ul className="flex flex-col">
            <li className="text-xl font-bold">{reclamacao.titulo}</li>
            <li>Feita por: {reclamacao.autor}</li>
            <li>{reclamacao.descricao}</li>
            <li>Cidade: {reclamacao.cidade}</li>
            <li
              className={clsx("text-white p-2 rounded-xl", {
                "bg-green-600": reclamacao.status === "Resolvida",
                "bg-yellow-600": reclamacao.status === "Pendente",
                "bg-red-600": reclamacao.status === "Contestada",
              })}
            >
              Status: {reclamacao.status}
            </li>
          </ul>
          <Button
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}`);
            }}
          >
            Acessar reclamação
          </Button>
          <Button
            onClick={async () => {
              await handleResolver(reclamacao.id);
              router.refresh();
            }}
          >
            Resolver reclamação
          </Button>
          <Button
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}/contestar`);
            }}
          >
            Contestar reclamação
          </Button>
          <Button
            onClick={() => {
              router.push(`/contestacoes?idReclamacao=${reclamacao.id}`);
            }}
          >
            Acessar contestações
          </Button>
          <Button
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}/atualizar`);
            }}
          >
            Editar reclamação
          </Button>
        </div>
      ))}
    </div>
  );
}
