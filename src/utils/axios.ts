import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios"
// import SyncStorage from "sync-storage"
interface ApiResponse<T> {
    data: T
}

const accessToken = ""

const instance: AxiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Authorization: accessToken.length ? `Bearer ${accessToken}` : null,
    },
})

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        console.log(config)
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
