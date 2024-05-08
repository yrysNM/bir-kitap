import { FlatList, ScrollView, StyleSheet, View } from "react-native"
import { Page } from "../../layouts/Page"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { bookInfo } from "../../api/bookApi"
import { RecommendationAPI } from "../../api/recommendationApi"
import { BookCard } from "../../components/BookCard"
import { bookReviewInfo } from "../../api/reviewApi"
import { postInfo } from "../../api/postApi"
import { ReviewCard } from "../../components/ReviewCard"
import { CarouselBookTypeFilter } from "../../components/carousel/CarouselBookTypeFilter"
import { PostCard } from "../../components/PostCard"
import Follow from "../../components/Follow"

export const Recommendations = () => {
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const { fetchData: fetchReviewsData } = RecommendationAPI("reviews")
    const { fetchData: fetchPostsData } = RecommendationAPI("posts")
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

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
        setRecommendationType("Books")
        onLoadData("Books")
    }, [])

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

        setIsRefresh(false)
    }

    const dataList = () => {
        if (recommendationType === "Books") {
            return bookDataList
        } else if (recommendationType === "Reviews") {
            return reviewDataList
        } else if (recommendationType === "Posts") {
            return postDataList
        } else {
            return []
        }
    }

    return (
        <Page isFlatList>
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
                    type={recommendationType}
                />
            </View>

            {recommendationType === "Users" ? (
                <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
                    <Follow />
                </ScrollView>
            ) : (
                <FlatList
                    data={dataList() as []}
                    refreshing={isRefresh}
                    onRefresh={() => {
                        setRecommendationType("Books")
                        onLoadData("Books")
                    }}
                    key={recommendationType === "Books" ? 2 : 1}
                    numColumns={recommendationType === "Books" ? 2 : 1}
                    contentContainerStyle={[recommendationType === "Books" && styles.bookWrapper, recommendationType === "Reviews" && styles.reviewWrapper, { flexGrow: 1, marginTop: 10, paddingBottom: 140 }]}
                    columnWrapperStyle={recommendationType === "Books" ? { gap: recommendationType === "Books" ? 25 : 0 } : null}
                    renderItem={({ item }) => (recommendationType === "Books" ? <BookCard bookInfo={item} /> : recommendationType === "Reviews" ? <ReviewCard reviewInfo={item} /> : recommendationType === "Posts" ? <PostCard postInfo={item} /> : null)}
                />
            )}

            <View style={{ marginBottom: 5, flex: 1, height: "auto" }}></View>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
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
