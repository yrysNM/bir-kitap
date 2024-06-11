import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/auth/Login"
import { CreateAccount } from "../screens/auth/CreateAccount"
import { BookCrossingWebView } from "../screens/web/BookCrossingeWebView"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { ForgotPassword } from "../screens/auth/ForgotPassword"
import { EditProfile } from "../screens/EditProfile"
import { Genre } from "../screens/auth/Genre"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setHasLogin } from "../redux/features/mainSlice"
import { TabNavigator } from "./TabBarNavigator"
import { BookDetail } from "../screens/BookDetail"
import { BookGenres } from "../screens/services/BookGenres"
import { NotReady } from "../screens/NotReady"
import { BookMore } from "../screens/BookMore"
import { BookTrackerWebView } from "../screens/web/BookTrackerWebView"
import { Reviews } from "../screens/services/Reviews"
import { Recommendations } from "../screens/services/Recommendations"
import { Collections } from "../screens/services/Collections"
import Readers from "../screens/services/Readers"
import ReaderNews from "../screens/ReaderNews"
import { BookTestWebView } from "../screens/web/BookTestWebView"
import ReadersUser from "../screens/services/ReadersUser"
import { Clubs } from "../screens/services/Clubs"
import { ReviewDetail } from "../screens/ReviewDetail"
import { PostDetail } from "../screens/PostDetail"
import { ClubDetail } from "../screens/ClubDetail"
import { UpdatePost } from "../screens/UpdatePost"
import { Posts } from "../screens/Posts"
import { Welcome } from "../screens/Welcome"
import { UserProfile } from "../screens/UserProfile"
import { BookReaderWebView } from "../screens/web/BookReaderWebView"

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
    }
    ReviewDetail: {
        id: string
    }
    BookTestWebView: undefined
    ReadersUser: { id: string; userId?: string }
    Clubs: undefined
    PostDetail: { id: string }
    ClubDetail: { id: string }
    UpdatePost: { id: string }
    Posts: undefined
    UserProfile: { id: string; isFollow: boolean }
    BookReaderWebView: { bookUrl: string }
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
            screenOptions={{
                headerShown: false,
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
                    <Stack.Screen name="Clubs" component={Clubs} />
                    <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
                    <Stack.Screen name="PostDetail" component={PostDetail} />
                    <Stack.Screen name="ClubDetail" component={ClubDetail} />
                    <Stack.Screen name="UpdatePost" component={UpdatePost} />
                    <Stack.Screen name="Posts" component={Posts} />
                    <Stack.Screen name="UserProfile" component={UserProfile} />
                    <Stack.Screen name="BookReaderWebView" component={BookReaderWebView} />
                </>
            ) : (
                <>
                    <Stack.Screen name="WelcomeScreen" component={Welcome} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    )
}
