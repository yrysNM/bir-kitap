import { StyleSheet, View } from "react-native"
import { Page } from "../../layouts/Page"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { bookInfo } from "../../api/bookApi"
import { RecommendationAPI } from "../../api/recommendationApi"
import { BookCard } from "../../components/BookCard"
import { NoData } from "../../components/NoData"
import { bookReviewInfo } from "../../api/reviewApi"
import { postInfo } from "../../api/postApi"
import { ReviewCard } from "../../components/ReviewCard"
import { CarouselBookTypeFilter } from "../../components/carousel/CarouselBookTypeFilter"
import { useAppSelector } from "../../hook/useStore"
import { PostCard } from "../../components/PostCard"
import Follow from "../../components/Follow"

export const Recommendations = () => {
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const { fetchData: fetchReviewsData } = RecommendationAPI("reviews")
    const { fetchData: fetchPostsData } = RecommendationAPI("posts")
    const { isRefresh } = useAppSelector((state) => state.mainSlice)

    const [recommendationType, setRecommendationType] = useState<string>("Books")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const [postDataList, setPostDataList] = useState<postInfo[]>([])

    const [tabs] = useState<{ title: string }[]>([
        {
            title: "Books",
        },
        {
            title: "Reviews",
        },
        {
            title: "Posts",
        },
        {
            title: "Users",
        },
    ])

    useEffect(() => {
        if (!isRefresh) {
            setRecommendationType("Books")
            onLoadData("Books")
        }
    }, [isRefresh])

    const onLoadData = (e: string) => {
        if (e === "Books") {
            fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setBookDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (e === "Reviews") {
            fetchReviewsData({}).then((res) => {
                if (res.result_code === 0) {
                    setReviewDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (e === "Posts") {
            fetchPostsData({}).then((res) => {
                if (res.result_code === 0) {
                    setPostDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }

    return (
        <Page>
            <Header isCustomHeader={false} title="Recommendations" isGoBack />
            <View style={{ marginVertical: 18 }}>
                <CarouselBookTypeFilter
                    dataList={tabs}
                    handleBookType={(e) => {
                        if (typeof e === "string") {
                            setRecommendationType(e)
                            onLoadData(e)
                        }
                    }}
                    isMultiple={false}
                    type={"Books"}
                />
            </View>

            {recommendationType === "Books" ? (
                <View style={styles.bookWrapper}>{bookDataList.length ? bookDataList.map((book) => <BookCard key={book.id} bookInfo={book} />) : <NoData />}</View>
            ) : recommendationType === "Reviews" ? (
                <View style={styles.reviewWrapper}>{reviewDataList.length ? reviewDataList.map((review) => <ReviewCard key={review.id} reviewInfo={review} />) : <NoData />}</View>
            ) : recommendationType === "Posts" ? (
                <View style={{ marginTop: 10 }}>{postDataList.length ? postDataList.map((post) => <PostCard postInfo={post} key={post.id} />) : <NoData />}</View>
            ) : recommendationType === "Users" ? (
                <Follow />
            ) : null}

            <View style={{ marginBottom: 5, flex: 1, height: "auto" }}></View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        flexWrap: "wrap",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // flex: 2,
        // width: "100%",
        gap: 25,
        marginBottom: 30,
        zIndex: 100,
    },
    reviewWrapper: {
        flexDirection: "column",
        gap: 17,
        justifyContent: "center",
        alignContent: "center",
    },
    tabHeadBlock: {
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: "#fff",
        top: 10,
        width: "100%",
        height: 50,
    },
    bookBlock: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    bookTypeBlock: {
        backgroundColor: "#FFFFFF",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 1.0)",
    },
    bookTypeBlockActive: {
        backgroundColor: "#005479",
        borderWidth: 0,
    },
    bookTypeText: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: "500",
        lineHeight: 15,
        color: "#FFFFFF",
    },
})
