import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home"
import Icon from "@ant-design/react-native/lib/icon"
import { Services } from "../screens/Services"
import { useNavigation } from "@react-navigation/native"
import { CreatePostAndBook } from "../screens/CreatePostAndBook"
import { NotReady } from "../screens/NotReady"

const Tab = createBottomTabNavigator()
export const TabNavigator = () => {
    const navigation = useNavigation()
    const navigationTabbarIndex = navigation.getState().routes[0].state?.index
    const navigationTabbarRoutesName = navigation.getState().routes[0].state?.routeNames
    const currentRouteName: string = navigationTabbarRoutesName && typeof navigationTabbarIndex !== "undefined" ? navigationTabbarRoutesName[navigationTabbarIndex] : ""
    const iconColor = (isFocused: boolean) => {
        if (isFocused) {
            return currentRouteName === "Services" ? "#005479" : "#fff"
        } else {
            return currentRouteName === "Services" ? "rgba(0, 0, 0, 0.5)" : "rgba(248, 248, 248, 0.5)"
        }
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.tabbar, backgroundColor: currentRouteName === "Services" ? "#fff" : "#005479" },
                tabBarHideOnKeyboard: true,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="home" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={NotReady}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="search" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="CreatePost"
                component={CreatePostAndBook}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="plus" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Services"
                component={Services}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="appstore" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={NotReady}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="user" style={styles.tabIcon} color={iconColor(focused)} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        paddingVertical: 20,
        height: 64,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        gap: 40,
        borderBottomColor: "#000",
        borderBottomWidth: 0.5,
        borderStyle: "solid",
    },
    tabIcon: {
        fontSize: 30,
        width: 30,
        height: 30,
    },
})
