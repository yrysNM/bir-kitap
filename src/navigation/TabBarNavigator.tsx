import { StyleSheet, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../screens/Home"
import Icon from "@ant-design/react-native/lib/icon"
import { Search } from "../screens/Search"

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabbar,
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
                            <Icon name="home" style={styles.tabIcon} size="lg" color={focused ? "#fff" : "rgba(248, 248, 248, 0.5)"} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarItemStyle: {
                        height: 0,
                    },
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Icon name="search" style={styles.tabIcon} size="lg" color={focused ? "#fff" : "rgba(248, 248, 248, 0.5)"} />
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
        height: 74,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#005479",
        gap: 40,
    },
    tabIcon: {
        width: 35,
        height: 35,
    },
})
