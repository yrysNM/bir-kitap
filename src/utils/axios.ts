import axios, { AxiosResponse, AxiosInstance, AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { API_URL } from "@env";
interface ApiResponse<T> {
    data: T
}

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
         console.log(error);
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
        return response
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)
export default instance
