import useApi from "../hook/useApi"

export type newsInfo = {
    id: string
    title: string
    content: string
    imageLink: string
    verticalImage: string | null
    createtime: number
}

interface INews extends IResponse {
    data: newsInfo[]
}

export function NewsApi(url: string, method: string = "POST") {


    const { res, fetchData } = useApi<INews>(`news/${url}`, method)

    return {
        res,
        fetchData,
    }
}