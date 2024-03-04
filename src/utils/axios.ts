import axios, { AxiosResponse, AxiosInstance } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ApiResponse<T> {
    data: T
}

let accessToken = ""
AsyncStorage.getItem("token").then((res) => (accessToken = JSON.parse(res || "")))

const instance: AxiosInstance = axios.create({
    baseURL: "http://192.168.1.112:8080",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Authorization: accessToken.length ? `Bearer ${accessToken}` : null,
    },
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error: unknown) => {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
        return response
    },
    (error: unknown) => {
        return Promise.reject(error)
    },
)
export default instance
