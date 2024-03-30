import { Text, View, StyleSheet } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { CloudImage } from "../components/CloudImage"
import { StarRate } from "../components/StarRate"
import Button from "@ant-design/react-native/lib/button"

export const BookMore = () => {
    return (
        <Page>
            <Header isCustomHeader title="New books" />

            <View style={styles.bookWrapper}>
                <View style={styles.bookCard}>
                    <CloudImage url="https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_640.jpg" />

                    <View>
                        <Text>Book name</Text>
                        <Text>Book genre</Text>

                        <StarRate rateNumber={5} />
                    </View>

                    <Button type="primary">Read a book</Button>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
    },
    bookCard: {
        paddingTop: 6,
        paddingHorizontal: 10,
        paddingBottom: 14,
        height: 265,
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
        flex: 1,
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
    },
})
