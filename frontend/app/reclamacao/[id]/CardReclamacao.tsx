"use client";

import { Reclamacao, StatusReclamacao } from "@/types";
import toLocal from "@/lib/utils/localTime";
import { MapPin } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useAuth } from "@/context/AuthContext";
import { H1, H2 } from "@/components/ui/titles";
import Link from "next/link";

export default function CardReclamacao({
  reclamacaoInicial,
}: {
  reclamacaoInicial: Reclamacao;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const {usuario} = useAuth();
  const router = useRouter();
  const [reclamacao, setReclamacao] = useState<Reclamacao>(reclamacaoInicial);
  // const [statusReclamacao, setStatusReclamacao] = useState<StatusReclamacao>(reclamacao.status);

  // derived permission booleans
  const isAuthor = reclamacao.usuarioId === usuario?.id;
  const isResolved = reclamacao.status === "Resolvida";
  const isPending = reclamacao.status === "Pendente";

  const canResolve = isAuthor && !isResolved;
  const canEdit = isAuthor && isPending;
  const canContest = !isPending;
  const canViewContestations = !isPending;

  async function handleResolver(reclamacaoId: number) {
    const response = await fetch(`${apiUrl}/api/reclamacao/${reclamacaoId}/resolver`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
    });
    const data = await response.json();

    if (response.status === 200) {
      setReclamacao(data.reclamacao);
    }
    else {
      Swal.fire({
        title: "Resolver Reclamação",
        text: data.message,
        icon: getIconByStatus(response.status),
      })
    }
  }

  return (
    <>
      <section>
        <H1>Reclamação</H1>
        <div className="flex flex-col p-3 bg-gray-800 rounded-xl bg-white border-2 border-neutral-200 text-gray-600 gap-2">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">{reclamacao.titulo}</h1>
            <div className="flex border rounded-lg border-neutral-200">
              <p>Criada: {toLocal(reclamacao.dataCriacao)}</p>
              { reclamacao.status === "Resolvida" && reclamacao.dataResolucao ? 
                <>
                  <p>&nbsp;|&nbsp;</p>
                  <p>Resolvida: {toLocal(reclamacao.dataResolucao)}</p>
                </>
                : 
                <>
                </>
              }
              {/* { toLocal(reclamacao.dataAtualizacao) !== toLocal(reclamacao.dataCriacao) ? 
                <>
                  <p>&nbsp;|&nbsp;</p>
                  <p>Atualizada: {toLocal(reclamacao.dataAtualizacao)}</p>
                </>
                : 
                <>
                </>
              } */}
            </div>
          </div>
          <p className="">{reclamacao.descricao}</p>
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
                {canResolve && (
                  <Button
                    onClick={async () => {
                      await handleResolver(reclamacao.id);
                    }}
                  >
                    Resolver reclamação
                  </Button>
                )}

                {canEdit && (
                  <Button
                    styles="bg-yellow-600 hover:bg-yellow-800"
                    onClick={() => {
                      router.push(`/reclamacao/${reclamacao.id}/atualizar`);
                    }}
                  >
                    Editar reclamação
                  </Button>
                )}

                {canContest && (
                  <Button
                    onClick={() => {
                      router.push(`/reclamacao/${reclamacao.id}/contestar`);
                    }}
                  >
                    Contestar reclamação
                  </Button>
                )}

                {canViewContestations && (
                  <Button
                    onClick={() => {
                      router.push(`/reclamacao/${reclamacao.id}/contestacoes`);
                    }}
                  >
                    Ver Contestações
                  </Button>
                )}
              </div>
            </div>
          </ul>
        </div>
      </section>
      {reclamacao.fotos.length !== 0 ? (
        <section>
          <H1>Imagens da reclamação</H1>
          <div className="flex flex-row gap-2 justify-center items-center border-2 border-neutral-200 rounded-lg py-5">
            {reclamacao.fotos.map((foto) => (
              <img
                className="w-[200px] h-[200px] rounded-xl border border-neutral-200"
                key={foto.id}
                src={apiUrl + foto.url}
                alt={foto.nomeArquivo}
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
