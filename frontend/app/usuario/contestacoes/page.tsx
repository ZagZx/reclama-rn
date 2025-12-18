"use client"

import Link from "next/link";
import { H1 } from "@/components/ui/titles";
import Button from "@/components/ui/Button";
import { getContestacoesUsuario } from "../actions";
// import ListaContestacoes from "@/components/ui/ListaContestacoes";
import { useEffect, useState } from "react";
import { Contestacao } from "@/types";
import toLocal from "@/lib/utils/localTime";

export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [contestacoes, setContestacoes] = useState<Contestacao[] | null>(null);
  

  useEffect(()=>{
    (
      async()=>{
        const response = await getContestacoesUsuario();
        const data = response.data;
        setContestacoes(data.contestacoes);
      }
    )()}, []
  );

  if (contestacoes) {
    return (
      <section className="px-20 py-5">
        <H1>Minhas Contestações</H1>
        {/* LISTA ABAIXO */}
        <div className="flex flex-col gap-3">
          {contestacoes.map((contestacao) => (
            <div key={contestacao.id} className="flex flex-col p-3 rounded-xl bg-white border-2 border-neutral-200 text-gray-600 gap-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Reclamação: {contestacao.tituloReclamacao}</h1>
                <div className="flex border rounded-lg border-neutral-200">
                  <p>Data de Contestação: {toLocal(contestacao.dataContestacao)}</p>
                </div>
              </div>
              <p>Motivo da contestação: {contestacao.motivo}</p>
              <ul className="flex gap-2 flex-col">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Link href={`/reclamacao/${contestacao.reclamacaoId}`}>
                      <Button>
                        Ver Reclamação
                      </Button>
                    </Link>
                    <Link href={`/contestacao/${contestacao.id}/atualizar`}>
                      <Button styles="bg-yellow-600 hover:bg-yellow-800">
                        Editar Contestação
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
        {/* LISTA ACIMA */}
      </section>
    );
  }

  // if (dados) {
  //   console.log(dados)
  //   return (
  //     <section className="px-20 py-5">
  //       <H1>Contestações da Reclamação</H1>
  //       <Link href={`/reclamacao/${dados}`}>
  //         <Button>Visualizar Reclamação</Button>
  //       </Link>
  //       <div className="flex flex-col gap-5 justify-center">
  //         {dados.map((dados) => (
  //           <div key={dados.id} className="p-3 bg-gray-800 rounded-xl">
  //             <h1 className="text-[20px]">Motivo: {dados.motivo}</h1>
  //             <span>Reclamação: </span><Link className="text-blue-400 underline" href={`/reclamacao/${dados.reclamacaoId}`}>{dados.tituloReclamacao}</Link>
  //             <p>Autor: {dados.autor}</p>
  //             <p>Data de contestação: {toLocal(dados.dataContestacao)}</p>
  //             <div className="flex flex-row gap-3 justify-center items-center">
  //               {dados.provas.map((foto: any) => (
  //                 <img
  //                   className="w-[200px] h-[200px] rounded-xl border border-neutral-200"
  //                   key={foto.id}
  //                   src={apiUrl + foto.url}
  //                   alt=""
  //                 />
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //   );
  // }
}
