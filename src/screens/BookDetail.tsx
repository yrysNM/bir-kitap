import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { BookApi, bookInfo } from "../api/bookApi"
import { RootStackParamList } from "../navigation/MainNavigation"
import { StarRate } from "../components/StarRate"
import { CloudImage } from "../components/CloudImage"
import TextareaItem from "@ant-design/react-native/lib/textarea-item"
import Button from "@ant-design/react-native/lib/button"
import { RecommendationAPI } from "../api/recommendationApi"
import { CarouselBookList } from "../components/CarouselBookList"
import { NoData } from "../components/NoData"
import { BookShowBlock } from "../components/BookShowBlock"
import { useAppSelector } from "../hook/useStore"
import ArrowBack from "../../assets/images/arrow-back.png"

type bookReviewInfo = {
    id?: string
    userId: string
    userName: string
    bookId: string
    title: string
    message: string
    rating: number
    createTime: number
    updatetime: number
    avatar: string
}
interface IBookInfo {
    book: bookInfo
    customInfo: {
        review: number
        finish: number
        selected: number
        rating: number
    }
    reviews: bookReviewInfo[]
}

const _reviewTemp = {
    title: "test",
    message: "",
    rating: 0,
}

export const BookDetail = () => {
    const navigate = useNavigation()
    const {
        userInfo: { fullName },
    } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchCreateReviewData } = BookApi("review/create")
    const { fetchData: fetchRecommendationBookData } = RecommendationAPI("books")
    const { id } = useRoute<RouteProp<RootStackParamList, "BookDetail">>().params
    const { fetchData: fetchGetBookData } = BookApi(`get`)
    const [bookInfo, setBookInfo] = useState<IBookInfo | null>(null)
    const [dataList, setDataList] = useState<bookInfo[]>([])
    const [reviewInfo, setReviewInfo] = useState<{ title: string; message: string; rating: number }>(_reviewTemp)

    useEffect(() => {
        loadBookData()
        loadRecommendationBookData()
    }, [])

    const loadBookData = async () => {
        if (id) {
            await fetchGetBookData({
                id,
            }).then((res) => {
                if (res.result_code === 0) {
                    const bookData: IBookInfo = JSON.parse(JSON.stringify(res.data))
                    setBookInfo(bookData)
                }
            })
        }
    }

    const loadRecommendationBookData = () => {
        fetchRecommendationBookData({
            start: 0,
            length: 5,
        }).then((res) => {
            if (res.result_code === 0) {
                setDataList(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }

    const onSubmitReview = () => {
        fetchCreateReviewData({
            bookId: bookInfo?.book.id,
            ...reviewInfo,
        }).then((res) => {
            if (res.result_code === 0) {
                setReviewInfo(_reviewTemp)
                loadBookData()
            }
        })
    }

    return (
        <Page>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Image source={ArrowBack} style={styles.iconBack} />
            </TouchableOpacity>
            <View style={styles.bookWrapper}>
                <CloudImage styleImg={styles.bookImg} url={bookInfo?.book.imageLink} />
                <StarRate rateNumber={bookInfo?.customInfo.rating || 0} size={25} />
                <Text style={styles.bookTitle}>{bookInfo?.book.title}</Text>
                <Text style={styles.bookAuthor}>{bookInfo?.book.author}</Text>

                <View style={styles.statisticWrapper}>
                    <View style={styles.statisticBlock}>
                        <Text style={styles.statisticText}>{bookInfo?.customInfo.finish}</Text>
                        <Text style={styles.statisticTitle}>Прочитали</Text>
                    </View>
                    <View style={styles.statisticBlock}>
                        <Text style={styles.statisticText}>{bookInfo?.customInfo.selected}</Text>
                        <Text style={styles.statisticTitle}>Планируют</Text>
                    </View>
                    <View style={{ ...styles.statisticBlock, borderWidth: 0 }}>
                        <Text style={styles.statisticText}>{bookInfo?.customInfo.review}</Text>
                        <Text style={styles.statisticTitle}>Рецензий</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 35 }}>
                <Text style={styles.descrText}>Description</Text>
                <Text style={styles.bookDescr}>{bookInfo?.book.description}</Text>
            </View>
            <View style={{ marginVertical: 30 }}>
                <Text style={styles.descrText}>Reviews</Text>

                <View style={{ marginTop: 17 }}>
                    <Text style={styles.rateText}>Rating {reviewInfo.rating}/5</Text>
                    <View style={{ marginTop: 10 }}>
                        <StarRate size={25} rateNumber={reviewInfo.rating} onChangeRate={(e) => setReviewInfo({ ...reviewInfo, rating: e })} />
                    </View>
                    <View>
                        <TextareaItem last style={styles.textAreaInput} rows={4} count={400} value={reviewInfo.message} onChange={(e) => setReviewInfo({ ...reviewInfo, message: e || "" })} placeholder="Type review here ..." />
                    </View>
                    <Button type="primary" style={styles.btnReview} onPress={() => onSubmitReview()}>
                        Submit review
                    </Button>
                </View>
                {bookInfo?.reviews.map((review) => (
                    <View key={review.id} style={styles.reviewWrapper}>
                        <View style={styles.reviewProfileBlock}>
                            <CloudImage styleImg={{ width: 32, height: 32 }} url={review.avatar} />
                            <View>
                                <Text style={[styles.reviewUserName, { color: review.userName === fullName ? "#005479" : "#000" }]}>{review.userName}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                    <StarRate rateNumber={review.rating} />
                                    <Text style={styles.reviewNumberRate}>{review.rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.reviewMessage}>{review.message}</Text>
                    </View>
                ))}

                <BookShowBlock bookType="Recommendations" navigationUrl="Recommendations">
                    <View>{dataList.length ? <CarouselBookList dataList={dataList} /> : <NoData />}</View>
                </BookShowBlock>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    listWrapper: {
        width: "100%",
        gap: 25,
        flexDirection: "column",
        marginBottom: 20,
    },
    reviewWrapper: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
        marginBottom: 10,
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
    iconBack: {
        marginTop: 25,
        width: 24,
        height: 24,
        objectFit: "contain",
    },
    bookWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    bookImg: {
        width: 200,
        height: 250,
        borderRadius: 18,
        objectFit: "cover",
        borderWidth: 0.1,
        borderColor: "#212121",
        marginBottom: 17,
    },
    bookTitle: {
        marginTop: 10,
        fontSize: 23,
        fontWeight: "600",
        lineHeight: 23,
        color: "#212121",
    },
    bookAuthor: {
        fontSize: 13,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#6D7885",
    },
    descrText: {
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 20,
        color: "#000000",
        textAlign: "left",
    },
    bookDescr: {
        marginTop: 11,
        marginLeft: 10,
        fontSize: 9,
        fontWeight: "500",
        lineHeight: 15,
        color: "#000000",
    },
    statisticWrapper: {
        marginTop: 21,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
        paddingVertical: 10,
    },
    statisticBlock: {
        paddingHorizontal: 15,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "rgba(122, 120, 120, 1.0)",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "transparent",
        borderStyle: "solid",
    },
    statisticText: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        color: "#212121",
    },
    statisticTitle: {
        fontSize: 10,
        fontWeight: "500",
        lineHeight: 10.565958023071289,
        color: "#212121",
    },
    reviewsWRapper: {
        marginLeft: 11,
        flexDirection: "row",
        gap: 23,
    },
    reviewProfileBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    reviewUserName: {
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 15,
        color: "#212121",
    },
    reviewMessage: {
        fontSize: 10,
        fontWeight: "600",
        lineHeight: 15,
        marginTop: 5,
        marginLeft: 5,
    },
    reviewNumberRate: {
        fontSize: 9,
        fontWeight: "600",
        lineHeight: 9,
        color: "#6D7885",
    },
    rateText: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 18,
        color: "#6D7885",
    },
    textAreaInput: {
        marginTop: 22,
        height: 120,
        width: Dimensions.get("window").width - 32,
        borderRadius: 14,
        paddingLeft: 14,
        paddingTop: 15,
        backgroundColor: "#fff",
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    btnReview: {
        borderRadius: 12,
        backgroundColor: "#0A78D6",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 3.8518519401550293,
        },
        shadowRadius: 3.8518519401550293,
        shadowOpacity: 1,
        borderWidth: 0,
        marginTop: 13,
        marginBottom: 12,
    },
})
