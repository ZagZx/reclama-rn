"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [dados, setDados] = useState<any | null>(null);
  async function getDados() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = `${apiUrl}/api/usuario/contestacoes`;
    const request = await fetch(url, {
      method: "GET",
      credentials: "include" as RequestCredentials,
    });
    return await request.json();
  }

  useEffect(() => {
    setDados(async () => {
      return await getDados();
    });
  });

  return <>{dados}</>;
}
