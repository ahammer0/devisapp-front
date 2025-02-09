export type payment = {
  id: number;
  user_id: number;
  company_name: string;
  amount: number;
  date: Date;
};
export type rawPayment = {
  id: number;
  user_id: number;
  company_name: string;
  amount: number;
  date: string;
};

export type paymentCreate = {
  user_id: number;
  amount: number;
};
