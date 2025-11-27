"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "./actions";

export default function Logout() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () =>{
      const response = await logout();
      if (response.status === 200) {
        const result = await response.json();
        setMessage(result.message);
        router.push("/");
      }
      else if (response.status === 401) {
        setMessage("Login é necessário para realizar esta ação");
      }
      else {
        setMessage("Erro ao finalizar sessão");
      }
    })();
  }, [router]);

  return(
    <main>
      { message && <h1>{ message }</h1>}
    </main>
  );
}