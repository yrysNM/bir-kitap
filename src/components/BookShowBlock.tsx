import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList>>
type propsInfo = {
    bookType: string
    children: React.ReactNode
    navigationUrl?: string
}

export const BookShowBlock = ({ bookType, children, navigationUrl }: propsInfo) => {
    const navigation = useNavigation<NavigateType>()

    const checkNavigationUrl = () => {
        if (!navigationUrl) return
        const navigationList = navigationUrl.split("/")
        const isHaveQuery = navigationList.length > 1
        if (!isHaveQuery) {
            navigation.navigate(navigationUrl as never)
        } else {
            navigation.navigate(navigationList[0] as navigationDetail, { id: navigationList[1] })
        }
    }

    return (
        <View style={styles.listWrapper}>
            <View style={styles.listHeaderBlock}>
                <Text style={styles.listHeadTitle}>{bookType}</Text>
                {navigationUrl ? (
                    <TouchableOpacity onPressIn={() => checkNavigationUrl()}>
                        <Text style={styles.moreInfoText}>See All</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    listWrapper: {
        marginTop: 28,
        width: "100%",
        gap: 15,
        flexDirection: "column",
    },
    listHeaderBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
    },
    listHeadTitle: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 18,
    },
    moreInfoText: {
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 16,
        color: "#808080",
    },
})
