import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Login"
import { CreateAccount } from "../screens/CreateAccount"
import { BookCrossingWebView } from "../screens/BookCrossingeWebView"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/ForgotPassword"
import { EditProfile } from "../screens/EditProfile"
import { Genre } from "../screens/Genre"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setHasLogin } from "../redux/features/mainSlice"
import { TabNavigator } from "./TabBarNavigator"
import { BookDetail } from "../screens/BookDetail"
import { BookGenres } from "../screens/BookGenres"
import { NotReady } from "../screens/NotReady"
import { BookMore } from "../screens/BookMore"
import { BookTrackerWebView } from "../screens/BookTrackerWebView"
import { Reviews } from "../screens/Reviews"
import { Recommendations } from "../screens/Recommendations"
import { Collections } from "../screens/Collections"
import Readers from "../screens/Readers"
import ReaderNews from "../screens/ReaderNews"
import { BookTestWebView } from "../screens/BookTestWebView"
import ReadersUser from "../screens/ReadersUser"

export type RootStackParamList = {
    Root: undefined
    WelcomeScreen: undefined
    Login: undefined
    CreateAccount: undefined
    BookCrossingWebView: undefined
    ForgotPassword: undefined
    EditProfile: undefined
    ChangePassword: undefined
    Genre: undefined
    BookDetail: { id: string }
    BookGenres: undefined
    NotReady: undefined
    BookMore: { id: string }
    BookTrackerWebView: undefined
    Reviews: undefined
    Recommendations: undefined
    Collections: undefined
    Readers: undefined
    ReaderNews: {
        id: string
    }, 
    BookTestWebView: undefined,
    ReadersUser: undefined
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
        <Stack.Navigator
            initialRouteName="Root"
            screenOptions={({ navigation }) => {
                const navigationTabbarIndex = navigation.getState().routes[0].state?.index
                const navigationTabbarRoutesName = navigation.getState().routes[0].state?.routeNames
                const currentRouteName: string = navigationTabbarRoutesName && typeof navigationTabbarIndex !== "undefined" ? navigationTabbarRoutesName[navigationTabbarIndex] : ""
                return {
                    headerShown: false,
                    contentStyle: { backgroundColor: currentRouteName === "Services" ? "#005479" : "#fff" },
                }
            }}>
            {hasLogin ? (
                <>
                    <Stack.Screen name="Root" component={TabNavigator} />
                    <Stack.Screen name="BookCrossingWebView" component={BookCrossingWebView} />
                    <Stack.Screen name="Readers" component={Readers} />
                    <Stack.Screen name="ReaderNews" component={ReaderNews} />
                    <Stack.Screen name="ReadersUser" component={ReadersUser} />
                    <Stack.Screen name="BookTrackerWebView" component={BookTrackerWebView} />
                    <Stack.Screen name="BookTestWebView" component={BookTestWebView} />
                    <Stack.Screen name="Genre" component={Genre} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="BookDetail" component={BookDetail} />
                    <Stack.Screen name="BookGenres" component={BookGenres} />
                    <Stack.Screen name="NotReady" component={NotReady} />
                    <Stack.Screen name="BookMore" component={BookMore} />
                    <Stack.Screen name="Reviews" component={Reviews} />
                    <Stack.Screen name="Recommendations" component={Recommendations} />
                    <Stack.Screen name="Collections" component={Collections} />
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
