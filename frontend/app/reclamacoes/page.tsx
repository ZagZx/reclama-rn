import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${apiUrl}/api/reclamacoes`, {
    method: "GET",
  });
  const data = await response.json();

  return (
    <>
      <AdicionarReclamacaoSection />
      <div className="flex gap-3 justify-center pt-5">
        <Link href="/reclamacoes/contestadas">
          <Button>Contestadas</Button>
        </Link>
        <Link href="/reclamacoes/resolvidas">
          <Button>Resolvidas</Button>
        </Link>
        <Link href="/reclamacoes/pendentes">
          <Button>Pendentes</Button>
        </Link>
      </div>
      <ListaReclamacoes reclamacoes={data.reclamacoes} />
    </>
  );
}
