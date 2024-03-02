import useApi from "../hook/useApi"

export interface IAuth extends IResponse {
    data: {
        id: string
        refreshToken: string
        token: string
        tokenExpireToken: number
        userInfo: IUserInfo,
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

export default  function AuthAPI(url: string, method: string) {
    const {res, isLoading, error, fetchData} = useApi<IAuth>(url, method);
    
    
    return {
        res, 
        isLoading,
        error,
        fetchData,
    }
}
