import useApi from "../hook/useApi"
import { bookInfo } from "./bookApi"

export type bookReviewInfo = {
    id?: string
    title: string
    userId: string
    userName: string
    bookId: string
    message: string
    rating: number
    createtime: number
    updatetime: number
    book: bookInfo
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
