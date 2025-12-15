import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";
import ListaReclamacoes from "@/components/ui/ListaReclamacoes";

export default async function Page() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacoes/pendentes`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();

  return (
    <>
      <AdicionarReclamacaoSection />
      <ListaReclamacoes reclamacoes={data.reclamacoes}/>
    </>

  );
}
