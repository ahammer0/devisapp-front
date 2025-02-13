import { userCreate, user, addCreditRequestBody } from "../types/users";
import { FetchError } from "../helpers/customErrors/FetchError";
import { InputError } from "../helpers/inputValidators";

const api = import.meta.env.VITE_API_URL;
if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

export function getToken() {
  return localStorage.getItem("token");
}

export async function registerUser(
  user: Partial<userCreate> & {
    email: userCreate["email"];
    password: userCreate["password"];
    captcha: string;
    captchaToken: string;
  },
): Promise<user> {
  const res = await fetch(`${api}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const resp = await res.json();
  if (resp.message === "Invalid Captcha")
    throw new InputError("Le captcha entré est invalide");
  if (res.status !== 201) {
    throw new FetchError(res);
  }
  return resp;
}
export async function loginUser(
  email: string,
  password: string,
): Promise<{ user: user; token: string }> {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function editUser(user: Partial<userCreate>): Promise<user> {
  const res = await fetch(`${api}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(user),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function checkToken(): Promise<{
  role: "user" | "admin";
  userInfos: user;
}> {
  const res = await fetch(`${api}/checkToken`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}
export async function deleteUser() {
  const res = await fetch(`${api}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function addCredit(
  plan: addCreditRequestBody["plan"],
): Promise<user> {
  const res = await fetch(`${api}/addCredit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ plan }),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}
export interface captchaResponse {
  captcha: string; //svg element
  token: string;
}
export async function getCaptcha(): Promise<captchaResponse> {
  const res = await fetch(`${api}/captcha`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}
