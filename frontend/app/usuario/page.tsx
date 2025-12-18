"use client"

import Link from "next/link";
import Button from "@/components/ui/Button";
import { H1 } from "@/components/ui/titles";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const {usuario} = useAuth();

  return (
    <section className="flex flex-col flex-1 gap-10 items-center px-20 py-5">
      <H1>Olá, {usuario?.nome}</H1>
      <div className="flex gap-2">
        <Link href="/usuario/contestacoes">
          <Button>
            Minhas contestações  
          </Button>
        </Link>
        <Link href="/usuario/reclamacoes">
          <Button>
            Minhas reclamações
          </Button>
        </Link>
      </div>
    </section>
  );
}
