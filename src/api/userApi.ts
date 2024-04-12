import useApi from "../hook/useApi"
import { IUserInfo } from "./authApi"

export interface IFollowedUser {
    id: string
    email: string
    phone: string
    fullName: string
    password: string
    birth: string
    gender: string
    genres: any
    createtime: string
    refreshToken: string
    lastLogin: string
    avatar: string
    followed: boolean
}

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

