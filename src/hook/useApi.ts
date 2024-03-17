import http from "../utils/axios"
import { useState } from "react"
import { useAppDispatch } from "./useStore"
import { setHasLogin, setLoading, setError } from "../redux/features/mainSlice"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface UseApiResult<T> {
    res: T | null
    fetchData: (body: unknown) => Promise<T>
}

const useApi = <T>(url: string, method: string): UseApiResult<T> => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [res, setRes] = useState<T | null>(null)

    const fetchData = async (body?: unknown): Promise<T> => {
        dispatch(setLoading(true))
        return await http(url, {
            data: body,
            method,
        })
            .then((res) => {
                setRes(res.data)
                dispatch(setError(null))
                return res.data
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    console.log("401 error")
                    AsyncStorage.setItem("token", "")
                    dispatch(setHasLogin(false))
                    navigation.navigate("LoginScreen" as never)
                }
                dispatch(setLoading(false))
                dispatch(setError(err))
                setRes(null)
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
    return { res, fetchData }
}

export default useApi
