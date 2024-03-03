import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { Welcome } from "../screens/Welcome"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Home } from "../screens/Home"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    LoginScreen: undefined
    CreateAccountScreen: undefined
    HomeScreen: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const MainNavigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkAuthStatus()
    }, [])

    async function checkAuthStatus() {
        try {
            const authToken = await AsyncStorage.getItem("token")
            if (authToken !== null) {
                const tokenTime = JSON.parse(authToken || "").tokenExpireToken
                const currentTime = Date.now() / 1000

                if (currentTime < currentTime + tokenTime) {
                    setIsLoggedIn(true)
                } else {
                    AsyncStorage.removeItem("token")
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#fff" } }}>
            <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false, contentStyle: styles.navigator }}>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name="WelcomeScreen" component={Welcome} />
                        <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
                        <Stack.Screen name="LoginScreen" component={Login} />
                    </>
                ) : (
                    <Stack.Screen name="HomeScreen" component={Home} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    navigator: {
        backgroundColor: "#fff",
    },
})
