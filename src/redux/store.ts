import { configureStore } from "@reduxjs/toolkit"
import mainSlice from "./features/mainSlice"

const store = configureStore({
    reducer: {
        mainSlice,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
