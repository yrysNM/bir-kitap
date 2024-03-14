import axios, { AxiosResponse, AxiosInstance, AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NavigationService from "../utils/navigation"
interface ApiResponse<T> {
    data: T
}
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token")

        /**
         * @TODO change exception token
         */
        if (!token) {
            console.error("Token not found!!!")
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
        if (error.response && error.response.status === 401) {
            console.log("401 error")
            NavigationService.navigate("LoginScreen" as never)
        }
        return Promise.reject(error)
    },
)
export default instance
