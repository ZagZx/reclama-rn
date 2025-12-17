"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { Reclamacao } from "@/types";
import Button from "@/components/ui/Button";
import { MapPin } from "lucide-react";

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
    <div className="flex justify-center items-center flex-col gap-3 mx-[20px] text-gray-600 py-10">
      {reclamacoes.map((reclamacao) => (
        <div
          key={reclamacao.id}
          className="p-5 bg-white border-2 border-neutral-200 rounded-xl flex flex-col gap-2 w-10/12"
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">
                {reclamacao.titulo} - {reclamacao.endereco}
              </h3>
            </div>
            <span>{reclamacao.descricao}</span>
          </div>
          <ul className="flex flex-row items-center">
            <li className="flex">
              <MapPin color="#dd0000" />
              {reclamacao.cidade}, RN
            </li>
          </ul>
          <div className="flex justify-between">
            <div
              className={clsx("text-white p-2 rounded-lg", {
                "bg-green-600": reclamacao.status === "Resolvida",
                "bg-yellow-600": reclamacao.status === "Pendente",
                "bg-red-600": reclamacao.status === "Contestada",
              })}
            >
              Status: {reclamacao.status}
            </div>
            <Button
              onClick={() => {
                router.push(`/reclamacao/${reclamacao.id}`);
              }}
            >
              Acessar reclamação
            </Button>
            {/*<Button
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
            </Button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
