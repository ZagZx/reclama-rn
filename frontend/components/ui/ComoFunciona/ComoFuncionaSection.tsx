import Link from "next/link";
import ComoFuncionaPasso from "./ComoFuncionaPasso";

export default function ComoFuncionaSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-green-800 mb-16">
          Como Funciona?
        </h2>

        <div className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-8
        ">
          <ComoFuncionaPasso
            numero="1"
            titulo="Registre"
            descricao="Descreva o problema e sua localização"
          />

          <ComoFuncionaPasso
            numero="2"
            titulo="Acompanhe"
            descricao="Receba atualizações sobre o andamento"
          />

          <ComoFuncionaPasso
            numero="3"
            titulo="Resolução"
            descricao="Órgão responsável toma providências"
          />

          <ComoFuncionaPasso
            check={true}
            titulo="Concluído"
            descricao="Problema resolvido e comunidade feliz!"
          />
        </div>

        <div className="mt-16">
          <Link 
            href="/cadastro"
            className="
              bg-green-500 
              rounded-full 
              py-4 px-7 
              text-white text-2xl font-bold
            "
          >
            Cadastre-se - É grátis!
          </Link>
        </div>
      </div>
    </section>
  );
}
