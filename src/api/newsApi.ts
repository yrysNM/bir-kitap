import useApi from "../hook/useApi"

interface INews {

}

export function NewsApi(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<any>(`news/${url}`, method)

    return {
        res,
        fetchData,
    }
}