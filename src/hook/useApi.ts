import { AxiosError, AxiosResponse } from "axios"
import http from "../utils/axios"
import { useState } from "react"

interface APIResponse<T> {
    data: T
}

interface UseApiResult<T> {
    data: T | null
    error: AxiosError<unknown> | null
    isLoading: boolean
    fetchData: () => void
}

const useApi = <T>(url: string, method: string, body: unknown): UseApiResult<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError<unknown> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = () => {
        setIsLoading(true)
        http(url, {
            data: body,
            method,
        })
            .then((res: AxiosResponse<APIResponse<T>>) => {
                setData(res.data.data)
                setError(null)
            })
            .catch((err) => {
                setError(err)
                setData(null)
            })
            .finally(() => {
                setIsLoading(true)
            })
    }
    return { data, error, isLoading, fetchData }
}

export default useApi
