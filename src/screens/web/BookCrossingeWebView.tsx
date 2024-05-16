import { WebViewComponent } from "../../components/WebViewComponent"

const _webview_base_url = " http://192.168.235.166:5173/book-crossing/#"
// const _webview_base_url = "https://birkitap.kz/book-crossing/#"

export const BookCrossingWebView = () => {
    return <WebViewComponent webViewUrl={_webview_base_url} uploadImgUrl="/bookcrossing/announcement/upload" />
}
