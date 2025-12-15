import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${apiUrl}/api/reclamacoes`, {
    method: "GET",
  });
  const data = await response.json();

  return (
    <>
      <AdicionarReclamacaoSection />
      <ListaReclamacoes reclamacoes={data.reclamacoes} />
    </>
  );
}
