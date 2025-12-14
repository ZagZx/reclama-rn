"use client"

import Link from "next/link";
import LinkHeader from "./LinkHeader";
import { useAuth } from "@/context/AuthContext";


export default function Header() {  
  const { autenticado, usuario } = useAuth();
  
  return (
    <header className="bg-green-500 flex justify-between items-center py-5 px-20 text-white">
      <nav>
        <Link href="/" className="text-3xl font-bold">
          Reclama<span className="text-green-800">RN</span>
        </Link>
      </nav>
      <nav className="flex gap-3 items-center">
        <LinkHeader href="/">
          Início
        </LinkHeader>
        <LinkHeader href="/reclamacoes">
          Reclamações
        </LinkHeader>
      </nav>
      <nav className="flex gap-3 items-center">
        { autenticado ?
          <>
            <LinkHeader href="/usuario">
              Usuário
            </LinkHeader>
            <LinkHeader href="/logout">
              Sair
            </LinkHeader>
          </>
          :   
          <>
            <LinkHeader href="/cadastro">
              Cadastro
            </LinkHeader>
            <LinkHeader href="/login">
              Login
            </LinkHeader>
          </>
        }
      </nav>
    </header>
  );
}
