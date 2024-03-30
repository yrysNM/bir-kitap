import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { CloudImage } from "../components/CloudImage"
import { StarRate } from "../components/StarRate"
// import { useNavigation } from "@react-navigation/native"
// import { BookApi, bookInfo } from "../api/bookApi"
// import { useEffect, useState } from "react"

export const BookMore = () => {
    // const navigation = useNavigation();
    // const { fetchData: fetchBookData } = BookApi("list")
    // const [dataList, setDataList] = useState<bookInfo[]>([])

    // useEffect(() => {
    //     fetchBookData({}).then(res => {
    //         XMLDocument
    //     })
    // }, [])

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack title="New books" />

            <View style={styles.bookWrapper}>
                <TouchableOpacity style={styles.bookCard}>
                    <CloudImage url="https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_640.jpg" styleImg={styles.bookImg} />

                    <View style={styles.bookInfo}>
                        <View>
                            <Text style={styles.bookTitle}>Book name</Text>
                            <Text style={styles.bookGenre}>Book genre</Text>
                        </View>

                        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                            <StarRate rateNumber={5} size={8} />
                            <Text style={styles.bookGenre}>5.0</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        marginTop: 30,
    },
    bookCard: {
        paddingTop: 6,
        paddingHorizontal: 10,
        paddingBottom: 14,
        width: 157,
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
        borderWidth: 0.2,
        borderColor: "#000",
        borderStyle: "solid",
        flex: 1,
        flexDirection: "column",
        gap: 7,
    },
    bookImg: {
        height: 179,
        borderRadius: 9,
        objectFit: "cover",
    },
    bookInfo: {
        gap: 5,
    },
    bookTitle: {
        fontSize: 9,
        fontWeight: "600",
        lineHeight: 9,
        color: "#000000",
    },
    bookGenre: {
        fontSize: 7,
        fontWeight: "600",
        lineHeight: 9,
        color: "#7A7878",
    },
})
