/**
 * @format main config
 */
import "react-native-gesture-handler"
import { AppRegistry } from "react-native"
import App from "./App"
import { expo as appName } from "./app.json"
import "./src/locales/i18n"

AppRegistry.registerComponent(appName.name, () => App)
