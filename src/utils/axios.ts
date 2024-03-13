import axios, { AxiosResponse, AxiosInstance } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ApiResponse<T> {
    data: T
}
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token")

        /**
         * @TODO change exception token 
         */
        if(!token) {
            console.error("Token not found!!!")
            return "";
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
        const {token} = await getToken()

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

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
