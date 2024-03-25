import { Text, StyleSheet, View } from "react-native"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"

export const Search = () => {
    return (
        <Page>
            <Text style={styles.headText}>Search</Text>

            <View>
                <Icon name="search" />
                <Text>Search books</Text>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        opacity: 0.5,
        color: "#000000",
    },
})
