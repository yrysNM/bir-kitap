import useApi from "../hook/useApi"

export type postInfo = {
    title: string
    attachments: string[]
    content: string
    createtime?: number
    userId?: string
    updatetime?: number
    id?: string
    clubId?: string
    club?: boolean
    isClub?: boolean
}

interface IPost extends IResponse {
    data: postInfo[]
}

export function PostAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IPost>(`post/${url}`, method)

    return {
        res,
        fetchData,
    }
}
