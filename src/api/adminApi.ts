import { FetchError } from "../helpers/customErrors/FetchError";
import { store } from "../redux/store";
import { payment } from "../types/payments";
import { user } from "../types/users";

const api = import.meta.env.VITE_API_URL;

if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

function getToken() {
  const userToken = store.getState().user.token;
  if (!userToken) {
    throw new Error("Token not found in store");
  }
  return userToken;
}

export async function adminLogin(adminKey: string): Promise<{ token: string }> {
  const res = await fetch(`${api}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key: adminKey }),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function getAllUsers(): Promise<user[]> {
  const res = await fetch(`${api}/users/all`, {
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

export async function getOneUser(id: number): Promise<user> {
  const res = await fetch(`${api}/users/${id.toString()}`, {
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

export async function editUser(id: number, user: Partial<user>): Promise<user> {
  const res = await fetch(`${api}/users/${id.toString()}`, {
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

export async function deleteUser(id: number): Promise<{ message: string }> {
  const res = await fetch(`${api}/users/${id.toString()}`, {
    method: "DELETE",
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

export async function getAllPayments(): Promise<payment[]> {
  const res = await fetch(`${api}/payments/all`, {
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
