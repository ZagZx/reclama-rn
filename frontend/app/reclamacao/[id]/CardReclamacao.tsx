"use client";

import { Reclamacao } from "@/types";
import toLocal from "@/lib/utils/localTime";
import { MapPin } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CardReclamacao({
  reclamacao,
}: {
  reclamacao: Reclamacao;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  async function handleResolver(reclamacaoId: number) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    await fetch(`${apiUrl}/api/reclamacao/${reclamacaoId}/resolver`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-3 bg-gray-800 rounded-xl mx-[100px] my-10 bg-white border-2 border-neutral-200 text-gray-600 gap">
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">{reclamacao.titulo}</h1>
          <div className="flex border rounded-lg border-neutral-200">
            <p>Criada: {toLocal(reclamacao.dataCriacao)} |&nbsp;</p>
            <p>Resolvida: {toLocal(reclamacao.dataResolucao)} |&nbsp;</p>
            <p>Atualizada: {toLocal(reclamacao.dataAtualizacao)}</p>
          </div>
        </div>
        <h3 className="text-[15px]">{reclamacao.descricao}</h3>
        <ul className="flex gap-2 flex-col">
          <li className="flex">
            <MapPin color="#dd0000" />
            {reclamacao.cidade}, RN | <p>&nbsp;</p>
            {reclamacao.endereco
              ? reclamacao.endereco
              : "Localização não informada"}
          </li>
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
            <div className="flex gap-2">
              {reclamacao.status === "Resolvida" ? (
                <></>
              ) : (
                <Button
                  onClick={async () => {
                    await handleResolver(reclamacao.id);
                    router.refresh();
                  }}
                >
                  Resolver reclamação
                </Button>
              )}
              {reclamacao.status === "Pendente" ? (
                <Button
                  onClick={() => {
                    router.push(`/reclamacao/${reclamacao.id}/atualizar`);
                  }}
                >
                  Editar reclamação
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    router.push(`/reclamacao/${reclamacao.id}/contestar`);
                  }}
                >
                  Contestar reclamação
                </Button>
              )}
              <Button
                onClick={() => {
                  router.push(`/contestacoes?idReclamacao=${reclamacao.id}`);
                }}
              >
                Contestações
              </Button>
            </div>
          </div>
        </ul>
      </div>
      {reclamacao.fotos !== null ? (
        <div className="flex flex-col gap-[20px] justify-center items-center border-2 border-neutral-200 rounded-lg mx-[100px] py-5">
          {reclamacao.fotos.map((foto) => (
            <img
              className="w-[200px] h-[200] rounded-xl"
              key={foto.id}
              src={apiUrl + foto.url}
              alt=""
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
