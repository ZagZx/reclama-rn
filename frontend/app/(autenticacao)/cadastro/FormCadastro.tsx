"use client";

import "@/public/css/form.css";
import cadastroAction from "./actions";
import Required from "@/components/ui/Inputs/Required";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { getIconByStatus } from "@/lib/utils/alerts";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Inputs/Input";
import Button from "@/components/ui/Button";

export default function CadastroForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      username: String(formData.get("nome")),
      email: String(formData.get("email")),
      password: String(formData.get("senha")),
    };

    const response = await cadastroAction(data);
    
    if (response.data.message) {
      Swal.fire({
        title: "Cadastro",
        text: response.data.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 201) {
          router.push("/login");
        }
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"
    >
      <div className="flex flex-col gap-2 border-2 border-neutral-200 rounded-xl p-5">
        <label htmlFor="nome">Nome <Required/></label>
        <Input id="nome" name="nome" required/>

        <label htmlFor="email">Email <Required/></label>
        <Input type="email" id="email" name="email" required />

        <label htmlFor="senha">Senha <Required/></label>
        <Input type="password" id="senha" name="senha" required />

        <Button
          disabled={isSubmitting}
        >
          {
            isSubmitting ? "Cadastrando..." : "Cadastrar"
          }
        </Button>
      </div>
    </form>
  );
}
