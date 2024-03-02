import { configureStore } from "@reduxjs/toolkit"
import userInfoSlice from "./features/userInfoSlice"

const store = configureStore({
    reducer: {
        userInfoSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch