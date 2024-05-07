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
    birth: number
    gender: string
    avatar?: string
}

export interface ILogin {
    username: string
    password: string
}

export function RegistrationAPI() {
    const { res, fetchData } = useApi<IRegistration>("auth/register")

    return {
        res,
        fetchData,
    }
}

export function LoginAPI() {
    const { res, fetchData } = useApi<IRegistration>("auth/login")

    return {
        res,
        fetchData,
    }
}
