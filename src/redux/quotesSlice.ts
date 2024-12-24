import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { full_quote } from "../types/quotes";

interface QuotesState {
  quotes: full_quote[];
}

const initialState: QuotesState = {
  quotes: [],
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setQuotes: (state, action: PayloadAction<full_quote[]>) => {
      state.quotes = action.payload;
    },
    resetQuotes: (state) => {
      state.quotes = initialState.quotes;
    },
  },
});

export const { setQuotes, resetQuotes } = quotesSlice.actions;

export const selectQuotes = (state: RootState) => state.quotes.quotes;

export default quotesSlice.reducer;
