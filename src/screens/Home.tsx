import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { NoData } from "../components/NoData"
import { CarouselBookList } from "../components/CarouselBookList"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import Carousel from "react-native-snap-carousel"
import { StarRate } from "../components/StarRate"
import { CloudImage } from "../components/CloudImage"
import { useNavigation } from "@react-navigation/native"
import UserCustomProfileImg from "../../assets/images/custom-user-profile.jpg"

interface IReviewItem extends bookReviewInfo {
    book: bookInfo
}

export const Home = () => {
    const navigation = useNavigation()
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchReViewData } = ReviewApi("list")
    const [bookDataList, setBookDataList] = useState<bookInfo[]>([])
    const [reviewDataList, setReviewDataList] = useState<bookReviewInfo[]>([])

    useEffect(() => {
        fetchBookData({}).then((res) => {
            if (res.result_code === 0) {
                setBookDataList(res.data)
            }
        })

        fetchReViewData({}).then((res) => {
            if (res.result_code === 0) {
                setReviewDataList(res.data)
            }
        })
    }, [])

    const _renderReviewItem = ({ item }: { item: IReviewItem }) => {
        return (
            <View style={styles.reviewWrapper}>
                <CloudImage url={item?.book?.imageLink} styleImg={styles.bookReviewImg} />
                <View style={styles.reviewBookInfo}>
                    <View style={styles.reviewUserInfo}>
                        <Image style={styles.reviewUserProfileImg} source={UserCustomProfileImg} />
                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.reviewUserName}>{item.userName}</Text>
                            <Text style={styles.reviewUserNic}>Book Lover</Text>
                        </View>
                    </View>
                    <StarRate rateNumber={item.rating} />
                    <Text style={styles.reviewBookMessage}>{item.message}</Text>
                </View>
            </View>
        )
    }

    return (
        <Page>
            <Text style={styles.headText}>Home</Text>
            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>New books</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("NotReady" as never)}>
                        <Text style={styles.moreInfoText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View>{bookDataList.length ? <CarouselBookList dataList={bookDataList} /> : <NoData />}</View>
            </View>

            <View style={styles.listWrapper}>
                <View style={styles.listHeaderBlock}>
                    <Text style={styles.listHeadTitle}>Reviews</Text>
                </View>

                <View>
                    {reviewDataList.length ? <Carousel data={reviewDataList} renderItem={_renderReviewItem} sliderWidth={Dimensions.get("window").width} itemWidth={275} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} /> : <NoData />}
                </View>
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

    reviewWrapper: {
        marginRight: 17,
        backgroundColor: "#f9faf8",
        width: 254,
        flex: 1,
        height: 171,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        paddingVertical: 25,
        paddingHorizontal: 19,
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
    },

    bookReviewImg: {
        width: 84,
        height: 120,
        borderRadius: 9,
        objectFit: "cover",
    },

    reviewBookInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    reviewBookMessage: {
        fontSize: 7,
        fontWeight: "600",
        lineHeight: 10,
    },

    reviewUserInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    reviewUserProfileImg: {
        width: 31,
        height: 31,
        borderRadius: 500,
    },

    reviewUserName: {
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 15,
        color: "#000000",
    },

    reviewUserNic: {
        fontSize: 8,
        fontWeight: "600",
        lineHeight: 10,
        color: "#7A7878",
    },
})
