"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { Reclamacao } from "@/types";

export default function ListaReclamacoes({ reclamacoes }: { reclamacoes: Reclamacao[] }) {
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
    <div className="flex justify-center items-center flx-row gap-3">
      {reclamacoes.map((reclamacao) => (
        <div
          key={reclamacao.id}
          className="p-5 bg-gray-800 rounded-xl flex flex-col gap-2"
        >
          <ul className="flex flex-col gap-5">
            <li>Autor: {reclamacao.autor}</li>
            <li>Titulo: {reclamacao.titulo}</li>
            <li>Descrição: {reclamacao.descricao}</li>
            <li>Cidade: {reclamacao.cidade}</li>
            <li
              className={clsx("p-2 rounded-xl", {
                "bg-green-600": reclamacao.status === "Resolvida",
                "bg-yellow-600": reclamacao.status === "Pendente",
                "bg-red-600": reclamacao.status === "Contestada",
              })}
            >
              Status: {reclamacao.status}
            </li>
          </ul>
          <button
            className="bg-gray-700 rounded p-3 cursor-pointer"
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}`);
            }}
          >
            Acessar reclamação
          </button>
          <button
            className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
              invisible: ["Resolvida", "Contestada"].includes(
                reclamacao.status,
              ),
            })}
            type="button"
            onClick={async () => {
              await handleResolver(reclamacao.id);
              router.refresh();
            }}
          >
            Resolver reclamação
          </button>
          <button
            className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
              invisible: ["Pendente"].includes(reclamacao.status),
            })}
            type="button"
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}/contestar`);
            }}
          >
            Contestar reclamação
          </button>
          <button
            className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
              invisible: ["Pendente"].includes(reclamacao.status),
            })}
            type="button"
            onClick={() => {
              router.push(`/contestacoes?idReclamacao=${reclamacao.id}`);
            }}
          >
            Acessar contestações
          </button>
          <button
            className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
              invisible: Number(reclamacao.usuarioId) !== Number(usuario?.id),
              visible: Number(reclamacao.usuarioId) === Number(usuario?.id),
            })}
            type="button"
            onClick={() => {
              router.push(`/reclamacao/${reclamacao.id}/atualizar`);
            }}
          >
            Editar reclamação
          </button>
        </div>
      ))}
    </div>
  );
}
