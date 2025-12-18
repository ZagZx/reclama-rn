"use client";

import { useEffect, useState } from "react";
import toLocal from "@/lib/utils/localTime";
import { useParams, useRouter } from "next/navigation";
import { H1 } from "@/components/ui/titles";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Page() {
	const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [contestacoes, setContestacoes] = useState<any[]>([]);
	const params = useParams();
	const reclamacaoId = params?.id;
	const router = useRouter();
	const { usuario } = useAuth();

	async function getContestacoes() {
		const url = `${apiUrl}/api/reclamacao/${reclamacaoId}/contestacoes`;
		const response = await fetch(url, {
			method: "GET",
		});
		return response;
	}

	useEffect(() => {
		(async () => {
			const response = await getContestacoes();
			const result = await response.json();
			setContestacoes(result.contestacoes);
		})();
	}, [reclamacaoId]);

	return (
		<section className="px-20 py-5">
			<H1>Contestações</H1>
      <div className="flex flex-col gap-3">
        {contestacoes.map((contestacao) => (
          <div key={contestacao.id} className="flex flex-col p-3 rounded-xl bg-white border-2 border-neutral-200 text-gray-600 gap-2">
            <div className="flex justify-between">
              {/* <h1 className="text-xl font-bold">Reclamação: {contestacao.tituloReclamacao}</h1> */}
              <div className="flex border rounded-lg border-neutral-200">
                <p>Data de Contestação: {toLocal(contestacao.dataContestacao)}</p>
              </div>
            </div>
            <p>Motivo da contestação: {contestacao.motivo}</p>
            {/* <ul className="flex gap-2 flex-col">
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
            </ul> */}
            <div className="flex flex-row gap-3 justify-center items-center">
              {contestacao.provas.map((foto: any) => (
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
		</section>
	);
}
