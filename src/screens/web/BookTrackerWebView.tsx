import { WebViewComponent } from "../../components/WebViewComponent"

const _webview_base_url = "http://192.168.0.103:5173/book-tracker/#"
// const _webview_base_url = "https://birkitap.kz/book-tracker/#"

export const BookTrackerWebView = () => {
    return <WebViewComponent webViewUrl={_webview_base_url} uploadImgUrl="book/upload" />
}
