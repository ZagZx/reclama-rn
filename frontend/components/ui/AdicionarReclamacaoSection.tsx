import Link from "next/link";

export default function AdicionarReclamacaoSection() {
  return(
    <section className="bg-green-50 py-20 flex flex-col items-center gap-10">
      <div>
          <h1 className="text-green-900 font-bold text-5xl">Sua voz importa para o RN</h1>
          <p className="text-xl text-green-700">Relate problemas municipais e ajude a melhorar sua cidade </p>
      </div>
      <Link 
          href="/reclamacao/adicionar"
          className="bg-green-500 text-white font-bold text-2xl rounded-full py-4 px-7"
      >
          Fazer uma Reclamação
      </Link>
    </section>
  );
}