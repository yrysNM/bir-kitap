import { StyleSheet, View, Text, Image } from "react-native"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { CarouselBookList } from "../components/CarouselBookList"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { BookShowBlock } from "../components/BookShowBlock"
import { CarouselREviewList } from "../components/CarouselReviewList"
import { UserAPI } from "../api/userApi"
import { setUserInfo } from "../redux/features/mainSlice"

export const Home = () => {
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchReViewData } = ReviewApi("list")
    const { fetchData: fetchUserData } = UserAPI("info")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const { isRefresh } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isRefresh) {
            fetchBookData({
                start: 0,
                length: 10,
            }).then((res) => {
                if (res.result_code === 0) {
                    setBookDataList(res.data)
                }
            })

            fetchReViewData({
                start: 0,
                length: 5,
            }).then((res) => {
                if (res.result_code === 0) {
                    setReviewDataList(res.data)
                }
            })

            fetchUserData({}).then((res) => {
                if (res.result_code === 0) {
                    dispatch(setUserInfo(res.data))
                }
            })
        }
    }, [isRefresh])

    return (
        <Page>
            <Text style={styles.headText}>Home</Text>

            <View style={styles.newsWrapper}>
                <View style={styles.newsBlock}>
                    <Image style={styles.newsImg} source={{ uri: "https://static.vecteezy.com/system/resources/previews/023/856/960/large_2x/summer-seasonal-anime-style-background-landscape-mountain-lake-and-relax-vibes-anime-background-or-wallpaper-generative-ai-free-photo.jpg" }} />
                    <Text style={styles.newsTitle}>15 января - 18 января</Text>
                </View>
            </View>

            <BookShowBlock bookType="Books" navigationUrl="BookMore/books">
                <View>{bookDataList.length ? <CarouselBookList dataList={bookDataList} /> : <NoData />}</View>
            </BookShowBlock>

            <BookShowBlock bookType="Reviews" navigationUrl="Reviews">
                <View>{reviewDataList.length ? <CarouselREviewList dataList={reviewDataList} /> : <NoData />}</View>
            </BookShowBlock>
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
    newsWrapper: {
        marginTop: 25,
        marginBottom: 4,
    },
    newsBlock: {
        flexDirection: "column",
        gap: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    newsImg: {
        width: 152,
        height: 101,
        borderRadius: 8,
        objectFit: "cover",
    },
    newsTitle: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 15,
        color: "#808080",
    },
})
