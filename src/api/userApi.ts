import useApi from "../hook/useApi"
import { IUserInfo } from "./authApi"

interface IUser extends IResponse {
    data: IUserInfo
}

export function UserAPI(url: string, method: string = "POST") {
    const { res, fetchData } = useApi<IUser>(`user/${url}`, method)

    return {
        res,
        fetchData,
    }
}

