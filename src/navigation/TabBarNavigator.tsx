import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/tabbar/Home"
import { Animated, Dimensions, StyleSheet } from "react-native"
import { Services } from "../screens/tabbar/Services"
import { CreatePostAndBook } from "../screens/tabbar/CreatePostAndBook"
import { Search } from "../screens/tabbar/Search"
import { Profile } from "../screens/tabbar/Profile"
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
                    toValue: 8 + ((dataRoot.state?.index || 0) * Dimensions.get("screen").width) / 5,
                    duration: 400,
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
            <Animated.View style={[styles.tabIconBlock, { transform: [{ translateX: translationTabBar }], width: Dimensions.get("screen").width / 5 - 16 }]}></Animated.View>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: { ...styles.tabbar },
                }}
                tabBar={CustomTabbar}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Create" component={CreatePostAndBook} />
                <Tab.Screen name="Services" component={Services} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        height: 74,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
    },
    tabIconBlock: {
        width: 64,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "rgba(23, 126, 221, 0.2)",
        position: "absolute",
        bottom: 30,
        left: 0,
        zIndex: 1,
    },
})
