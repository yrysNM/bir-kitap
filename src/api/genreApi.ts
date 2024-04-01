import useApi from "../hook/useApi"

export type genreInfo = {
    id: string
    title: string
}

export interface IGenre extends IResponse {
    data: genreInfo[]
}

export function GenreAPI(url: string, method: string = "POst") {
    const { res, fetchData } = useApi<IGenre>(`genre/${url}`, method)

    return {
        res,
        fetchData,
    }
}
