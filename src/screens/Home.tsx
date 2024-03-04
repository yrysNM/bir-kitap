import { Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import { Page } from "../layouts/Page"
import { WebView } from "react-native-webview"
import { useAppSelector } from "../hook/useStore"

export const Home = () => {
    const webViewEl = useRef<WebView>(null)
    const { userInfo } = useAppSelector((state) => state.userInfoSlice)
    const [showWebView, setShowWebView] = useState(false)

    useEffect(() => {
        // AsyncStorage.clear();
        console.log("___________USERINFO__________")
        console.log(userInfo)
        // getToken()
    }, [])

    async function injectWebViewData() {
        const token = await AsyncStorage.getItem("token")
        webViewEl.current?.injectJavaScript(`window.postMessage(${token}, '*')`)
    }

    if (showWebView) {
        return (
            <View style={{ position: "relative", height: "100%", width: "100%" }}>
                <WebView
                    ref={webViewEl}
                    style={{ height: "100%", width: "100%" }}
                    onLoadEnd={injectWebViewData}
                    source={{ uri: "http://192.168.1.112:5173/" }}
                    javaScriptEnabled
                    onMessage={(event) => {
                        console.log(event)
                    }}
                />
                <TouchableOpacity style={{ position: "absolute", top: 100 }} onPress={() => setShowWebView(false)}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Page>
            <View style={{ position: "relative", height: "100%", width: "100%" }}>
                <TouchableOpacity onPress={() => setShowWebView(true)}>
                    <Text>BOOK CROSSING</Text>
                </TouchableOpacity>
            </View>
        </Page>
    )
}
