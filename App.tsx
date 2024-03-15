import { MainNavigation } from "./src/navigation/MainNavigation"
import React, { useEffect, useState } from "react"
import { loadAsync } from "expo-font"
import enUS from "@ant-design/react-native/lib/locale-provider/en_US"
import Provider from "@ant-design/react-native/lib/provider"
import { Provider as ProviderRedux } from "react-redux"
import store from "./src/redux/store"
import { ActivityIndicator, View } from "react-native"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Fuse } from "./src/layouts/Fuse"
import { Page } from "./src/layouts/Page"
export default function App() {
    const [fontLoaded, setFontLoaded] = useState<boolean>(true)

    useEffect(() => {
        _loadAssets().then(() => {
            setFontLoaded(false)
        })
    }, [])

    if (fontLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#015C84" />
            </View>
        )
    }

    async function _loadAssets() {
        await loadAsync({
            antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
            antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        })
    }
    return (
        <ProviderRedux store={store}>
            <Provider locale={enUS}>
                <Page>
                    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#fff" } }}>
                        <Fuse>
                            <MainNavigation />
                        </Fuse>
                    </NavigationContainer>
                </Page>
            </Provider>
        </ProviderRedux>
    )
}
