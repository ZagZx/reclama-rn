"use client";

import { InputFotos } from "@/components/ui/Inputs/InputFotos";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormAtualizarContestacao({ contestacaoId }: {contestacaoId: number}) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${apiUrl}/api/contestacao/${contestacaoId}/atualizar`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });

    const json = await response.json();
  
    if (json.message) {
      Swal.fire({
        title:"Atualizar Contestação",
        text: json.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 200) {
          router.push(`/contestacoes?idReclamacao=${json.contestacao.reclamacaoId}`)
        }
      });
    }
    return {
      ok: response.ok,
      status: response.status,
      data: json
    };
  }
  return(
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-gray-800 rounded-xl p-2 px-10"
      method="POST"
    >
      <label htmlFor="motivo">
        Motivo
      </label>
      <input
        id="motivo"
        name="motivo"
        type="text"
        placeholder="Insira o motivo"
      />
      <InputFotos />
      <button type="submit" className="rounded">
        Atualizar
      </button>
    </form>
  );
}