import useApi from "../hook/useApi"


interface INews extends IResponse {
    data: string[]
}

export function NewsApi(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<INews>(`news/${url}`, method)

    return {
        res,
        fetchData,
    }
}
