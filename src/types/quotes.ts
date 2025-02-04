import { customer, customer_create } from "./customers";
export type quote = {
  id: number;
  user_id: number;
  global_discount: number;
  general_infos: string;
  status: "quote" | "draft" | "invoice" | "validated";
  expires_at: string | Date;
  created_at: string | Date;
};

export type quote_element = {
  id: number;
  quote_id: number;
  work_id: number;
  quote_section: string;
  vat: 20 | 10 | 5.5 | 0;
  discount: number;
  quantity: number;
};
export type quote_element_create = Omit<quote_element, "id" | "quote_id">;

export type quote_media = {
  id: number;
  path_name: string;
  alt_text: string;
  quote_id: number;
};
export type quote_media_create = Omit<quote_media, "id" | "quote_id">;

export type full_quote = quote & {
  quote_elements: quote_element[];
  quote_medias: quote_media[];
  customer: customer | null;
};

export type quote_full_create = Omit<quote, "id" | "user_id" | "created_at"> & {
  quote_elements: quote_element_create[];
  quote_medias: quote_media_create[];
} & (
    | { customer?: customer_create | null; customer_id?: never }
    | { customer_id: customer["id"]; customer?: never }
  );
