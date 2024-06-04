import { useMemo, useRef, useState } from "react"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import { Page } from "../../layouts/Page"
import { WebView } from "react-native-webview"
import { useAppDispatch } from "../../hook/useStore"
import { setLoading } from "../../redux/features/mainSlice"

export const BookReaderWebView = ({ url = "https://clicklibrary.wordpress.com/wp-content/uploads/2018/09/it-by-stephen-king.pdf" }: { url?: string }) => {
    const dispatch = useAppDispatch()
    const webViewEl = useRef<WebView>(null)
    const [webviewKey, setWebviewKey] = useState<number>(0)

    const webUrl = useMemo(() => {
        if (url && url.length) {
            return `http://docs.google.com/gview?embedded=true&url=${url}`
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
                    onError={(e) => console.log(e)}
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
