import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import { WebviewTest } from "../screens/WebviewTest"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/ForgotPassword"
import EditProfile from "../screens/EditProfile"
import ChangePassword from "../screens/ChangePassword"
import { Genre } from "../screens/Genre"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setHasLogin } from "../redux/features/mainSlice"
import { TabNavigator } from "./TabBarNavigator"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    Login: undefined
    CreateAccount: undefined
    WebviewTest: undefined
    ForgotPassword: undefined
    EditProfile: undefined
    ChangePassword: undefined
    Genre: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigation = () => {
    const { hasLogin } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()
    const { bgColor } = useAppSelector((state) => state.mainSlice)

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then((token) => {
                if (token) {
                    dispatch(setHasLogin(true))
                } else {
                    dispatch(setHasLogin(false))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: bgColor } }}>
            {hasLogin ? (
                <>
                    <Stack.Screen name="Root" component={TabNavigator} />
                    <Stack.Screen name="WebviewTest" component={WebviewTest} />
                    <Stack.Screen name="Genre" component={Genre} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    )
}
