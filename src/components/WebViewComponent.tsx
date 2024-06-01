import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import { WebView, WebViewMessageEvent } from "react-native-webview"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { setLoading } from "../redux/features/mainSlice"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "@env"
import Toast from "@ant-design/react-native/lib/toast"
import useApi from "../hook/useApi"
import { logOut as logOutHelper } from "../helpers/logOut"
import { BackHandler, SafeAreaView } from "react-native"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { Loading } from "./Loading"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
/**
 * @TODO fix refresh token error
 */
// import { refreshAccessToken } from "../utils/axios"

type propsInfo = {
    webViewUrl: string
    uploadImgUrl: string
}

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "BookDetail">>

interface IUpload extends IResponse {
    data: { path: string }
}

const randomNumber = Math.floor(Math.random() * (100 - 1) + 1)

export const WebViewComponent = ({ webViewUrl, uploadImgUrl }: propsInfo) => {
    const navigation = useNavigation<NavigateType>()
    const { isLoading } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()
    const { fetchData: fetchUploadImg } = useApi<IUpload>(uploadImgUrl)
    const webViewEl = useRef<WebView>(null)
    const logOut = logOutHelper()
    const [webviewKey, setWebviewKey] = useState<number>(0)
    const [token, setToken] = useState<string>("")
    const [tokenLoading, setTokenLoading] = useState<boolean>(false)
    const _webview_url = `${webViewUrl}?randomNumber=${randomNumber}`
    const [isWebviewBack, setIsWebviewBack] = useState<boolean>(false)

    useEffect(() => {
        const loadData = async () => {
            setTokenLoading(true)

            AsyncStorage.getItem("token").then((value) => {
                setTokenLoading(false)
                if (value) {
                    setToken(value)
                } else {
                    setToken("")
                }
            })
        }

        loadData()
    }, [])

    const handleBackButtonPress = () => {
        try {
            if (!isWebviewBack) {
                navigation.goBack()
            } else {
                webViewEl.current?.goBack()
            }
            return true
        } catch (err) {
            console.log("[handleBackButtonPress] Error : ", err)
            return false
        }
    }

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonPress)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonPress)
        }
    }, [isWebviewBack])

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

            const fileSize = typeof response.assets[0].fileSize === "number" ? response.assets[0].fileSize : 0
            const isLt5M: boolean = fileSize / 1024 / 1024 < 5
            if (!isLt5M) {
                console.log("File size small than 5mb")
                Toast.fail("File size small than 5mb")
                dispatch(setLoading(false))
                return
            }

            const param = new FormData()
            param.append("file", {
                uri: uriList.join("/"),
                type: "image/jpeg",
                name: uriList.pop(),
            } as never)

            fetchUploadImg(param, { "Content-Type": "multipart/form-data", accept: "application/json" } as never)
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
                        // console.log(res.data)
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
        switch (messageData.key) {
            case "500":
                logOut()
                break
            case "uploadImg":
                handleFileUpload()
                break
            case "closeWin":
                navigation.goBack()
                break
            case "route":
                if (!messageData.data) {
                    console.log("data is empty")
                    return {}
                }
                const { name, params } = messageData.data

                navigation.navigate(name, params)
            default:
                return {}
        }
    }

    return (
        <>
            {(tokenLoading || isLoading) && <Loading />}
            <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F9F6" }}>
                <WebView
                    ref={webViewEl}
                    key={webviewKey}
                    webviewDebuggingEnabled={true}
                    ignoreSilentHardwareSwitch={true}
                    javaScriptEnabled={true}
                    style={{ height: "100%", width: "100%", backgroundColor: "#F7F9F6" }}
                    source={{ uri: _webview_url }}
                    originWhitelist={["*"]}
                    onRenderProcessGone={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent
                        console.warn("WebView Crashed:", nativeEvent.didCrash)
                        webViewEl.current?.reload()
                    }}
                    onContentProcessDidTerminate={() => setWebviewKey((webviewKey) => webviewKey + 1)}
                    onMessage={handleMessageFromWebview}
                    injectedJavaScriptBeforeContentLoaded={injectWebViewData()}
                    onNavigationStateChange={(e) => setIsWebviewBack(e.canGoBack)}
                    // onLoadStart={injectWebViewJS}
                    // onLoad={injectWebViewJS}
                    // onLoadEnd={injectWebViewJS}
                    // injectedJavaScript={injectWebViewData()}
                    onLoadProgress={({ nativeEvent }) => {
                        if (nativeEvent.progress !== 1 && nativeEvent.url === _webview_url) {
                            dispatch(setLoading(true))
                        } else if (nativeEvent.url === _webview_url) {
                            dispatch(setLoading(false))
                        }
                    }}
                />
            </SafeAreaView>
        </>
    )
}
