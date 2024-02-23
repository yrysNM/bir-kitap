import {SafeAreaView , StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { WebView } from 'react-native-webview';
import React, {useEffect, useRef, useState} from "react";

export default function App() {
    const webViewEl = useRef<WebView>(null);
    const info = {token: 'test', user_info: {name: "Alibi", icon: "test"}}
    const [showWebView, setShowWebView] = useState(false);

    function injectWebViewData() {
        webViewEl.current?.injectJavaScript(`window.postMessage({token: 'test', user_info: {name: "Alibi", icon: "test"}}, '*')`);
    }

    if(showWebView) {
        return  (
            <View style={{position: "relative", height: "100%", width: "100%"}}>

                <WebView ref={webViewEl}
                         style={{height: "100%", width: "100%"}}
                         onLoadEnd={injectWebViewData}
                         source={{uri: "http://192.168.1.139:5173/"}}
                         javaScriptEnabled
                         onMessage={(event) => {
                         }}
                />
                <TouchableOpacity style={{position: "absolute", top: 100}} onPress={() => setShowWebView(false)}><Text >Close</Text></TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView >
            <TouchableOpacity style={{justifyContent: "center", alignItems: "center",height: "100%"}} onPress={() => setShowWebView(true)}>
                <Text>Test WebView</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
