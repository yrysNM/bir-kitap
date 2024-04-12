import useApi from "../hook/useApi"
import { bookInfo } from "./bookApi"
import { IFollowedUser } from "./userApi"

interface IRecomendation extends IResponse {
    data: bookInfo[] | IFollowedUser[]
}

export function RecommendationAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IRecomendation>(`recommendation/${url}`, method)

    return {
        res,
        fetchData,
    }
}
