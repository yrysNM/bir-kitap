import axios, { AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "@env"
interface ApiResponse<T> {
    data: T
}

let isRefreshing = false
let refreshSubscribers: ((accessToken: string) => void)[] = []

const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token").then((value) => (value ? JSON.parse(value).token : null))
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error: AxiosError) => {
        console.log(error)
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
        return response
    },
    async (error: AxiosError) => {
        const { config, response } = error
        const originalRequest = config as AxiosRequestConfig & { _retry?: boolean }

        if (response?.status === 401) {
            // isRefreshing = false
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    const newAccessToken = await refreshAccessToken()
                    isRefreshing = false
                    onAccessTokenRefreshed(newAccessToken)
                    return instance(originalRequest)
                } catch (refreshError) {
                    // console.error("Token refresh failed:", refreshError)
                    return Promise.reject(refreshError)
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((newAccessToken) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    }
                    resolve(instance(originalRequest))
                })
            })
        }
        return Promise.reject(error)
    },
)

export async function refreshAccessToken(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem("token").then((value) => {
        if (value) {
            return JSON.parse(value).refreshToken
        } else {
            return null
        }
    })
    alert(refreshToken)
    return axios
        .post(`${API_URL}auth/refresh/token`, {
            refreshToken,
        })
        .then((res) => {
            if (res.data?.result_code === 0) {
                AsyncStorage.setItem("token", JSON.stringify(res.data.data))
                return res.data.data.token
            } else {
                // console.error("Somethinh went wrong")
                throw Error("refresh token faild")
            }
        })
}

function onAccessTokenRefreshed(newAccessToken: string) {
    refreshSubscribers.forEach((callback) => callback(newAccessToken))
    refreshSubscribers = []
}

function subscribeTokenRefresh(callback: (accessToken: string) => void) {
    refreshSubscribers.push(callback)
}

export default instance
