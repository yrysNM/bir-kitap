import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"

export const Header = ({ isCustomHeader, title, isGoBack = false }: { isCustomHeader?: boolean; title: string; isGoBack?: boolean }) => {
    const navigation = useNavigation()

    return (
        <View style={isCustomHeader ? styles.headerCustom : styles.headerCommon}>
            {isGoBack && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={styles.icon} name="left" />
                </TouchableOpacity>
            )}
            <Text style={isCustomHeader ? styles.title : styles.titleCommon}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCustom: {
        flexDirection: "column",
    },
    icon: {
        color: "#000",
        fontSize: 35,
        borderRadius: 10,
    },
    title: {
        marginTop: 5,
        fontWeight: "600",
        fontSize: 34,
    },
    titleCommon: {
        fontWeight: "600",
        fontSize: 20,
    },
    headerCommon: {
        marginTop: 20,
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },
})
