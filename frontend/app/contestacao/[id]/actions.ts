export async function getContestacao(id: number) {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${apiUrl}/api/contestacao/${id}`)
    const data = await response.json();

    return({
        ok: response.ok,
        status: response.status,
        data: data
    });
}