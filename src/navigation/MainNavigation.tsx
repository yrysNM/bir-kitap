import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Home } from "../screens/Home"
import { useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/ForgotPassword"
import { CategoryList } from "../screens/CategoryList"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    LoginScreen: undefined
    CreateAccountScreen: undefined
    HomeScreen: undefined
    ForgotPasswordScreen: undefined
    GenreScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigation = () => {
    const navigation = useNavigation()
    const { userInfo, hasLogin } = useAppSelector((state) => state.mainSlice)

    useEffect(() => {
        checkAuthStatus()
    }, [userInfo])

    async function checkAuthStatus() {
        try {
            const authToken = await AsyncStorage.getItem("token")
            // const tokenTime = JSON.parse(authToken || "").tokenExpireToken
            // const currentTime = Date.now() / 1000
            const token = authToken ? JSON.parse(authToken).token : null
            if (token && hasLogin) {
                /**
                 * @TODO replace navigations
                 * LoginScreen => Home page
                 * else => GenreScreen page
                 */
                console.log("_______NAVIGATION__________")
                console.log(token, hasLogin)
                const routes = navigation.getState()?.routes
                const prevRoute = routes?.length ? routes[routes.length - 1] : null
                if (prevRoute && prevRoute.name === "LoginScreen") {
                    navigation.navigate("GenreScreen" as never)
                } else {
                    navigation.navigate("HomeScreen" as never)
                }
            } else {
                await AsyncStorage.removeItem("token")
                navigation.navigate("LoginScreen" as never)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false, contentStyle: styles.navigator }}>
            {hasLogin ? (
                <>
                    <Stack.Screen name="HomeScreen" component={Home} />
                    <Stack.Screen name="GenreScreen" component={CategoryList} />
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
