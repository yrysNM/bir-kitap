import useApi from "../hook/useApi"

export type newsInfo = {
    content: string
    createtime: number
    id: string
    imageLink: string
    title: string
    verticalImageLink: null | string
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
