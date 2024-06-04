import { useMemo, useRef } from "react"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import { Page } from "../../layouts/Page"
import { WebView } from "react-native-webview"

export const BookReaderWebView = ({ url = "https://clicklibrary.wordpress.com/wp-content/uploads/2018/09/it-by-stephen-king.pdf" }: { url?: string }) => {
    const webViewEl = useRef<WebView>(null)

    const webUrl = useMemo(() => {
        if (url && url.length) {
            return `http://docs.google.com/gview?embedded=true&url=${url}`
        } else {
            return ""
        }
    }, [url])

    return (
        <Page>
            <Header isGoBack title="" />
            {webUrl.length ? (
                <WebView ref={webViewEl} nestedScrollEnabled={true} source={{ uri: webUrl }} webviewDebuggingEnabled={true} ignoreSilentHardwareSwitch={true} javaScriptEnabled={true} style={{ height: "100%", width: "100%", backgroundColor: "#F7F9F6" }} onError={(e) => console.log(e)} />
            ) : (
                <NoData />
            )}
        </Page>
    )
}
