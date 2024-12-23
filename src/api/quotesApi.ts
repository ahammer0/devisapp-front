import {FetchError} from "../helpers/customErrors/FetchError";
import { workCreate, work } from "../types/works";
import { full_quote,quote } from "../types/quotes";

const api = process.env.VITE_API_URL;

if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

function getToken(){
  return localStorage.getItem('token')
}

export async function addQuote(quote:full_quote):Promise<full_quote> {
  const res = await fetch(`${api}/quotes/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(quote),
  });
  if (res.status!==201)
  {
    throw new FetchError(res)
  }
  return res.json();
}

export async function getAllQuotes():Promise<quote[]> {
  const res = await fetch(`${api}/quotes/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status!==200)
  {
    throw new FetchError(res)
  }
  return res.json();
}

export async function getQuote(id:number):Promise<full_quote> {
  const res = await fetch(`${api}/quotes/${id.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status!==200)
  {
    throw new FetchError(res)
  }
  return res.json();
}

export async function editQuote(id:number,quote:Partial<full_quote>):Promise<full_quote> {
  const res = await fetch(`${api}/quotes/${id.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(quote),
  });
  if (res.status!==200)
  {
    throw new FetchError(res)
  }
  return res.json();
}

export async function deleteQuote(id:number):Promise<boolean> {
  const res = await fetch(`${api}/quotes/${id.toString()}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status!==200)
  {
    throw new FetchError(res)
  }
  return res.json();
}
