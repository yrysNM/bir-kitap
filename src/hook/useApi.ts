import http from "../utils/axios"
import { useState } from "react"
import { useAppDispatch } from "./useStore"
import { logOut as logOutHelper } from "../helpers/logOut"
import Toast from "@ant-design/react-native/lib/toast"
import { AxiosHeaders } from "axios"
import { setLoading, setError } from "../redux/features/mainSlice"

interface UseApiResult<T> {
    res: T | null
    fetchData: (body: unknown, headers?: AxiosHeaders) => Promise<T>
}

const useApi = <T>(url: string, method: string = "POST"): UseApiResult<T> => {
    const dispatch = useAppDispatch()
    const [res, setRes] = useState<T | null>(null)
    const logOut = logOutHelper()

    const fetchData = async (body: unknown, headers?: AxiosHeaders): Promise<T> => {
        dispatch(setLoading(true))
        return await http(url, {
            headers,
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
                if (err.message === "refresh token faild") {
                    logOut()
                    return
                }
                dispatch(setLoading(false))
                dispatch(setError(err))
                Toast.fail(err.response.data?.result_msg.slice(0, 20))
                setRes(null)
                return {
                    result_code: -1,
                    result_msg: err.message,
                }
            })
            .finally(() => {
                dispatch(setLoading(false))
            })
    }
    return { res, fetchData }
}

export default useApi
