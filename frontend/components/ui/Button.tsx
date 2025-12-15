import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
}

export default function Button({ children, onClick, disabled = false }: ButtonProps) {
  return(
    <button 
      onClick={onClick}
      disabled={disabled}
    className="
      mt-4
      p-2 px-5 
      bg-green-500
      text-white 
      rounded-lg
      "
    >
      {children}
    </button>
  ); 
}
