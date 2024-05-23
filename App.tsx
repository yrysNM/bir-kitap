import { MainNavigation } from "./src/navigation/MainNavigation"
import React, { useCallback, useEffect, useState } from "react"
import { loadAsync } from "expo-font"
import enUS from "@ant-design/react-native/lib/locale-provider/en_US"
import Provider from "@ant-design/react-native/lib/provider"
import { Provider as ProviderRedux } from "react-redux"
import store from "./src/redux/store"
import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { I18nextProvider } from "react-i18next"
import i18next from "./src/locales/i18n"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from "expo-splash-screen"
import { Welcome } from "./src/screens/Welcome"

export default function App() {
    const [appIsReady, setAppIsReady] = useState<boolean>(false)

    useEffect(() => {
        async function prepare() {
            try {
                loadLanguage()
                await _loadAssets()
                await new Promise((resolve) => setTimeout(resolve, 100))
            } catch (e) {
                console.log(e)
            } finally {
                setAppIsReady(true)
            }
        }

        prepare()
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync()
        }
    }, [appIsReady])

    const loadLanguage = async () => {
        try {
            const storedLanguage = await AsyncStorage.getItem("lang")
            if (storedLanguage) {
                i18next.changeLanguage(storedLanguage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function _loadAssets() {
        await loadAsync({
            antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
            antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        })
    }

    if (!appIsReady) {
        return <Welcome isHaveNavigation={false} />
    }

    return (
        <ProviderRedux store={store}>
            <Provider locale={enUS}>
                <I18nextProvider i18n={i18next}>
                    <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#F7F9F6" } }} onReady={onLayoutRootView}>
                        <MainNavigation />
                    </NavigationContainer>
                </I18nextProvider>
            </Provider>
        </ProviderRedux>
    )
}
