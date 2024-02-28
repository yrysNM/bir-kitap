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

const useApi = <T>(url: string, method?: "get", body: unknown): UseApiResult<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError<unknown> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = () => {
        setIsLoading(true)
        if (method === "get") {
            http.get<APIResponse<T>>(url)
                .then((response: AxiosResponse<APIResponse<T>>) => {
                    setData(response.data.data)
                    setError(null)
                })
                .catch((err: AxiosError<unknown>) => {
                    setError(err)
                    setData(null)
                })
                .finally(() => {
                    setIsLoading(true)
                })
        } else if (method === "post") {
            http.post(url, body)
                .then((response: AxiosResponse<APIResponse<T>>) => {
                    setData(response.data.data)
                    setError(null)
                })
                .catch((err: AxiosError<unknown>) => {
                    setError(err)
                    setData(null)
                })
                .finally(() => {
                    setIsLoading(true)
                })
        }
    }
    return { data, error, isLoading, fetchData }
}

export default useApi
