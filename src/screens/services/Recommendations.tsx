import { FlatList, StyleSheet, View } from "react-native"
import { Page } from "../../layouts/Page"
import { useEffect, useMemo, useState } from "react"
import { Header } from "../../components/Header"
import { bookInfo } from "../../api/bookApi"
import { RecommendationAPI } from "../../api/recommendationApi"
import { BookCard } from "../../components/BookCard"
import { bookReviewInfo } from "../../api/reviewApi"
import { postInfo } from "../../api/postApi"
import { ReviewCard } from "../../components/ReviewCard"
import { CarouselBookTypeFilter } from "../../components/carousel/CarouselBookTypeFilter"
import { PostCard } from "../../components/PostCard"
import { IRecommendationUser } from "../../api/authApi"
import FollowUserCard from "../../components/FollowUserCard"
import { SearchInput } from "../../components/SearchInput"

export const Recommendations = () => {
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const { fetchData: fetchReviewsData } = RecommendationAPI("reviews")
    const { fetchData: fetchPostsData } = RecommendationAPI("posts")
    const { fetchData: fetchUsersData } = RecommendationAPI("users")
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const [searchUser, setSearchUser] = useState<string | null>(null)
    const [recommendationType, setRecommendationType] = useState<string>("Books")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const [postDataList, setPostDataList] = useState<postInfo[]>([])
    const [userDataList, setUserDataList] = useState<IRecommendationUser[]>([])

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

    const searchList = useMemo(() => {
        if (searchUser && searchUser.length > 0) {
            return userDataList.filter((user) => user.fullName.toLowerCase().includes(searchUser.toLowerCase()))
        }

        return userDataList
    }, [searchUser, userDataList])

    const onLoadData = async (e: string) => {
        if (isUpdateRequest(e, bookDataList, "Books")) {
            await fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setBookDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (isUpdateRequest(e, reviewDataList, "Reviews")) {
            await fetchReviewsData({}).then((res) => {
                if (res.result_code === 0) {
                    setReviewDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (isUpdateRequest(e, postDataList, "Posts")) {
            await fetchPostsData({}).then((res) => {
                if (res.result_code === 0) {
                    setPostDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (isUpdateRequest(e, userDataList, "Users")) {
            await fetchUsersData({}).then((res) => {
                if (res.result_code === 0) {
                    setUserDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }

    const dataList = () => {
        switch (recommendationType) {
            case "Books":
                return bookDataList
            case "Reviews":
                return reviewDataList
            case "Posts":
                return postDataList
            case "Users":
                return searchList
            default:
                return []
        }
    }

    const isUpdateRequest = (tabValue: string, dataList: unknown[], typeDataList: string) => {
        return (!dataList.length || isRefresh) && tabValue === typeDataList
    }

    useEffect(() => {
        if (isRefresh) {
            onLoadData(recommendationType)
        }
    }, [isRefresh])

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

            {recommendationType === "Users" && (
                <View style={{ paddingVertical: 10 }}>
                    <SearchInput onEnterSearch={(e) => setSearchUser(e)} placeholder="Search users" />
                </View>
            )}

            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshing={isRefresh}
                onRefresh={async () => {
                    setIsRefresh(true)
                    setTimeout(() => {
                        setIsRefresh(false)
                    }, 100)
                }}
                data={dataList() as []}
                key={recommendationType === "Books" ? 2 : 1}
                numColumns={recommendationType === "Books" ? 2 : 1}
                contentContainerStyle={[recommendationType === "Books" && styles.bookWrapper, recommendationType === "Reviews" && styles.reviewWrapper, { flexGrow: 1, marginTop: 10, paddingBottom: 140 }]}
                columnWrapperStyle={recommendationType === "Books" ? { gap: recommendationType === "Books" ? 25 : 0 } : null}
                renderItem={({ item }) => {
                    switch (recommendationType) {
                        case "Books":
                            return <BookCard bookInfo={item} />
                        case "Reviews":
                            return <ReviewCard reviewInfo={item} />
                        case "Posts":
                            return <PostCard postInfo={item} />
                        case "Users":
                            return (
                                <FollowUserCard
                                    user={item}
                                    onToggleFollow={(e) =>
                                        setUserDataList(
                                            userDataList.map((item) => {
                                                if (item.id === e.id) {
                                                    return e
                                                }
                                                return item
                                            }),
                                        )
                                    }
                                />
                            )
                        default:
                            return null
                    }
                }}
            />

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
