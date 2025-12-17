"use client"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getReclamacoesUsuario() {
    const response = await fetch(`${apiUrl}/api/usuario/reclamacoes`, {
        method: "GET",
        credentials: "include" as RequestCredentials,
    });
    const data = await response.json();

    return({
        ok: response.ok, 
        status: response.status,
        data: data, 
    });
}

export async function getContestacoesUsuario() {
    const response = await fetch(`${apiUrl}/api/usuario/contestacoes`, {
        method: "GET",
        credentials: "include" as RequestCredentials,
    });
    const data = await response.json();

    return({
        ok: response.ok, 
        status: response.status,
        data: data,
    });
}
