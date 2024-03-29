import AsyncStorage from "@react-native-async-storage/async-storage"
import { setHasLogin } from "../redux/features/mainSlice"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { useNavigation } from "@react-navigation/native"

export function logOut() {
    const dispatch = useAppDispatch()
    const { hasLogin } = useAppSelector((state) => state.mainSlice)
    const navigation = useNavigation()
    return () => {
        AsyncStorage.setItem("token", "")
        dispatch(setHasLogin(false))
        if (!hasLogin) {
            navigation.navigate("Login" as never)
        }
    }
}
