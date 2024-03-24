'use server'
import { logout } from "@/api/fetch/user";
import { cookies } from "next/headers";

export const decodeToken = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  };

export const checkExp = () => {
  const exp = cookies().get('exp')?.value;

  if (exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = parseInt(exp, 10);

    if (currentTime >= expirationTime) {
      logout();
    }
  }
}
