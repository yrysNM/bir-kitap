import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { NewsApi, newsInfo } from "../api/newsApi"
import { CarouselBookList } from "../components/CarouselBookList"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { BookShowBlock } from "../components/BookShowBlock"
import { CarouselREviewList } from "../components/CarouselReviewList"
import { UserAPI } from "../api/userApi"
import { setCategoryList, setUserInfo } from "../redux/features/mainSlice"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../components/CloudImage"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReaderNews">>

export const Home = () => {
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchReViewData } = ReviewApi("list")
    const { fetchData: fetchUserData } = UserAPI("info")
    const { fetchData: fetchNewsData } = NewsApi("list")
    const { fetchData: fetchCategoryData } = BookApi("category/list")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [news, setNews] = useState<newsInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])
    const { isRefresh } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigateType>()

    useEffect(() => {
        if (!isRefresh) {
            loadData()
        }
    }, [isRefresh])

    const loadData = async () => {
        await fetchNewsData({}).then((res) => {
            if (res.result_code === 0) {
                setNews(res.data)
            }
        })

        await fetchBookData({
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

        fetchCategoryData({}).then((res) => {
            if (res.result_code === 0) {
                dispatch(setCategoryList(JSON.parse(JSON.stringify(res.data))))
            }
        })
    }

    const customContentText = (content: string) => {
        if (content.length > 15) {
            return `${content.slice(0, 15)}...`
        } else {
            return content
        }
    }

    const _renderNews = ({ item }: { item: newsInfo }) => {
        return (
            <TouchableOpacity onPressIn={() => navigation.navigate("ReaderNews", { id: item.id || "" })} style={styles.newsBlock}>
                <CloudImage styleImg={styles.newsImg} url={item.imageLink} />
                <Text style={styles.newsTitle}>{customContentText(item.content)}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Page>
            <Text style={styles.headText}>Home</Text>

            <View style={styles.newsWrapper}>
                <Carousel data={news} renderItem={_renderNews} sliderWidth={Dimensions.get("window").width} itemWidth={170} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
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
