"use client";

import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import { H1 } from "@/components/ui/titles";

export default function FormAtualizarContestacao({ contestacao, contestacaoId }: {contestacao?: any, contestacaoId: number}) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    // Only send the motivo field
    const motivo = (form.querySelector("[name=motivo]") as HTMLInputElement).value;
    const formData = new FormData();
    formData.append("motivo", motivo);

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${apiUrl}/api/contestacao/${contestacaoId}/atualizar`, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });

    const json = await response.json();

    if (json.message) {
      Swal.fire({
        title: "Atualizar Contestação",
        text: json.message,
        icon: getIconByStatus(response.status),
      }).then(() => {
        if (response.status === 200) {
          router.push(`/usuario/contestacoes`);
        }
      });
    }
    return {
      ok: response.ok,
      status: response.status,
      data: json,
    };
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white rounded-xl p-6 border-2 border-neutral-200 text-gray-700"
      method="POST"
    >
      <H1>Atualizar Contestação</H1>

      <div className="flex flex-col gap-1">
        <label htmlFor="motivo" className="text-sm font-medium">Motivo</label>
        <input
          id="motivo"
          name="motivo"
          type="text"
          placeholder="Insira o motivo"
          defaultValue={contestacao?.motivo ?? ''}
          className="border border-neutral-200 rounded-md p-2"
          required
        />
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <button type="button" onClick={() => router.back()} className="w-1/2 rounded-full border border-neutral-300 py-2 text-neutral-700">Cancelar</button>
        <button type="submit" className="rounded-full bg-green-600 text-white py-2 w-1/2">Salvar Alterações</button>
      </div>
    </form>
  );
}