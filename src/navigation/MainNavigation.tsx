import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native"
import { Welcome } from "../screens/Welcome"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Home } from "../screens/Home"
import { useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/ForgotPassword"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    LoginScreen: undefined
    CreateAccountScreen: undefined
    HomeScreen: undefined
    ForgotPasswordScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigation = () => {
    const navigation = useNavigation()
    const { userInfo } = useAppSelector((state) => state.userInfoSlice)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkAuthStatus()
    }, [userInfo])

    async function checkAuthStatus() {
        try {
            const authToken = await AsyncStorage.getItem("token")
            console.log(authToken)
            if (authToken !== null) {
                const tokenTime = JSON.parse(authToken || "").tokenExpireToken
                const currentTime = Date.now() / 1000

                if (currentTime < currentTime + tokenTime) {
                    setIsLoggedIn(true)
                    navigation.navigate("HomeScreen" as never)
                } else {
                    navigation.navigate("LoginScreen" as never)
                    AsyncStorage.removeItem("token")
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false, contentStyle: styles.navigator }}>
            {isLoggedIn ? (
                <Stack.Screen name="HomeScreen" component={Home} />
            ) : (
                <>
                    <Stack.Screen name="WelcomeScreen" component={Welcome} />
                    <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
                    <Stack.Screen name="LoginScreen" component={Login} />
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
