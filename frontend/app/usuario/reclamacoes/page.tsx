"use client"

import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import { useEffect, useState } from "react";
import { getReclamacoesUsuario } from "../actions";
import { Reclamacao } from "@/types";
import { H1 } from "@/components/ui/titles";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[] | null>(null);


  useEffect(()=>
    {
      (async ()=>{
        const response = await getReclamacoesUsuario(); 
        const data = response.data;
        setReclamacoes(data.reclamacoes);
      })();
    }, []
  )

  if (!reclamacoes) {
    return <></>;
  }
  if (reclamacoes.length === 0) {
    Swal.fire({
      title: "Minhas Reclamações",
      text: "Você não possui reclamações cadastradas",
      icon: "info",
    }).then(()=>{router.push("/")});
  }
  else {
    return(
      <section className="px-20 py-5">
        <H1>Minhas Reclamações</H1>
        <ListaReclamacoes reclamacoes={reclamacoes} />
      </section>
    );
  }
}
