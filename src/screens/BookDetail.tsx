import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { BookApi, bookInfo } from "../api/bookApi"
import { RootStackParamList } from "../navigation/MainNavigation"
import { StarRate } from "../components/StarRate"
import { CloudImage } from "../components/CloudImage"
import Icon from "@ant-design/react-native/lib/icon"

type reviewInfo = {
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
    reviews: reviewInfo[]
}

export const BookDetail = () => {
    const navigate = useNavigation()
    const { bookId } = useRoute<RouteProp<RootStackParamList, "BookDetail">>().params
    const { fetchData: fetchGetBookData } = BookApi(`get`)
    const [bookInfo, setBookInfo] = useState<IBookInfo | null>(null)

    useEffect(() => {
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
    }, [])

    return (
        <Page>
            <TouchableOpacity onPress={() => navigate.goBack()}>
                <Icon name="left" style={styles.iconBack} />
            </TouchableOpacity>
            <View style={styles.bookWrapper}>
                <CloudImage styleImg={styles.bookImg} url={bookInfo?.book.imageLink} />
                <StarRate rateNumber={bookInfo?.customInfo.rating || 0} />
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

                <View style={{ marginTop: 35 }}>
                    <Text style={styles.descrText}>Description</Text>
                    <Text style={styles.bookDescr}>{bookInfo?.book.description}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.descrText}>Reviews</Text>
                    <View style={{ marginLeft: 11 }}>
                        <View>
                            <View style={styles.reviewProfileBlock}>
                                <Image source={{ uri: "https://wallpapers.com/images/hd/cute-anime-profile-pictures-k6h3uqxn6ei77kgl.jpg" }} width={32} height={32} style={{ borderRadius: 500 }} />
                                <View>
                                    <Text>Ayala Nayashova</Text>
                                    <StarRate rateNumber={5} />
                                    <Text>5.0</Text>
                                </View>
                            </View>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium cumque id amet maxime non, aliquid a quis praesentium harum quam. Id asperiores consequuntur cupiditate natus alias minus, eveniet numquam distinctio.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
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
    },
})
