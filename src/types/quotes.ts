import { customer, customer_create } from "./customers";
export interface quote {
  id: number;
  user_id: number;
  global_discount: number;
  general_infos: string;
  status: "quote" | "draft" | "invoice" | "validated";
  expires_at: string | Date;
  created_at: string | Date;
}

export interface quote_element {
  id: number;
  quote_id: number;
  work_id: number;
  quote_section: string;
  vat: 20 | 10 | 5.5 | 0;
  discount: number;
  quantity: number;
}
export interface quote_element_create {
  id?: number;
  quote_id?: number;
  work_id: number;
  quote_section: string;
  vat: 20 | 10 | 5.5 | 0;
  discount: number;
  quantity: number;
}

export interface quote_media {
  id: number;
  path_name: string;
  alt_text: string;
  quote_id: number;
}
export interface quote_media_create {
  id?: number;
  path_name: string;
  alt_text: string;
  quote_id?: number;
}

export interface full_quote extends quote {
  quote_elements: quote_element[];
  quote_medias: quote_media[];
  customer: customer | null;
}

export interface quote_full_create {
  global_discount: number;
  general_infos: string;
  status: "quote" | "draft" | "invoice" | "validated";
  expires_at: string | Date;

  id?: number;
  user_id?: number;
  created_at?: Date;
  quote_medias: quote_media[];
  customer?: customer_create;
  customer_id?: customer["id"];
}
