import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

interface IState {
    hasLogin: boolean
    isLoading: boolean
    error: AxiosError | null
    isServiceScreen: boolean
    userInfo: { [key: string]: unknown }
}

const initialState: IState = {
    hasLogin: false,
    isLoading: false,
    isServiceScreen: false,
    error: null,
    userInfo: {},
}

export const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        setUserInfo: <T>(state: { userInfo: T }, action: PayloadAction<T>) => {
            state.userInfo = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setHasLogin(state, action: PayloadAction<boolean>) {
            state.hasLogin = action.payload
        },
        setIsServiceScreen(state, action: PayloadAction<boolean>) {
            state.isServiceScreen = action.payload
        },
        setError(state, action: PayloadAction<AxiosError | null>) {
            state.error = action.payload
        },
    },
})

export const { setUserInfo, setLoading, setHasLogin, setError, setIsServiceScreen } = mainSlice.actions

export default mainSlice.reducer
