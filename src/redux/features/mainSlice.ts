import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { IUserInfo } from "../../api/authApi"

interface IState {
    hasLogin: boolean
    isLoading: boolean
    error: AxiosError | null
    isRefresh: boolean
    userInfo: IUserInfo
}

const initialState: IState = {
    hasLogin: false,
    isLoading: false,
    error: null,
    isRefresh: false,
    userInfo: {
        email: "",
        fullName: "",
        phone: "",
        password: "",
        birth: new Date(),
        gender: "",
    },
}

export const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.userInfo = action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setHasLogin(state, action: PayloadAction<boolean>) {
            state.hasLogin = action.payload
        },
        setError(state, action: PayloadAction<AxiosError | null>) {
            state.error = action.payload
        },
        setRefresh(state, action: PayloadAction<boolean>) {
            state.isRefresh = action.payload
        },
    },
})

export const { setUserInfo, setLoading, setHasLogin, setError, setRefresh } = mainSlice.actions

export default mainSlice.reducer
