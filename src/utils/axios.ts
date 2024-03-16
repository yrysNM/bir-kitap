import axios, { AxiosResponse, AxiosInstance, AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
interface ApiResponse<T> {
    data: T
}
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token")

        if (!token) {
            console.log("Token not found!!!")
            return ""
        }

        return JSON.parse(token)
    } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error)
        return null
    }
}

const instance: AxiosInstance = axios.create({
    baseURL: "https://api.birkitap.kz/",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
})

instance.interceptors.request.use(
    async (config) => {
        const { token } = await getToken()

        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error: AxiosError) => {
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
