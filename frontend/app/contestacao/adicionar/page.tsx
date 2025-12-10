"use client";

import Required from "@/components/ui/Required";
import "@/public/css/form.css";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { InputFotos } from "@/components/ui/InputFotos";

export default function Page() {
  const router = useRouter();

  const pPesquisa = useSearchParams();
  const id = Number(pPesquisa.get("id")); // id da reclamação

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacao/${id}/contestar`;
    const response = await fetch(url, {
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
          router.push(`/reclamacao/${id}`)
        }
      });
    }
    return {
      ok: response.ok,
      status: response.status,
      data: json
    };

  }

  return (
    <main className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-gray-800 rounded-xl p-2 px-10"
      >
        <label htmlFor="motivo">
          Motivo<Required/>
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
    </main>
  );
}
