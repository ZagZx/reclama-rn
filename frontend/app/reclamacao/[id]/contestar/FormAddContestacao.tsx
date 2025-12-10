"use client";

import { InputFotos } from "@/components/ui/InputFotos";
import Required from "@/components/ui/Required";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function FormAddContestacao({ reclamacaoId }: { reclamacaoId: number }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);


    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${apiUrl}/api/reclamacao/${reclamacaoId}/contestar`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });

    const json = await response.json();
  
    if (json.message) {
      Swal.fire({
        title:"Contestar Reclamação",
        text: json.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 201) {
          router.push(`/reclamacao/${reclamacaoId}`)
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
    >
      <label htmlFor="motivo">
        Motivo<Required />
      </label>
      <input
        required
        id="motivo"
        name="motivo"
        type="text"
        placeholder="Insira o motivo"
      />
      <InputFotos />
      <button type="submit" className="rounded">
        Adicionar
      </button>
    </form>
  );
}