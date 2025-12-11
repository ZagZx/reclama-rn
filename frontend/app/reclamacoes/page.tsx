import ListaReclamacoes from "@/components/ui/ListaReclamacoes";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${apiUrl}/api/reclamacoes`, 
    { 
      method: "GET" 
    }
  );
  const data = await response.json();

  return (
    <>
      <div className="flex items-center justify-center">
        <Link href="/reclamacao/adicionar">
          <Button content="Adicionar reclamação" />
        </Link>
      </div>
      <ListaReclamacoes reclamacoes={data.reclamacoes} />
    </>
  );
}
