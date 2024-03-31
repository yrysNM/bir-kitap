import { View, StyleSheet } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
// import { BookCard } from "../components/BookCard"
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
                {/* <BookCard /> */}
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
})
