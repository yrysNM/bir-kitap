import { Icon } from "@ant-design/react-native"
import { IconNames } from "@ant-design/react-native/lib/icon"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

export const CustomTabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const iconColor = (isFocused: boolean) => {
        if (isFocused) {
            return "#0A78D6"
        } else {
            return "#212121"
        }
    }

    const iconList = [
        {
            key: "Home",
            iconName: "home",
        },
        {
            key: "Search",
            iconName: "search",
        },
        {
            key: "CreatePost",
            iconName: "plus",
        },
        {
            key: "Services",
            iconName: "appstore",
        },
        {
            key: "Profile",
            iconName: "user",
        },
    ]

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    })
                }

                return (
                    <TouchableOpacity key={index} style={styles.tabbarBlock} onPress={onPress} testID={options.tabBarTestID} onLongPress={onLongPress} accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={options.tabBarAccessibilityLabel} accessibilityRole="button">
                        <View>
                            <Icon name={iconList.find((item) => item.key === label)?.iconName as IconNames} style={styles.tabIcon} color={iconColor(isFocused)} />
                        </View>
                        <Text style={[{ color: iconColor(isFocused) }, styles.tabbarText]}>{label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        height: 74,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    tabbarBlock: {
        flex: 1,
        paddingVertical: 12,
        flexDirection: "column",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        zIndex: 100,
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
