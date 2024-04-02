import { StyleSheet, View, Text } from "react-native"
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
})
