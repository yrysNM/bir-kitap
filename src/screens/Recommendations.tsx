import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import Tabs from "@ant-design/react-native/lib/tabs"
import { TabBarPropsType } from "@ant-design/react-native/lib/tabs/PropsType"
import Carousel from "react-native-snap-carousel"
import { Header } from "../components/Header"
import View from "@ant-design/react-native/lib/view"
import { bookInfo } from "../api/bookApi"
import { RecommendationAPI } from "../api/recommendationApi"
import { BookCard } from "../components/BookCard"
import { NoData } from "../components/NoData"
import { bookReviewInfo } from "../api/reviewApi"
import { postInfo } from "../api/postApi"
import { IUserInfo } from "../api/authApi"
import { ReviewCard } from "../components/ReviewCard"
import { NotReady } from "./NotReady"

export const Recommendations = () => {
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const { fetchData: fetchReviewsData } = RecommendationAPI("reviews")
    const { fetchData: fetchPostsData } = RecommendationAPI("posts")
    const { fetchData: fetchUsersData } = RecommendationAPI("users")

    const [recommendationType, setRecommendationType] = useState<string>("Books")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const [postDataList, setPostDataList] = useState<postInfo[]>([])
    const [userDataList, setUserDataList] = useState<IUserInfo[]>([])
    const [height, setHeight] = useState<number>(100)

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
        if (recommendationType === "Books") {
            fetchBookData({}).then((res) => {
                if (res.result_code === 0) {
                    setBookDataList(res.data)
                }
            })
        } else if (recommendationType === "Reviews") {
            fetchReviewsData({}).then((res) => {
                if (res.result_code === 0) {
                    setReviewDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else if (recommendationType === "Posts") {
            fetchPostsData({}).then((res) => {
                if (res.result_code === 0) {
                    setPostDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        } else {
            fetchUsersData({}).then((res) => {
                if (res.result_code === 0) {
                    setUserDataList(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }, [recommendationType])

    const isSelectRecommendationType = (type: string) => {
        return recommendationType === type
    }

    const tabHeader = (tabProps: TabBarPropsType) => {
        const { goToTab, onTabClick } = tabProps

        const _renderRecommendationTypes = ({ item, index }: { item: { title: string }; index: number }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        onTabClick && onTabClick(tabs[index], index)
                        goToTab && goToTab(index)
                        // onChangeTab()
                        setRecommendationType(item.title)
                    }}
                    style={[styles.bookBlock, isSelectRecommendationType(item.title) ? styles.bookTypeBlockActive : styles.bookTypeBlock]}>
                    <Text style={{ ...styles.bookTypeText, color: isSelectRecommendationType(item.title) ? "#fff" : "#000" }}>{item.title}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.tabHeadBlock}>
                <Carousel data={tabs} renderItem={_renderRecommendationTypes} sliderWidth={Dimensions.get("window").width} itemWidth={120} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
            </View>
        )
    }

    return (
        <Page>
            <Header isCustomHeader={false} title="Recommendations" isGoBack />
            <View style={{ marginBottom: 5, flex: 1, height: "auto" }}>
                <Tabs tabs={tabs} swipeable={false} renderTabBar={(tabProps) => tabHeader(tabProps)} animated={false}>
                    {/* books */}
                    <View>
                        <View style={{ marginTop: 30, height: 800 }}>
                            <View style={styles.bookWrapper}>{bookDataList.length ? bookDataList.map((book) => <BookCard key={book.id} bookInfo={book} />) : <NoData />}</View>
                        </View>
                    </View>
                    {/* reviews */}
                    <View>
                        <View style={{ marginTop: 30 }}>
                            <View style={styles.reviewWrapper}>{reviewDataList.length ? reviewDataList.map((review) => <ReviewCard key={review.id} reviewInfo={review} />) : <NoData />}</View>
                        </View>
                    </View>
                    {/* posts */}
                    <View>
                        <NotReady />
                    </View>
                    {/* users */}
                    <View>
                        <NotReady />
                    </View>
                </Tabs>
            </View>
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
