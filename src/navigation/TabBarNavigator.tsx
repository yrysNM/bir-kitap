import { StyleSheet, View, Text, Animated } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home"
import Icon from "@ant-design/react-native/lib/icon"
import { Services } from "../screens/Services"
import { CreatePostAndBook } from "../screens/CreatePostAndBook"
import { Search } from "../screens/Search"
import { Profile } from "../screens/Profile"
import { useEffect, useRef } from "react"
import { useNavigation } from "@react-navigation/native"

const Tab = createBottomTabNavigator()
export const TabNavigator = () => {
    const translationTabBar = useRef(new Animated.Value(0)).current

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener("state", (e) => {
            const indexRoute = e.data.state.index
            const dataRoot = e.data.state.routes[indexRoute];
            /**
             * @TODO add increment
             */
            console.log(8 + (dataRoot.state?.index || 0 ) * 70);
            if (dataRoot.name === "Root") {
                Animated.timing(translationTabBar, {
                    toValue: 8 + ((dataRoot.state?.index || 0) * 70),
                    duration: 500,
                    useNativeDriver: true,
                }).start()
            }
        })

        return () => {
            unsubscribeFocus()
        }
    }, [navigation])

    const iconColor = (isFocused: boolean) => {
        if (isFocused) {
            return "#0A78D6"
        } else {
            return "#212121"
        }
    }

    return (
        <>
            <Animated.View style={[styles.tabIconBlock, { backgroundColor: "rgba(23, 126, 221, 0.2)", position: "absolute", bottom: 30, left: 86, zIndex: 1,  }]}></Animated.View>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: { ...styles.tabbar, backgroundColor: "#fff" },
                    tabBarHideOnKeyboard: true,
                }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarItemStyle: {
                            height: "auto",
                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabbarBlock}>
                                <Icon name="home" style={styles.tabIcon} color={iconColor(focused)} />
                                <Text style={[{ color: iconColor(focused) }, styles.tabbarText]}>Home</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarItemStyle: {
                            height: "auto",
                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabbarBlock}>
                                {/* <View style={[{ backgroundColor: focused ? "rgba(23, 126, 221, 0.2)" : "#fff" }, styles.tabIconBlock]}> */}
                                <Icon name="search" style={styles.tabIcon} color={iconColor(focused)} />
                                {/* </View> */}
                                <Text style={[{ color: iconColor(focused) }, styles.tabbarText]}>Search</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="CreatePost"
                    component={CreatePostAndBook}
                    options={{
                        tabBarItemStyle: {
                            height: "auto",
                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabbarBlock}>
                                {/* <View style={[{ backgroundColor: focused ? "rgba(23, 126, 221, 0.2)" : "#fff" }, styles.tabIconBlock]}> */}
                                <Icon name="plus" style={styles.tabIcon} color={iconColor(focused)} />
                                {/* </View> */}
                                <Text style={[{ color: iconColor(focused) }, styles.tabbarText]}>Create</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Services"
                    component={Services}
                    options={{
                        tabBarItemStyle: {
                            height: "auto",
                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabbarBlock}>
                                {/* <View style={[{ backgroundColor: focused ? "rgba(23, 126, 221, 0.2)" : "#fff" }, styles.tabIconBlock]}> */}
                                <Icon name="appstore" style={styles.tabIcon} color={iconColor(focused)} />
                                {/* </View> */}
                                <Text style={[{ color: iconColor(focused) }, styles.tabbarText]}>Services</Text>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarItemStyle: {
                            height: "auto",
                        },
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabbarBlock}>
                                {/* <View style={[{ backgroundColor: focused ? "rgba(23, 126, 221, 0.2)" : "#fff" }, styles.tabIconBlock]}> */}
                                <Icon name="user" style={styles.tabIcon} color={iconColor(focused)} />
                                {/* </View> */}
                                <Text style={[{ color: iconColor(focused) }, styles.tabbarText]}>Profile</Text>
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        height: 74,
        alignItems: "center",
    },
    tabbarBlock: {
        paddingVertical: 12,
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: "100%",
        zIndex: 100,
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
    tabIcon: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        verticalAlign: "middle",
        height: 24,
        width: 24,
    },
    tabbarText: {
        fontSize: 12,
        fontWeight: "700",
        lineHeight: 14,
    },
})
