import axios, { AxiosResponse, AxiosInstance } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ApiResponse<T> {
    data: T
}

let accessToken = ""
AsyncStorage.getItem("token").then((res) => (accessToken = res ? JSON.parse(res) : 'empty-token'))
console.log(accessToken);
const instance: AxiosInstance = axios.create({
    baseURL: "https://api.birkitap.kz/",
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
