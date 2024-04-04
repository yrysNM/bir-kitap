import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { IUserInfo } from "../../api/authApi"
import { categoryInfo } from "../../api/bookApi"

interface IState {
    hasLogin: boolean
    isLoading: boolean
    error: AxiosError | null
    isRefresh: boolean
    userInfo: IUserInfo
    categoryList: categoryInfo[]
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
    categoryList: [],
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
        setCategoryList(state, action: PayloadAction<categoryInfo[]>) {
            state.categoryList = action.payload
        },
    },
})

export const { setUserInfo, setLoading, setHasLogin, setError, setRefresh, setCategoryList } = mainSlice.actions

export default mainSlice.reducer
