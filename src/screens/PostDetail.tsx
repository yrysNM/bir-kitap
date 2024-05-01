import { View, Text, StyleSheet } from "react-native"
import { Page } from "../layouts/Page"

export const PostDetail = () => {
    return (
        <Page>
            <View style={styles.postWrapper}>
                <Text>Post detail</Text>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})
