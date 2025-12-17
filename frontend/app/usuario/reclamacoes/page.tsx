"use client";

import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";
import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import { useEffect, useState } from "react";
import { getReclamacoesUsuario } from "../actions";
import { Reclamacao } from "@/types";

export default function Page() {
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[] | null>(null);


  useEffect(()=>{(
    async ()=>{
      const response = await getReclamacoesUsuario(); 
      const data = response.data
      setReclamacoes(data.reclamacoes);
    }
    )();
  }, [])

  
  if (reclamacoes) {
    return(
      <>
        <AdicionarReclamacaoSection />
        <ListaReclamacoes reclamacoes={reclamacoes} />
      </>
    );
  }
  return(
    <>
      <AdicionarReclamacaoSection />
    </>
  );
}
