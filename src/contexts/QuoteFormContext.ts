import React, { createContext } from "react";
import { full_quote, quote_full_create } from "../types/quotes";

type quoteFormContext = [
  quote_full_create | full_quote,
  React.Dispatch<React.SetStateAction<quote_full_create | full_quote>>,
  boolean,
];

const QuoteFormContext = createContext<quoteFormContext | null>(null);

export default QuoteFormContext;
