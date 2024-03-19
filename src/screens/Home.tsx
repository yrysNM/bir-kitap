import { StatusBar, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import { WebView } from "react-native-webview"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { useNavigation } from "@react-navigation/native"
import { Page } from "../layouts/Page"
import { setHasLogin, setLoading } from "../redux/features/mainSlice"
import { Fuse } from "../layouts/Fuse"

export const Home = () => {
    const webViewEl = useRef<WebView>(null)
    const dispatch = useAppDispatch()
    const { userInfo } = useAppSelector((state) => state.mainSlice)
    const [showWebView, setShowWebView] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        // AsyncStorage.clear()
        console.log("___________USERINFO__________")
        console.log(userInfo)
    }, [])

    async function injectWebViewData() {
        const token = await AsyncStorage.getItem("token")
        webViewEl.current?.injectJavaScript(`
            localStorage.setItem('token', '${token}');
        `)
    }

    if (showWebView) {
        return (
            <View style={{ position: "relative", height: "100%", width: "100%", marginTop: StatusBar.currentHeight }}>
                <Fuse>
                    <WebView
                        ref={webViewEl}
                        webviewDebuggingEnabled={true}
                        ignoreSilentHardwareSwitch={true}
                        javaScriptEnabled={true}
                        style={{ height: "100%", width: "100%" }}
                        source={{ uri: "http://192.168.1.3:5173/" }}
                        onLoad={injectWebViewData}
                        onRenderProcessGone={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent
                            console.warn("WebView Crashed:", nativeEvent.didCrash)
                            /**
                             * @TODO add modal window when nativeEvent will crash
                             */
                            webViewEl.current?.reload();
                        }}
                        onMessage={(event) => {
                            const messageData = JSON.parse(event.nativeEvent.data)
                            if (messageData && messageData.key === "401") {
                                AsyncStorage.setItem("token", "")
                                dispatch(setHasLogin(false))
                                navigation.navigate("LoginScreen" as never)
                            }
                        }}
                        onLoadProgress={({ nativeEvent }) => {
                            if (nativeEvent.progress !== 1) {
                                dispatch(setLoading(true))
                            } else {
                                dispatch(setLoading(false))
                            }
                        }}
                    />
                    {/* <TouchableOpacity style={{ position: "absolute", top: 100 }} onPress={() => setShowWebView(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity> */}
                </Fuse>
            </View>
        )
    }

    return (
        <Page>
            <TouchableOpacity onPress={() => setShowWebView(true)}>
                <Text>BOOK CROSSING</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("GenreScreen" as never)}>
                <Text>Genre</Text>
            </TouchableOpacity>
        </Page>
    )
}
