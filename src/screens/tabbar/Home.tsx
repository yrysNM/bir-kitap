import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native"
import { Page } from "../../layouts/Page"
import { bookInfo } from "../../api/bookApi"
import { useEffect, useState } from "react"
import { NewsApi, newsInfo } from "../../api/newsApi"
import { CarouselBookList } from "../../components/carousel/CarouselBookList"
import { bookReviewInfo } from "../../api/reviewApi"
import { useAppDispatch, useAppSelector } from "../../hook/useStore"
import { BookShowBlock } from "../../components/BookShowBlock"
import { CarouselReviewList } from "../../components/carousel/CarouselReviewList"
import { UserAPI } from "../../api/userApi"
import { setLoading, setUserInfo } from "../../redux/features/mainSlice"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../../components/CloudImage"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { SplitText } from "../../helpers/splitText"
import { SkeletonHomeBooksCard, SkeletonHomeNewsCard } from "../../components/SkeletonCards"
import { postInfo } from "../../api/postApi"
import { PostCard } from "../../components/PostCard"
import { Loading } from "../../components/Loading"
import { RecommendationAPI } from "../../api/recommendationApi"
import { NoData } from "../../components/NoData"
import { useTranslation } from "react-i18next"
import { ClubAPI, clubInfo } from "../../api/clubApi"
import { CarouselClubs } from "../../components/carousel/CarouselClubs"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReaderNews">>

export const Home = () => {
    const { fetchData: fetchBookData } = RecommendationAPI("books")
    const { fetchData: fetchReViewData } = RecommendationAPI("reviews")
    const { fetchData: fetchUserData } = UserAPI("info")
    const { fetchData: fetchNewsData } = NewsApi("list")
    const { fetchData: fetchPostsData } = RecommendationAPI("posts")
    const { fetchData: fetchClubData } = ClubAPI("list")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [news, setNews] = useState<newsInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const [posts, setPosts] = useState<postInfo[]>([])
    const [clubList, setClubList] = useState<clubInfo[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isRefresh } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigateType>()
    const { t } = useTranslation()

    useEffect(() => {
        if (!isRefresh) {
            loadData()
        }
    }, [isRefresh])

    const loadData = async () => {
        const info = {
            start: 0,
            length: 10,
        }

        try {
            dispatch(setLoading(false))
            setIsLoading(true)
            const [newsRes, bookRes, reviewRes, postsRes, clubRes, userRes] = await Promise.all([fetchNewsData({}), fetchBookData(info), fetchReViewData(info), fetchPostsData(info), fetchClubData(info), fetchUserData({})])

            if (newsRes.result_code === 0) {
                setNews(newsRes.data)
            }
            if (bookRes.result_code === 0) {
                setBookDataList(JSON.parse(JSON.stringify(bookRes.data)))
            }
            if (reviewRes.result_code === 0) {
                setReviewDataList(JSON.parse(JSON.stringify(reviewRes.data)))
            }
            if (postsRes.result_code === 0) {
                setPosts(JSON.parse(JSON.stringify(postsRes.data)))
            }

            if (clubRes.result_code === 0) {
                setClubList(JSON.parse(JSON.stringify(clubRes.data)))
            }
            if (userRes.result_code === 0) {
                dispatch(setUserInfo(userRes.data))
            }
            setIsLoading(false)
        } catch (error) {
            console.error("Error occurred while fetching data:", error)
        }
    }

    const _renderNews = ({ item }: { item: newsInfo }) => {
        return isLoading && !news.length ? (
            <SkeletonHomeNewsCard />
        ) : (
            <TouchableOpacity onPressIn={() => navigation.navigate("ReaderNews", { id: item.id || "" })} delayPressIn={15} style={styles.newsBlock}>
                <CloudImage styleImg={styles.newsImg} url={item.imageLink} />
                <Text style={styles.newsTitle}>{SplitText(item.content, 25)}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Page>
                <View style={styles.newsWrapper}>
                    {news.length ? <Carousel data={news} renderItem={_renderNews} sliderWidth={Dimensions.get("window").width} itemWidth={180} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} /> : <SkeletonHomeNewsCard />}
                </View>

                <BookShowBlock bookType={t("l_Books")} navigationUrl="BookMore/books">
                    <CarouselBookList dataList={bookDataList} />
                </BookShowBlock>

                <BookShowBlock bookType="Reviews" navigationUrl="Reviews">
                    <CarouselReviewList dataList={reviewDataList} />
                </BookShowBlock>

                <BookShowBlock bookType="Posts" navigationUrl="Posts">
                    {!isLoading ? (
                        <Carousel
                            data={posts}
                            renderItem={({ item }: { item: postInfo }) => (
                                <View style={{ marginRight: 20 }}>
                                    <PostCard postInfo={item} />
                                </View>
                            )}
                            sliderWidth={Dimensions.get("window").width}
                            itemWidth={220}
                            layout={"default"}
                            vertical={false}
                            inactiveSlideOpacity={1}
                            inactiveSlideScale={1}
                            activeSlideAlignment={"start"}
                        />
                    ) : (
                        <SkeletonHomeBooksCard />
                    )}
                    {!posts.length && !isLoading && (
                        <View style={{ width: 100, marginBottom: 20 }}>
                            <NoData />
                        </View>
                    )}
                </BookShowBlock>

                <BookShowBlock bookType="Clubs" navigationUrl="Clubs">
                    <CarouselClubs dataList={clubList} />
                </BookShowBlock>
            </Page>
            {isLoading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    newsWrapper: {
        marginTop: 20,
        marginBottom: 5,
    },
    newsBlock: {
        marginVertical: 2,
        width: 170,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "column",
        gap: 7,
        borderRadius: 16,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
        backgroundColor: "#fff",
    },
    newsImg: {
        width: "100%",
        height: 101,
        borderRadius: 8,
        objectFit: "cover",
    },
    newsTitle: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 15,
        color: "#6D7885",
    },
    services: {
        flexDirection: "column",
        gap: 4,
    },
})
