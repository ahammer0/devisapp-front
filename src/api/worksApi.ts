import { FetchError } from "../helpers/customErrors/FetchError";
import { workCreate, work } from "../types/works";

const api = import.meta.env.VITE_API_URL;

if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

function getToken() {
  return localStorage.getItem("token");
}

export async function addWork(work: workCreate): Promise<work> {
  const res = await fetch(`${api}/works/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(work),
  });
  if (res.status !== 201) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function getAllWorks(): Promise<work[]> {
  const res = await fetch(`${api}/works/all`, {
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

export async function getWork(id: number): Promise<work> {
  const res = await fetch(`${api}/works/${id.toString()}`, {
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

export async function editWork(
  id: number,
  work: Partial<workCreate>,
): Promise<work> {
  const res = await fetch(`${api}/works/${id.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(work),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  return res.json();
}

export async function deleteWork(id: number): Promise<boolean> {
  const res = await fetch(`${api}/works/${id.toString()}`, {
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
