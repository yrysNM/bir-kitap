import { useRef, useState } from "react"
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from "react-native"

type propsInfo = {
    valueList: { value: string; label: string }[]
    onClickTab: (valueTab: string) => void
}

export const CustomTabs = ({ valueList, onClickTab }: propsInfo) => {
    const translationTabs = useRef(new Animated.Value(0)).current
    const [tab, setTab] = useState<{ value: string; label: string }>({
        value: valueList[0].value,
        label: valueList[0].label,
    })

    const onChangeTabs = (index: number, valueTab: string) => {
        onClickTab(valueTab)
        setTab(valueList.find((value) => value.value === valueTab) || { value: valueList[0].value, label: valueList[0].label })
        Animated.timing(translationTabs, {
            toValue: (index * (Dimensions.get("window").width - 32)) / valueList.length,
            duration: 250,
            useNativeDriver: true,
        }).start()
    }

    const isSelectTab = (tabValue: string) => {
        return tab.value === tabValue
    }

    return (
        <View style={styles.tabWrapper}>
            <Animated.View style={[styles.tabIconBlock, { width: (Dimensions.get("window").width - 32) / valueList.length, transform: [{ translateX: translationTabs }] }]}></Animated.View>

            {valueList.map((item, i) => (
                <TouchableOpacity key={i} style={styles.tabBlock} onPress={() => onChangeTabs(i, item.value)}>
                    <Text style={[styles.tabText, { color: !isSelectTab(item.value) ? "#212121" : "#ffff" }]}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    tabIconBlock: {
        height: 47,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: "#0A78D6",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: -1,
    },
    tabWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        borderRadius: 30,
        backgroundColor: "#FFF",
        marginTop: 5,
        height: 47,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 30,
        elevation: 1,
        shadowOpacity: 1,
    },
    tabBlock: {
        flex: 1,
        paddingVertical: 14,
        justifyContent: "center",
        alignItems: "center",
        // paddingHorizontal: 30,
    },
    tabText: {
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 18,
    },
})
