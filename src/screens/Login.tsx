import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAppSelector } from "../hook/useStore"

export const Login = () => {
    const { userInfo } = useAppSelector((state) => state.userInfoSlice)

    const getToken = async() => {

        const token = await AsyncStorage.getItem("token")
    
        console.log(JSON.stringify(token))
    }

    useEffect(() => {
        getToken();
        console.log(userInfo);
    }, [])

    return (
        <Page>
            <Header isCustomHeader={true} title={"Welcome back"} />
        </Page>
    )
}
