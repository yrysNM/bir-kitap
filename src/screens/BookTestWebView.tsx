import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import { WebView, WebViewMessageEvent } from "react-native-webview"
import { useAppDispatch } from "../hook/useStore"
import { setLoading } from "../redux/features/mainSlice"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "@env"
import Toast from "@ant-design/react-native/lib/toast"
import { base64toFiile } from "../helpers/base64toFile"
import useApi from "../hook/useApi"
import { logOut as logOutHelper } from "../helpers/logOut"
import { SafeAreaView, StatusBar } from "react-native"
import { Fuse } from "../layouts/Fuse"

const _webview_base_url = "http://192.168.0.124:5173/book-test"
// const _webview_base_url = "https://birkitap.kz/book-crossing/"

interface IUpload extends IResponse {
    data: { path: string }
}

export const BookTestWebView = () => {
    const dispatch = useAppDispatch()
    const { fetchData } = useApi<IUpload>("/bookcrossing/announcement/upload")
    const webViewEl = useRef<WebView>(null)
    const logOut = logOutHelper()
    const [webviewKey, setWebviewKey] = useState<number>(0)
    const [token, setToken] = useState<string>("")

    useEffect(() => {
        AsyncStorage.getItem("token").then((value) => {
            if (value) {
                setToken(value)
            } else {
                setToken("")
            }
        })
    })

    function injectWebViewData() {
        const janascript = `
        localStorage.setItem('token', '${token}');
    `
        // webViewEl.current?.injectJavaScript(janascript)
        return janascript
    }

    const handleFileUpload = async () => {
        dispatch(setLoading(true))
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
            base64: true,
        })

        if (!response.canceled && response.assets) {
            const uriList = response.assets[0].uri.split("/")
            const file = base64toFiile(`data:image/*;base64,${response.assets[0].base64}`, uriList[uriList.length - 1])
            const isLt5M: boolean = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                console.log("File size small than 5mb")
                Toast.fail("File size small than 5mb")
            }

            const param = new FormData()
            param.append("file", {
                uri: uriList.join("/"),
                type: "image/jpeg",
                name: uriList.pop(),
            } as never)

            fetchData(param, { "Content-Type": "multipart/form-data", accept: "application/json" } as never)
                .then((res) => {
                    if (res.result_code === 0) {
                        dispatch(setLoading(false))
                        const infoImg = JSON.parse(JSON.stringify(res.data))
                        const urlImage = `${API_URL}public/get_resource?name=${infoImg.path}`
                        const info = {
                            type: "file",
                            url: urlImage,
                        }
                        webViewEl.current?.injectJavaScript(`window.postMessage(${JSON.stringify(info)}, "*")`)
                    } else {
                        dispatch(setLoading(false))
                        console.log(res.data)
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                    dispatch(setLoading(false))
                })
        } else {
            dispatch(setLoading(false))
        }
    }

    const handleMessageFromWebview = (e: WebViewMessageEvent) => {
        const messageData = JSON.parse(e.nativeEvent.data)
        if (messageData && messageData.key === "500") {
            logOut()
        } else if (messageData.key === "uploadImg") {
            handleFileUpload()
        }

        return {}
    }

    return (
        <Fuse>
            {/* {!isLoading && ( */}
            <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "#fff" }}>
                <WebView
                    ref={webViewEl}
                    key={webviewKey}
                    webviewDebuggingEnabled={true}
                    ignoreSilentHardwareSwitch={true}
                    javaScriptEnabled={true}
                    style={{ height: "100%", width: "100%" }}
                    source={{ uri: _webview_base_url }}
                    originWhitelist={["*"]}
                    onRenderProcessGone={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent
                        console.warn("WebView Crashed:", nativeEvent.didCrash)
                        webViewEl.current?.reload()
                    }}
                    onContentProcessDidTerminate={() => setWebviewKey((webviewKey) => webviewKey + 1)}
                    onMessage={handleMessageFromWebview}
                    injectedJavaScript={injectWebViewData()}
                    onLoadProgress={({ nativeEvent }) => {
                        if (nativeEvent.progress !== 1 && nativeEvent.url === _webview_base_url) {
                            setLoading(true)
                        } else if (nativeEvent.url === _webview_base_url) {
                            setLoading(false)
                        }
                    }}
                />
            </SafeAreaView>
            {/* )} */}
        </Fuse>
    )
}
