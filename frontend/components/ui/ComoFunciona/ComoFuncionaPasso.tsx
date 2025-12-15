import { Check } from "lucide-react";

interface Props {
  numero?: string;
  check?: boolean;
  titulo: string;
  descricao: string;
}

export default function ComoFuncionaPasso({
  numero,
  check,
  titulo,
  descricao,
}: Props) {
  return (
    <div className="flex flex-col items-center max-w-[200px]">
      <div className="
        w-20 h-20
        rounded-full
        bg-green-500
        text-white
        flex items-center justify-center
        text-2xl font-bold
        mb-3
      ">
        {check ? 
          <Check size={32} />
          : numero
        }
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-800">
          {titulo}
        </h3>

        <p className=" text-gray-600 mt-1">
          {descricao}
        </p>
      </div>
    </div>
  );
}