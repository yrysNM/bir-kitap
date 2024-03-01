import { AxiosError } from "axios"
import http from "../utils/axios"
import { useState } from "react"

interface UseApiResult<T> {
    data: T | null
    error: AxiosError<unknown> | null
    isLoading: boolean
    fetchData: (body: unknown) => void
}

const useApi = <T>(url: string, method: string): UseApiResult<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError<unknown> | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = async (body?: unknown) => {
        setIsLoading(true)
        await http(url, {
            data: body,
            method,
        })
            .then((res) => {
                setData(res.data)
                setError(null)
            })
            .catch((err) => {
                setError(err)
                setData(null)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    return { data, error, isLoading, fetchData }
}

export default useApi
