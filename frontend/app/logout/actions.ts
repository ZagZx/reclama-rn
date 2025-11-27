// import { redirect } from "next/navigation";

export async function logout() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const options = {
        method: "POST"
    }
    const response = await fetch(`${apiUrl}/logout`, options);

    return response;
}