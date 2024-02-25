import { Text, View, StyleSheet } from "react-native"
import Icon from "@ant-design/react-native/lib/icon"

export const Header = ({ isCustomHeader, title }: { isCustomHeader: boolean; title: string }) => {
    return (
        <View style={styles.header}>
            <Icon name="arrow-left" />
            <Text>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20, 
        paddingHorizontal: 30,
        flexDirection: "column",
        gap: 45, 

    },
})
