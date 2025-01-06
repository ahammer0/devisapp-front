import React, { createContext } from "react";
import { quote_full_create } from "../types/quotes";

type quoteFormContext = [
  quote_full_create,
  React.Dispatch<React.SetStateAction<quote_full_create>>,
];

const QuoteFormContext = createContext<quoteFormContext | null>(null);

export default QuoteFormContext;
