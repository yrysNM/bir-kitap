import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { BookApi, bookInfo } from "../api/bookApi"
import { RootStackParamList } from "../navigation/MainNavigation"
import { StarRate } from "../components/StarRate"
import { CloudImage } from "../components/CloudImage"
import Icon from "@ant-design/react-native/lib/icon"
import TextareaItem from "@ant-design/react-native/lib/textarea-item"
import Button from "@ant-design/react-native/lib/button"
import UserCustomProfileImg from "../../assets/images/custom-user-profile.jpg"

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
    const { fetchData: fetchCreateReviewData } = BookApi("review/create")
    const { bookId } = useRoute<RouteProp<RootStackParamList, "BookDetail">>().params
    const { fetchData: fetchGetBookData } = BookApi(`get`)
    const [bookInfo, setBookInfo] = useState<IBookInfo | null>(null)
    const [reviewInfo, setReviewInfo] = useState<{ title: string; message: string; rating: number }>(_reviewTemp)

    useEffect(() => {
        loadBookData()
    }, [])

    const loadBookData = () => {
        if (bookId) {
            fetchGetBookData({
                id: bookId,
            }).then((res) => {
                if (res.result_code === 0) {
                    const bookData: IBookInfo = JSON.parse(JSON.stringify(res.data))
                    setBookInfo(bookData)
                }
            })
        }
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
                <Icon name="left" style={styles.iconBack} />
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
            <View style={{ marginTop: 30 }}>
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
                    <View key={review.id}>
                        <View style={styles.reviewProfileBlock}>
                            <Image source={UserCustomProfileImg} style={{ borderRadius: 500, width: 32, height: 32 }} />
                            <View>
                                <Text style={styles.reviewUserName}>{review.userName}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                    <StarRate rateNumber={review.rating} />
                                    <Text style={styles.reviewNumberRate}>{review.rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.reviewMessage}>{review.message}</Text>
                    </View>
                ))}

                {/* TODO  <View>{bookDataList.length ? <CarouselBookList dataList={bookDataList} /> : <NoData />}</View> */}
                {/* <View style={styles.listWrapper}>
                    <View style={styles.listHeaderBlock}>
                        <Text style={styles.listHeadTitle}>Best Sellers</Text>
                    </View>

                </View> */}
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
        fontSize: 30,
        color: "#000",
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
        borderColor: "#000",
        marginBottom: 17,
    },
    bookTitle: {
        marginTop: 10,
        fontSize: 23,
        fontWeight: "600",
        lineHeight: 23,
        color: "#000000",
    },
    bookAuthor: {
        fontSize: 13,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#7A7878",
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
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        paddingVertical: 5,
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
        color: "#000000",
    },
    statisticTitle: {
        fontSize: 10,
        fontWeight: "500",
        lineHeight: 10.565958023071289,
        color: "#000000",
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
        marginTop: 23,
    },
    reviewUserName: {
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 15,
        color: "#000000",
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
        color: "#7A7878",
    },
    rateText: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 18,
        color: "#7A7878",
    },
    textAreaInput: {
        marginTop: 22,
        height: 120,
        width: Dimensions.get("window").width - 32,
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
        borderRadius: 14,
        paddingLeft: 14,
        paddingTop: 25,
    },
    btnReview: {
        borderRadius: 14,
        backgroundColor: "#005479",
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
