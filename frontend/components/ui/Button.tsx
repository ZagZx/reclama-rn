import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  styles?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  styles,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      p-2 px-5 
      bg-green-500
      text-white 
      rounded-lg
      hover:bg-green-800
      duration-200
      ${styles}
      `}
    >
      {children}
    </button>
  );
}
