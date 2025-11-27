import Link from "next/link";


export default function Header() {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <header>
      <Link href="/">Início</Link>
      <Link href="/login">Login</Link>
      <Link href="/cadastro">Cadastro</Link>
      <Link href="/logout">Sair</Link>
    </header>
  );
}