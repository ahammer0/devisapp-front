import { userCreate, user } from "../types/users";
import { FetchError } from "../helpers/customErrors/FetchError";

const api = process.env.VITE_API_URL;
if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

function getToken(){
  return localStorage.getItem('token')
}

export async function registerUser(user: userCreate): Promise<user> {
  const res = await fetch(`${api}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (res.status !== 201) {
    throw new FetchError(res);
  }
  return res.json();
}
export async function loginUser(
  email: string,
  password: string
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
export async function editUser(user:Partial<userCreate>):Promise<user>{
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
