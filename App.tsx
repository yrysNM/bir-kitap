import { MainNavigation } from "./src/navigation/MainNavigation"
import { useEffect, useState } from "react"
import { loadAsync } from "expo-font"
import enUS from "@ant-design/react-native/lib/locale-provider/en_US"
import Provider from "@ant-design/react-native/lib/provider"
import { Provider as ProviderRedux } from "react-redux"
import store from "./src/redux/store"
import { Image } from "react-native"

export default function App() {
    const [fontLoaded, setFontLoaded] = useState<boolean>(true)

    useEffect(() => {
        _loadAssets()
    }, [])

    if (fontLoaded) {
        return  <Image source={{uri: "./assets/splash.png"}} style={{height: "100%", width: "100%"}} resizeMode="contain"/>
    }

    async function _loadAssets() {
        await loadAsync({
            antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
            antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        })
        setFontLoaded(false)
    }
    return (
        <ProviderRedux store={store}>
            <Provider locale={enUS}>
                <MainNavigation />
            </Provider>
        </ProviderRedux>
    )
}
