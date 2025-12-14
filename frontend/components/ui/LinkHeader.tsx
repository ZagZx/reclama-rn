import Link from "next/link";
import { ReactNode } from "react";

interface LinkHeaderProps {
  href: string,
  children: ReactNode
};

export default function LinkHeader({href, children}:LinkHeaderProps) {
  return(
    <Link href={href} className="text-lg hover:text-green-800">
      {children}
    </Link>
  );
}