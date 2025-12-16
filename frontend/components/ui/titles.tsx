import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }) {
  return(
    <h1 className="text-2xl font-bold text-green-800">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return(
    <h2 className="text-xl font-bold text-green-800">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return(
    <h3 className="text-lg font-bold text-green-800">
      {children}
    </h3>
  );
}