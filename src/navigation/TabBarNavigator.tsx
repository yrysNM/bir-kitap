import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home"
import { Animated, Dimensions, StyleSheet } from "react-native"
import { Services } from "../screens/Services"
import { CreatePostAndBook } from "../screens/CreatePostAndBook"
import { Search } from "../screens/Search"
import { Profile } from "../screens/Profile"
import { CustomTabbar } from "../components/CustomTabbar"
import { useNavigation } from "@react-navigation/native"
import { useRef, useEffect } from "react"

const Tab = createBottomTabNavigator()
export const TabNavigator = () => {
    const translationTabBar = useRef(new Animated.Value(0)).current

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener("state", (e) => {
            const indexRoute = e.data.state.index
            const dataRoot = e.data.state.routes[indexRoute]
            if (dataRoot.name === "Root") {
                Animated.timing(translationTabBar, {
                    toValue: 8 + ((dataRoot.state?.index || 0) * Dimensions.get("window").width) / 5,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
            }
        })

        return () => {
            unsubscribeFocus()
        }
    }, [navigation])

    return (
        <>
            <Animated.View style={[styles.tabIconBlock, { backgroundColor: "rgba(23, 126, 221, 0.2)", position: "absolute", bottom: 30, left: 0, zIndex: 1, transform: [{ translateX: translationTabBar }] }]}></Animated.View>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: { ...styles.tabbar, backgroundColor: "#fff" },
                    tabBarHideOnKeyboard: true,
                }}
                tabBar={CustomTabbar}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="CreatePost" component={CreatePostAndBook} />
                <Tab.Screen name="Services" component={Services} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        height: 74,
        alignItems: "center",
    },
    tabIconBlock: {
        width: 64,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
})
