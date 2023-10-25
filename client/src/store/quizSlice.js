import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isCreateQuizOpen: false,
}

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    openCreateQuizPopup: (state) => {
      state.isCreateQuizOpen = true
    },
    closeCreateQuizPopup: (state) => {
      state.isCreateQuizOpen = false
    },
  },
})

export const { openCreateQuizPopup, closeCreateQuizPopup } = quizSlice.actions

export default quizSlice.reducer
