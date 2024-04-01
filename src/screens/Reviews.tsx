import { View, StyleSheet } from "react-native"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { _renderReviewItem as ReviewCard } from "../components/CarouselReviewList"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"

export const Reviews = () => {
    const { fetchData: fetchReviewData } = ReviewApi("list")
    const [dataList, setDataList] = useState<bookReviewInfo[]>([])

    useEffect(() => {
        fetchReviewData({}).then((res) => {
            if (res.result_code === 0) {
                setDataList(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack title="Reviews" />

            <View style={styles.bookWrapper}>{dataList.length ? dataList.map((item) => <ReviewCard key={item.id} item={item} />) : <NoData />}</View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        // flexWrap: "wrap",
        // flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
})
