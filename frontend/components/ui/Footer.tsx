"use client"

import Link from "next/link";

export default function Footer() {  
  
  return (
    <footer className="bg-green-800 flex flex-col justify-between items-center py-5 px-20 text-green-100 gap-5">
      <div className="flex justify-between w-full px-10">
        <div>
          <Link href="/" className="text-3xl font-bold text-white">
            Reclama<span className="text-green-500">RN</span>
          </Link>
          <p>Melhorando o Rio Grande do Norte, uma reclamação de cada vez.</p>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-white">Links Úteis</h1>
          <Link href="/">Início</Link>
          <Link href="/reclamacoes">Reclamações</Link>
        </div>
        <div>
          <h1 className="font-bold text-xl text-white">Contato</h1>
          <Link href="https://github.com/ZagZx/reclama-rn" target="_blank">Github</Link>
        </div>
      </div>
      <div className="bg-green-500 py-px w-full"></div>
      <div>
        © 2025 ReclamaRN. Todos os direitos reservados.
      </div>
    </footer>
  );
}
