import {MainNavigation} from "./src/navigation/MainNavigation";
import {useEffect, useState} from "react";
import { loadAsync } from "expo-font"

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false)

  useEffect(() => {
    _loadAssets()
  }, [])

  async function _loadAssets() {
    await loadAsync({
      antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
      antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
    })
    setFontLoaded(true)
  }
  return (
        <MainNavigation />
  );
}