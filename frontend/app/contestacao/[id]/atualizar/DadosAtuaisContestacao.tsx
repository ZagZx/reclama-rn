"use client";

import toLocal from "@/lib/utils/localTime";

export default function DadosAtuaisContestacao({ contestacao }: { contestacao: any }) {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  return (
    <div className="w-[600px] bg-white rounded-xl border-2 border-neutral-200 text-gray-600 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{contestacao?.tituloReclamacao ?? 'Reclamação'}</h1>
          <p className="text-sm text-neutral-500 mt-1">Motivo atual da contestação: {contestacao?.motivo}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {/* <p className="text-sm text-neutral-500">Autor: {contestacao?.autor ?? contestacao?.usuario?.nome ?? '—'}</p> */}
          <p className="text-sm text-neutral-500">Criada: {contestacao?.dataContestacao ? toLocal(contestacao.dataContestacao) : '—'}</p>
        </div>
      </div>

      <hr className="my-4" />

      {contestacao?.provas && contestacao.provas.length > 0 && (
        <>
          <h4 className="text-sm text-neutral-500 mb-2">📷 Provas</h4>
          <div className="flex gap-3">
            {contestacao.provas.map((f: any) => (
              <img key={f.id ?? f.nomeArquivo} src={`${apiUrl}${f.url}`} alt={f.nomeArquivo ?? 'prova'} className="w-[150px] h-[120px] object-cover rounded-md border" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
