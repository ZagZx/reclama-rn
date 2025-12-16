"use client";

import { InputFotos } from "@/components/ui/Inputs/InputFotos";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function FormAtualizarReclamacao({ reclamacaoId }: { reclamacaoId: number }) {
  const router =  useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacao/${reclamacaoId}/atualizar`;
    const response = await fetch(url, {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: formData,
    });
    const json = await response.json();

    if (json.message) {
      Swal.fire({
        title:"Atualizar Reclamação",
        text: json.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 200) {
          router.push(`/reclamacao/${reclamacaoId}`)
        }
      });
    }
  }

  return(
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-gray-800 rounded-xl p-2 px-10"
    >
      <label htmlFor="titulo">
        Titulo
      </label>
      <input
        id="titulo"
        name="titulo"
        type="text"
        placeholder="Insira o título"
      />
      <label htmlFor="descricao">
        Descrição
      </label>
      <input
        id="descricao"
        name="descricao"
        type="text"
        placeholder="Insira a descrição"
      />
      <label htmlFor="cidade">
        Cidade
      </label>
      <input
        id="cidade"
        name="cidade"
        type="text"
        placeholder="Insira a cidade"
      />
      <label htmlFor="endereco">Endereço</label>
      <input
        id="endereco"
        name="endereco"
        type="text"
        placeholder="Insira a cidade"
      />
      <label htmlFor="fotos">Fotos</label>
      <InputFotos />
      <button type="submit" className="rounded cursor-pointer">
        Atualizar
      </button>
    </form>
  );
}