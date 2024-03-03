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
    const { res, isLoading, error, fetchData } = useApi<IRegistration>("/auth/register", "POST")

    return {
        res,
        isLoading,
        error,
        fetchData,
    }
}

export function LoginAPI() {
    const { res, isLoading, error, fetchData } = useApi<ILogin>("/auth/login", "POST")

    return {
        res,
        isLoading,
        error,
        fetchData,
    }
}
