"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function ListaReclamacoes({ lista }: { lista: [] }) {
  const router = useRouter();
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  // faz requisição para /api/me e pega o id do usuario
  // se o id do usuario for o mesmo do autor, mostra o botão de resolver

  async function handleResolver(reclamacaoId: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacao/${reclamacaoId}/resolver`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include" as RequestCredentials,
    });
  }
  async function getEu() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${apiUrl}/api/me`;
    const request = await fetch(url, {
      method: "GET",
      credentials: "include" as RequestCredentials,
    });
    const data = await request.json();
    return await data;
  }

  useEffect(() => {
    if (idUsuario === null) {
      (async () => {
        const usuario = await getEu();
        setIdUsuario(await usuario.id);
      })();
    }
  });
  return (
    <main className="flex justify-center items-center flx-row gap-3">
      {lista.map((reclamacao) => (
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
              router.push(`/reclamacao?id=${reclamacao.id}`);
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
              router.push(`/contestacao/adicionar?id=${reclamacao.id}`);
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
              router.push(`/contestacoes?id=${reclamacao.id}`);
            }}
          >
            Acessar contestações
          </button>
          <button
            className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
              invisible: Number(reclamacao.usuarioId) !== Number(idUsuario),
              visible: Number(reclamacao.usuarioId) === Number(idUsuario),
            })}
            type="button"
            onClick={() => {
              router.push(`/reclamacao/atualizar?id=${reclamacao.id}`);
            }}
          >
            Editar reclamação
          </button>
        </div>
      ))}
    </main>
  );
}
