import Link from "next/link";


export default function Header() {
  return (
    <header>
      <Link href="/login">Login</Link>
      <Link href="">Cadastro</Link>
      <Link href="">Sair</Link>
    </header>
  );
}