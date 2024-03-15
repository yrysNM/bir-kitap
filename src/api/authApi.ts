import useApi from "../hook/useApi"

export interface IRegistration extends IResponse {
    data: {
        id: string
        refreshToken: string
        token: string
        tokenExpireToken: number
        userInfo: IUserInfo
    }
}

export interface IUserInfo {
    email: string
    fullName: string
    phone: string
    password: string
    birth: Date
    gender: string
}

export interface ILogin {
    username: string
    password: string
}

export function RegistrationAPI() {
    const { res, error, fetchData } = useApi<IRegistration>("/auth/register", "POST")

    return {
        res,
        error,
        fetchData,
    }
}

export function LoginAPI() {
    const { res, error, fetchData } = useApi<IRegistration>("/auth/login", "POST")

    return {
        res,
        error,
        fetchData,
    }
}
