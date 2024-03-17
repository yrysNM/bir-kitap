import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import { Home } from "../screens/Home"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/ForgotPassword"
import NewHome from "../screens/NewHome"
import EditProfile from "../screens/EditProfile"
import ChangePassword from "../screens/ChangePassword"
import { Genre } from "../screens/Genre"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setHasLogin } from "../redux/features/mainSlice"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    LoginScreen: undefined
    CreateAccountScreen: undefined
    HomeScreen: undefined
    ForgotPasswordScreen: undefined
    NewHomeScreen: undefined
    EditProfileScreen: undefined
    ChangePasswordScreen: undefined
    GenreScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigation = () => {
    const { hasLogin } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()

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
        <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false, contentStyle: styles.navigator }}>
            {hasLogin ? (
                <>
                    <Stack.Screen name="HomeScreen" component={Home} />
                    <Stack.Screen name="GenreScreen" component={Genre} />
                    <Stack.Screen name="NewHomeScreen" component={NewHome} />
                    <Stack.Screen name="EditProfileScreen" component={EditProfile} />
                    <Stack.Screen name="ChangePasswordScreen" component={ChangePassword} />
                </>
            ) : (
                <>
                    <Stack.Screen name="LoginScreen" component={Login} />
                    <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    navigator: {
        backgroundColor: "#fff",
    },
})
