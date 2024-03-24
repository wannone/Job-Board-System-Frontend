'use server'
import { cookies } from "next/headers";

export async function getRole() : Promise<string | undefined> {
    const dataString = cookies().get('data')?.value;
    const data = dataString ? JSON.parse(dataString) : null;
    const role = data?.role;
    return role;
}

