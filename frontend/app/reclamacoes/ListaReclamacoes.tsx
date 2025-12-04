"use client";

import { useRouter } from "next/navigation";

export default function ListaReclamacoes({ lista }: { lista: any[] }) {
  const router = useRouter();
  // faz requisição para /api/me e pega o id do usuario
  // se o id do usuario for o mesmo do autor, mostra o botão de resolver

  async function handleResolver(reclamacaoId: number) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacao/${reclamacaoId}/resolver`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include" as RequestCredentials
    });
  }
  return (
    <>
      {lista.map((reclamacao) => (
        <div key={reclamacao.id}>
          <ul>
            <li>Autor: {reclamacao.autor}</li>
            <li>Titulo: {reclamacao.titulo}</li>
            <li>Descrição: {reclamacao.descricao}</li>
            <li>Cidade: {reclamacao.cidade}</li>
            <li>Status: {reclamacao.status}</li>
          </ul>

          <button
            type="button"
            onClick={async () => {
              await handleResolver(reclamacao.id);
              router.refresh()
            }}
          >
            Resolver reclamação
          </button>
        </div>
      ))}
    </>
  );
}
