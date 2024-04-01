import { View, StyleSheet } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"
import { FirstUpperCaseText } from "../helpers/firstUpperCaseText"
import { BookCard } from "../components/BookCard"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { RecommendationAPI } from "../api/recommendationApi"

export const BookMore = () => {
    const { id } = useRoute<RouteProp<RootStackParamList, "BookMore">>().params
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchRecommendationData } = RecommendationAPI("books")
    const [dataList, setDataList] = useState<bookInfo[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        if (id === "books") {
            fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setDataList(res.data)
                }
            })
        } else if (id === "recommendation") {
            fetchRecommendationData({}).then((res) => {
                if (res.result_code === 0) {
                    setDataList(res.data)
                }
            })
        }
    }

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack title={FirstUpperCaseText(id)} />

            <View style={styles.bookWrapper}>
                <View style={styles.bookWrapper}>{dataList.length ? dataList.map((book) => <BookCard key={book.id} bookInfo={book} />) : <NoData />}</View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginBottom: 30,
    },
})
