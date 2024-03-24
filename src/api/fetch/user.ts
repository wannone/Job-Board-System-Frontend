'use server'
import { cookies } from "next/headers";
import { UserAuth } from "../model/user";
import { decodeToken } from "../../utils/tokenSetting";

export const login = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5001/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (response.ok) {
    const data: UserAuth = await response.json();
    cookies().set('token', data.token)
    
    const exp = decodeToken(data.token).exp;
    cookies().set('exp', exp);
    
    cookies().set('data', JSON.stringify(data.data))

  } else {
    if (response.status === 401) 
      throw new Error("Invalid username or password");
    throw new Error("Failed to login");
  }
}

export const logout = async () => {
  cookies().delete('token');
  cookies().delete('exp');
  cookies().delete('data');
}

export const registerApplicant = async (formData: FormData) => {
  const user = {
    name: formData.get('full-name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await fetch("http://localhost:5001/api/user/register/applicant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  });
  if (response.ok) {
    const data: UserAuth = await response.json();
    cookies().set('token', data.token)
    cookies().set('data', JSON.stringify(data.data))
  } else {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to register");
  }
}
export const registerRecruiter = async (formData: FormData) => {
  const user = {
    name: formData.get('full-name'),
    company: formData.get('company'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const response = await fetch("http://localhost:5001/api/user/register/recruiter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: user.name,
      company: user.company,
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  });
  if (response.ok) {
    const data: UserAuth = await response.json();
    cookies().set('token', data.token)
    cookies().set('data', JSON.stringify(data.data))
  } else {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to register");
  }
}