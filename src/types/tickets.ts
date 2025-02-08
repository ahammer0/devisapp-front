export type ticket = {
  id: number;
  user_id: number;
  status: "open" | "closed";
  created_at: Date;
  object: string;
  text_content: string;
};
export type rawTicket = {
  id: number;
  user_id: number;
  status: "open" | "closed";
  created_at: string;
  object: string;
  text_content: string;
};
export type ticketCreate = {
  object: string;
  text_content: string;
};
export type rawTicketWCompanyName = rawTicket & { company_name: string };
export type ticketWCompanyName = ticket & { company_name: string };
