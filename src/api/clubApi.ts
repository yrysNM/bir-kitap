import useApi from "../hook/useApi"

export type clubInfo = {
    id?: string
    title: string
    createtime?: number
    ownerId?: string
    private: boolean
}

interface IClub extends IResponse {
    data: clubInfo[]
}

export function ClubAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IClub>(`club/${url}`, method)

    return {
        res,
        fetchData,
    }
}
