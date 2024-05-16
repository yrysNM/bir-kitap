import { WebViewComponent } from "../../components/WebViewComponent"

// const _webview_base_url = "http://192.168.1.4:5174/book-test/#"
const _webview_base_url = "https://birkitap.kz/book-test/#"

export const BookTestWebView = () => {
    return <WebViewComponent webViewUrl={_webview_base_url} uploadImgUrl="/bookcrossing/announcement/upload" />
}
