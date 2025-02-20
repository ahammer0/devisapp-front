import { FetchError } from "../helpers/customErrors/FetchError";
import { store } from "../redux/store";
import { payment, rawPayment } from "../types/payments";
import { rawUser, user } from "../types/users";
import { rawTicketWCompanyName, ticketWCompanyName } from "../types/tickets";

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

export async function getAllUsers() {
  const res = await fetch(`${api}/admin/users/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  const rawUsers: rawUser[] = await res.json();
  const users: user[] = rawUsers.map((user) => {
    return {
      ...user,
      expires_at: new Date(user.expires_at.split(".")[0]),
      created_at: new Date(user.created_at.split(".")[0]),
    };
  });
  return users;
}

export async function getOneUser(id: number) {
  const res = await fetch(`${api}/admin/users/${id.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  const rawUser: rawUser = await res.json();
  const user: user = {
    ...rawUser,
    expires_at: new Date(rawUser.expires_at.split(".")[0]),
    created_at: new Date(rawUser.created_at.split(".")[0]),
  };
  return user;
}

export async function editUser(id: number, user: Partial<user>): Promise<user> {
  const res = await fetch(`${api}/admin/users/${id.toString()}`, {
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
  const res = await fetch(`${api}/admin/users/${id.toString()}`, {
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

export async function getAllPayments() {
  const res = await fetch(`${api}/admin/payments/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  const rawPayments: rawPayment[] = await res.json();
  const payments: payment[] = rawPayments.map((payment: rawPayment) => {
    return {
      ...payment,
      date: new Date(payment.date.split(".")[0]),
    };
  });
  return payments;
}
export async function getOpenedTickets() {
  const res = await fetch(`${api}/admin/tickets/all-opened`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
  const rawTickets = await res.json();
  const tickets: ticketWCompanyName[] = rawTickets.map(
    (ticket: rawTicketWCompanyName) => {
      return {
        ...ticket,
        created_at: new Date(ticket.created_at.split(".")[0]),
      };
    },
  );

  return tickets;
}
export async function closeTicket(id: number) {
  const res = await fetch(`${api}/admin/tickets/close/${id.toString()}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
}
export async function getOneTicket(id: number) {
  const token = getToken();
  const response = await fetch(`${api}/admin/tickets/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new FetchError(response);
  }
  const rawTicket = await response.json();
  const ticket: ticketWCompanyName = {
    ...rawTicket,
    created_at: new Date(rawTicket.created_at.split(".")[0]),
  };
  return ticket;
}
export async function respondTicket(id: number, text: string) {
  const res = await fetch(`${api}/admin/tickets/response/${id.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ response: text }),
  });
  if (res.status !== 200) {
    throw new FetchError(res);
  }
}
