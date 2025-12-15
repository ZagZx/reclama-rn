import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Page() {
  return (
    <div className="flex flex-row gap-[20px] justify-center items-center">
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
  );
}
