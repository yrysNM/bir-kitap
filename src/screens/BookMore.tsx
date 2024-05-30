import { View, StyleSheet, FlatList } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"
import { FirstUpperCaseText } from "../helpers/firstUpperCaseText"
import { BookCard } from "../components/entities/BookCard"
import { bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { RecommendationAPI } from "../api/recommendationApi"

export const BookMore = () => {
    const { id } = useRoute<RouteProp<RootStackParamList, "BookMore">>().params
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const [dataList, setDataList] = useState<bookInfo[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        if (id === "books") {
            fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }

    return (
        <Page isFlatList>
            <Header isCustomHeader={false} isGoBack title={FirstUpperCaseText(id)} />

            <View style={{ flex: 1 }}>
                {dataList.length ? <FlatList data={dataList} numColumns={2} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bookWrapper} columnWrapperStyle={{ gap: 25 }} renderItem={({ item }) => <BookCard bookInfo={item} />} /> : <NoData />}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        flexGrow: 1,
        paddingVertical: 20,
    },
})
