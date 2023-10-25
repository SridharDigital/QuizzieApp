import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "./adminSlice"
import quizSlice from "./quizSlice"

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    quiz: quizSlice,
  },
})
