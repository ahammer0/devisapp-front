import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import {full_quote} from '../types/quotes'

interface CounterState {
  quotes: full_quote[]
}

const initialState: CounterState = {
  quotes: []
}

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state,action:PayloadAction<full_quote[]>) => {
      state.quotes = action.payload
    },
    resetQuotes: state => {
      state.quotes = initialState.quotes
    }
  }
})

export const { setQuotes, resetQuotes } = quotesSlice.actions

export const selectCount = (state: RootState) => state.quotes.quotes

export default quotesSlice.reducer
