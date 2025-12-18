import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { H1 } from "@/components/ui/titles";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${apiUrl}/api/reclamacoes`, {
    method: "GET",
  });
  const data = await response.json();

  return (
    <>
      <AdicionarReclamacaoSection />
      <section className="flex flex-col gap-2 px-20 py-5">
        <H1>Reclamações</H1>
        <div className="flex gap-2">
          <Link href="/reclamacoes/pendentes">
            <Button>Pendentes</Button>
          </Link>
          <Link href="/reclamacoes/resolvidas">
            <Button>Resolvidas</Button>
          </Link>
          <Link href="/reclamacoes/contestadas">
            <Button>Contestadas</Button>
          </Link>
        </div>
        <ListaReclamacoes reclamacoes={data.reclamacoes} />
      </section>
    </>
  );
}
