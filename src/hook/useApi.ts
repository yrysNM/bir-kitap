import http from "../utils/axios"
import { useState } from "react"
import { useAppDispatch } from "./useStore"
import { setHasLogin, setLoading, setError } from "../redux/features/mainSlice"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "@ant-design/react-native/lib/toast"

interface UseApiResult<T> {
    res: T | null
    fetchData: (body: unknown) => Promise<T>
}

const useApi = <T>(url: string, method: string = "POST"): UseApiResult<T> => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [res, setRes] = useState<T | null>(null)

    const fetchData = async (body: unknown): Promise<T> => {
        dispatch(setLoading(true))
        return await http(url, {
            data: body,
            method,
        })
            .then((res) => {
                setRes(res.data)
                dispatch(setError(null))
                if (res.data.result_code < 0) {
                    Toast.fail(res.data.result_msg)
                }
                return res.data
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    AsyncStorage.setItem("token", "")
                    dispatch(setHasLogin(false))
                    navigation.navigate("LoginScreen" as never)
                }
                dispatch(setLoading(false))
                dispatch(setError(err))
                Toast.fail(err.message.slice(0, 20))
                setRes(null)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
    return { res, fetchData }
}

export default useApi
