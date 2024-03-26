import useApi from "../hook/useApi"

export type bookReviewInfo = {
    id?: string
    title: string
    author: string
    imageLink: string
    year: number
}

interface IBook extends IResponse {
    data: bookReviewInfo[]
}

export function ReviewApi(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IBook>(`review/${url}`, method)

    return {
        res,
        fetchData,
    }
}
