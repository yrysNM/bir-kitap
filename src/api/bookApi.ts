import useApi from "../hook/useApi"

export type bookInfo = {
    id?: string
    title: string
    author: string
    imageLink: string
    year: number
    genres: string[]
    pages?: number
    description?: string
    rating?: number
    bookUrl?: string
}

export type categoryInfo = {
    id: string
    title: string
    icon: string
    url: string
    visible: number
    sort: number
}

interface IBook extends IResponse {
    data: bookInfo[]
}

export function BookApi(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IBook>(`book/${url}`, method)

    return {
        res,
        fetchData,
    }
}
