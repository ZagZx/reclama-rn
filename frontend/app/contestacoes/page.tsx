"use client";

import { useState, useEffect } from "react";
import toLocal from "@/utils/localTime";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Page() {
  const [dados, setDados] = useState<[] | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const pPesquisa = useSearchParams();
  const reclamacaoId = pPesquisa.get("id");
  const router = useRouter();

  async function getDados() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${apiUrl}/api/reclamacao/${reclamacaoId}/contestacoes`;
    const request = await fetch(url, {
      method: "GET",
      credentials: "include" as RequestCredentials,
    });
    return await request.json();
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
    if (dados === null) {
      (async () => {
        const dados = await getDados();
        const usuario = await getEu();
        setDados(await dados.contestacoes);
        setIdUsuario(await usuario.id);
      })();
    }
  });
  if (dados) {
    return (
      <div className="flex flex-row gap-[50px] justify-center">
        {dados.map((dados) => (
          <div key={dados.id} className="p-3 bg-gray-800 rounded-xl">
            <h1 className="text-[20px]">Motivo: {dados.motivo}</h1>
            <h3 className="text-[15px]">ID Reclamação: {dados.reclamacaoId}</h3>
            <h3 className="text-[15px]">ID Usuário: {dados.usuarioId}</h3>
            <p>Autor: {dados.autor}</p>
            <p>Data de contestação: {toLocal(dados.dataContestacao)}</p>
            <div className="flex flex-col justify-center items-center">
              {dados.provas.map((foto) => (
                <img
                  className="w-[200px]"
                  key={foto.id}
                  src={API_URL + foto.url}
                  alt=""
                />
              ))}
            </div>
            <button
              className={clsx("bg-gray-700 rounded p-3 cursor-pointer", {
                invisible: Number(dados.usuarioId) !== Number(idUsuario),
                visible: Number(dados.usuarioId) === Number(idUsuario),
              })}
              type="button"
              onClick={() => {
                router.push(`/contestacao/atualizar?id=${dados.id}`);
              }}
            >
              Atualizar contestação
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        <h1>Erro</h1>
      </>
    );
  }
}
