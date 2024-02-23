import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {StyleSheet} from "react-native";
import {Welcome} from "../screens/Welcome";

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
    return (
        <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: "#fff" } }}>
            <Stack.Navigator initialRouteName='Root' screenOptions={{headerShown: false, contentStyle: styles.navigator}}>
                <Stack.Screen name="WelcomeScreen" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    navigator: {
        backgroundColor: "#fff",
    },
})