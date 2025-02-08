import { FetchError } from "../helpers/customErrors/FetchError";
import { ticketCreate, ticket, rawTicket } from "../types/tickets";

const api = import.meta.env.VITE_API_URL;

if (!api) {
  throw new Error("VITE_API_URL is not defined");
}

function getToken() {
  return localStorage.getItem("token");
}
export async function getAllTickets() {
  const token = getToken();
  const response = await fetch(`${api}/tickets/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new FetchError(response);
  }
  const rawTickets = await response.json();
  const tickets: ticket[] = rawTickets.map((rawTicket: rawTicket) => {
    return {
      ...rawTicket,
      created_at: new Date(rawTicket.created_at.split(".")[0]),
    };
  });
  return tickets;
}
export async function getOneTicket(id: number) {
  const token = getToken();
  const response = await fetch(`${api}/tickets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new FetchError(response);
  }
  const rawTicket = await response.json();
  const ticket: ticket = {
    ...rawTicket,
    created_at: new Date(rawTicket.created_at.split(".")[0]),
  };
  return ticket;
}
export async function createTicket(ticket: ticketCreate) {
  const token = getToken();
  const response = await fetch(`${api}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ticket),
  });
  if (response.status !== 201) {
    throw new FetchError(response);
  }
}
export async function deleteTicket(ticketId: number) {
  const token = getToken();
  const response = await fetch(`${api}/tickets/${ticketId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new FetchError(response);
  }
}
