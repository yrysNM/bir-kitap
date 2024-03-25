import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"

export const Header = ({ isCustomHeader, title, isGoBack = false }: { isCustomHeader?: boolean; title: string; isGoBack?: boolean }) => {
    const navigation = useNavigation()

    return (
        <View style={isCustomHeader ? styles.headerCustom : styles.headerCommon}>
            {isGoBack && (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon style={styles.icon} name="arrow-left" />
                </TouchableOpacity>
            )}
            <Text style={isCustomHeader ? styles.title : styles.titleCommon}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCustom: {
        marginTop: 20,
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
        marginLeft: 45,
        fontWeight: "600",
        fontSize: 20,
    },
    headerCommon: {
        marginTop: 20,
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
})
