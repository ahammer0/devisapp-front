import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { work } from '../types/works'

interface WorksState {
  works: work[]
}

const initialState: WorksState = {
  works: []
}

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setWorks: (state,action:PayloadAction<work[]>) => {
      state.works = action.payload
    },
    resetWorks: state => {
      state.works = initialState.works
    }
  }
})

export const { setWorks, resetWorks } = worksSlice.actions

export const selectWorks = (state: RootState) => state.works.works

export default worksSlice.reducer
