"use client"

import toLocal from "@/lib/utils/localTime";
import { Contestacao } from "@/types";
import Link from "next/link";
import Button from "./Button";


interface ListaContestacoesProps {
  contestacoes: Contestacao[],
  exibirReclamacao?: boolean,
}

export default function ListaContestacoes({ contestacoes, exibirReclamacao = false }: ListaContestacoesProps){
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return(
    <div className="flex flex-col gap-3">
      {contestacoes.map((contestacao) => (
        <div key={contestacao.id} className="flex flex-col p-3 rounded-xl bg-white border-2 border-neutral-200 text-gray-600 gap-2">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">{contestacao.tituloReclamacao}</h1>
            <div className="flex border rounded-lg border-neutral-200">
              <p>Data de Contestação: {toLocal(contestacao.dataContestacao)}</p>
            </div>
          </div>
          <p>Motivo da contestação: {contestacao.motivo}</p>
          <ul className="flex gap-2 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Link 
                  href={`/reclamacao/${contestacao.reclamacaoId}`}
                >
                  <Button>
                    Ver Reclamação
                  </Button>
                </Link>
              </div>
            </div>
          </ul>
          <div className="flex flex-row gap-3 justify-center items-center">
            {contestacao.provas.map((foto) => (
              <img
                className="w-[200px] h-[200px] rounded-xl border border-neutral-200"
                key={foto.id}
                src={apiUrl + foto.url}
                alt=""
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}