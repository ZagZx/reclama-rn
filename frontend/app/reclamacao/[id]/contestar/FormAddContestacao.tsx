"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Inputs/Input";
import { InputFotos } from "@/components/ui/Inputs/InputFotos";
import Required from "@/components/ui/Inputs/Required";
import TextArea from "@/components/ui/Inputs/TextArea";
import { H2 } from "@/components/ui/titles";
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
      method="post"
    >
      <div 
        className="
          flex flex-col 
          border-2 border-neutral-200 rounded-xl 
          gap-2 
          p-5"
        >
        <label htmlFor="motivo">
          Motivo<Required />
        </label>
        <TextArea 
          required
          id="motivo"
          name="motivo"
          placeholder="Insira o motivo"
          rows={6}
        />
        <InputFotos />
        <Button>
          Adicionar
        </Button>
      </div>
    </form>
  );
}