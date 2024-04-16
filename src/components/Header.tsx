import { Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ArrowBack from "../../assets/images/arrow-back.png"

export const Header = ({ isCustomHeader, title, isGoBack = false }: { isCustomHeader?: boolean; title: string; isGoBack?: boolean }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => isGoBack && navigation.goBack()} style={isCustomHeader ? styles.headerCustom : styles.headerCommon}>
            {isGoBack && <Image source={ArrowBack} style={styles.icon_back} />}
            <Text style={isCustomHeader ? styles.title : styles.titleCommon}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerCustom: {
        flexDirection: "column",
    },
    icon_back: {
        width: 24,
        height: 24,
        objectFit: "contain",
    },
    title: {
        marginTop: 5,
        fontWeight: "600",
        fontSize: 34,
    },
    titleCommon: {
        fontWeight: "600",
        fontSize: 24,
        marginBottom: 2,
    },
    headerCommon: {
        marginTop: 20,
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },
})
