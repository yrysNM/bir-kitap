import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios"

interface ApiResponse<T> {
    data: T
}

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
})

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
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
