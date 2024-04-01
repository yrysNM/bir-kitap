import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

type propsInfo = {
    bookType: string
    children: React.ReactNode
    navigationUrl: string
}

export const BookShowBlock = ({ bookType, children, navigationUrl }: propsInfo) => {
    const navigation = useNavigation()

    const checkNavigationUrl = () => {
        if (!navigationUrl) return
        const isHaveQuery = navigationUrl.split("/").length > 1
        if (!isHaveQuery) {
            navigation.navigate(navigationUrl as never)
        }
    }

    return (
        <View style={styles.listWrapper}>
            <View style={styles.listHeaderBlock}>
                <Text style={styles.listHeadTitle}>{bookType}</Text>
                {navigationUrl ? (
                    <TouchableOpacity onPress={() => checkNavigationUrl()}>
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
        marginTop: 25,
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
        fontSize: 21,
        fontWeight: "700",
        lineHeight: 21,
    },
    moreInfoText: {
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 20,
        color: "#808080",
    },
})
