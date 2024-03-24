import { StyleSheet, View, Text } from "react-native"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { CarouselBookList } from "../components/CarouselBookList"

export const Home = () => {
    const { fetchData: fetchBookData } = BookApi("list")
    // const { fetchData: fetchReViewData } = BookApi("review")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])

    useEffect(() => {
        Promise.all([

            fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setBookDataList(res.data)
                }
            }), 
            // fetchReViewData({}).then(res => {
            //     if(res.result_code === 0) {
            //         set
            //     }
            // })
        ])
    }, [])

    // const _renderReviewItem = () => {

    // }

    return (
        <Page>
            <Text style={styles.headText}>Home</Text>
            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>News</Text>
                    <Text style={styles.moreInfoText}>See All</Text>
                </View>

                <View>{bookDataList.length ? <CarouselBookList dataList={bookDataList} /> : <NoData />}</View>
            </View>

            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>Reviews</Text>
                </View>

                {/* <View>{dataList.length ? <Carousel data={dataList} renderItem={_renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={itemWidth()} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} /> : <NoData />}</View> */}
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
    listWrapper: {
        width: "100%",
        gap: 25,
        flexDirection: "column",
    },
    listHeaderBlock: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
    },
    listHeadTitle: {
        fontSize: 21,
        fontWeight: "700",
        lineHeight: 21,
    },
    moreInfoText: {
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 20,
        color: "#808080",
    },
})
