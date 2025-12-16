"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { getIconByStatus } from "@/lib/utils/alerts"
import "@/public/css/form.css";
import Required from "@/components/ui/Inputs/Required";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Inputs/Input";
import Button from "@/components/ui/Button";


export default function FormLogin() {
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [showModal, setShowModal] = useState(true);
  
  if (redirect && showModal) {
    Swal.fire(
      {
        title: "Autenticação Necessária",
        text: "Faça login para acessar essa página",
        icon: "error"
      }
    );
    
    setShowModal(false);
  }
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setAuthState } = useAuth();
  
  async function requisitarLogin(data: {
    email: string;
    password: string;
  }) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const url = `${apiUrl}/api/login`;
    const options = {
      method: "POST",
      credentials: "include" as RequestCredentials,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const json = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data: json
    };
  }
  
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: String(formData.get("email")),
      password: String(formData.get("senha")),
    };

    const response = await requisitarLogin(data);
    if (response.data.message) {
      Swal.fire({
        title:"Login",
        text: response.data.message,
        icon: getIconByStatus(response.status)
      }).then(() => {
        if (response.status === 200) {
          setAuthState(true, response.data.usuario);
          if (redirect) {
            router.push(redirect);
          }
          else {
            router.push("/")
          }
        }
      });
    }
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className=""
      method="post"
    > 
      <div className="flex flex-col gap-2 border-2 border-neutral-200 rounded-xl p-5">
        <label htmlFor="email">Email <Required/></label>
        <Input id="email" name="email" required/>

        <label htmlFor="senha">Senha <Required/></label>
        <Input type="password" id="senha" name="senha" required/>

        <Button disabled={isSubmitting}>
          {
            isSubmitting ? "Entrando..." : "Iniciar sessão"
          }
        </Button>
      </div>
    </form>
  );
}
