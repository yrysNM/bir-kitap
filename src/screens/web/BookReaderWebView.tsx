import { useMemo, useRef, useState } from "react"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import { Page } from "../../layouts/Page"
import { WebView } from "react-native-webview"
import { useAppDispatch } from "../../hook/useStore"
import { setLoading } from "../../redux/features/mainSlice"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { API_URL } from "@env"

export const BookReaderWebView = () => {
    const dispatch = useAppDispatch()
    const webViewEl = useRef<WebView>(null)
    const [webviewKey, setWebviewKey] = useState<number>(0)
    const { bookUrl: url } = useRoute<RouteProp<RootStackParamList, "BookReaderWebView">>().params

    const isValidImg = (bookUrl: string) => {
        return bookUrl.indexOf("https://") !== -1
    }

    const webUrl = useMemo(() => {
        if (url && url.length) {
            if (!isValidImg(url)) {
                return `http://docs.google.com/gview?embedded=true&url=${API_URL}/public/get_resource?name=${url}`
            } else {
                return url
            }
        } else {
            return ""
        }
    }, [url])

    return (
        <Page isFlatList>
            <Header isGoBack title="" />
            {webUrl.length ? (
                <WebView
                    key={webviewKey}
                    ref={webViewEl}
                    nestedScrollEnabled={true}
                    source={{ uri: webUrl }}
                    webviewDebuggingEnabled={true}
                    ignoreSilentHardwareSwitch={true}
                    javaScriptEnabled={true}
                    style={{ height: "100%", width: "100%", backgroundColor: "#F7F9F6" }}
                    onLoadEnd={(data) => {
                        const { nativeEvent } = data
                        const { title } = nativeEvent

                        if (!title.trim()) {
                            webViewEl.current?.stopLoading()
                            webViewEl.current?.reload()
                            setWebviewKey((webviewKey) => webviewKey + 1)
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
            ) : (
                <NoData />
            )}
        </Page>
    )
}
