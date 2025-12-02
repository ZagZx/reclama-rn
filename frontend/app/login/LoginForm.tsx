"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginAction from "./actions";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: String(formData.get("email")),
      password: String(formData.get("senha")),
    };

    const result = await loginAction(data);
    if (result) {
      setError(result);
    }
    setIsSubmitting(false);

    router.push("/");
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />

      <label htmlFor="senha">Senha</label>
      <input type="password" id="senha" name="senha" required />

      <button type="submit" disabled={isSubmitting}>
        {
          isSubmitting ? "Entrando..." : "Iniciar sessão"
          // OPERADOR TERNÁRIO
          // condição ? True : False

          // se a variavel for true, retorna Entrando..., se for false, retorna iniciar sessão
        }
      </button>
      {
        error && <p>{error}</p>
        // SHORT-CIRCUIT
        // retorna <p>{error}</p>, CASO error não seja um Falsy Value
        // Falsy Value: "", 0, false, null, undefined, NaN 

        // se erro existe, renderiza o <p>, se não existe, nada é renderizado
        }
    </form>
  );
}