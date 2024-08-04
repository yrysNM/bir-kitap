import React, { useEffect } from "react"
import { ImageBackground } from "react-native"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import SplashImg from "../../assets/splash.png"
import { RootStackParamList } from "../navigation/MainNavigation"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "Login">>

export const Welcome = ({ isHaveNavigation = true }: { isHaveNavigation?: boolean }) => {
    const navigation = isHaveNavigation ? useNavigation<NavigateType>() : null

    useEffect(() => {
        const restTime = setTimeout(() => {
            if (navigation) {
                navigation.navigate("BookCrossingWebView")
            }
        }, 1000)

        return () => {
            clearTimeout(restTime)
        }
    }, [])

    return <ImageBackground source={SplashImg} style={{ width: "100%", height: "100%" }} imageStyle={{ objectFit: "cover" }}></ImageBackground>
}
