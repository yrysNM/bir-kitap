import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"

export const Header = ({ isCustomHeader, title }: { isCustomHeader: boolean; title: string }) => {
    const navigation = useNavigation()

    return (
        <View style={isCustomHeader ? styles.headerCustom : styles.headerCommon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.icon} name="arrow-left" />
            </TouchableOpacity>
            <Text style={isCustomHeader ? styles.title : styles.titleCommon}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerCustom: {
        marginTop: 20,
        paddingHorizontal: 16,
        flexDirection: "column",
        gap: 45,
    },
    icon: {
        color: "#000",
        fontSize: 35,
        borderRadius: 10,
    },
    title: {
        fontWeight: "600",
        fontSize: 34,
    },
    titleCommon: {
        fontWeight: "600",
        fontSize: 20,
    },
    headerCommon: {
        marginTop: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
})
