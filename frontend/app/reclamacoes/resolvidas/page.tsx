import AdicionarReclamacaoSection from "@/components/ui/AdicionarReclamacaoSection";
import Button from "@/components/ui/Button";
import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import { H1 } from "@/components/ui/titles";
import Link from "next/link";

export default async function Page() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reclamacoes/resolvidas`;

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  return (
    <>
      <AdicionarReclamacaoSection />
      <section className="flex flex-col gap-2 px-20 py-5">
        <H1>Reclamações Resolvidas</H1>
        <div className="flex gap-2">
          <Link href="/reclamacoes">
            <Button>Todas</Button>
          </Link>
          <Link href="/reclamacoes/pendentes">
            <Button>Pendentes</Button>
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
