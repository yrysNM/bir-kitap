import { MainNavigation } from "./src/navigation/MainNavigation"
import { useEffect, useState } from "react"
import { loadAsync } from "expo-font"
import { Text } from "react-native"
import enUS from "@ant-design/react-native/lib/locale-provider/en_US"
import Provider from "@ant-design/react-native/lib/provider"

export default function App() {
    const [fontLoaded, setFontLoaded] = useState<boolean>(true)

    useEffect(() => {
        _loadAssets()
    }, [])

    if (fontLoaded) {
        return <Text>Loading</Text>
    }

    async function _loadAssets() {
        await loadAsync({
            antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
            antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        })
        setFontLoaded(false)
    }
    return (
        <Provider locale={enUS}>
            <MainNavigation />
        </Provider>
    )
}
