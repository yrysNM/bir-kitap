import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
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
                        <Text>{bookInfo?.customInfo.finish}</Text>
                        <Text>Прочитали</Text>
                    </View>
                    <View style={styles.statisticBlock}>
                        <Text>{bookInfo?.customInfo.selected}</Text>
                        <Text>Планируют</Text>
                    </View>
                    <View style={{ ...styles.statisticBlock, borderWidth: 0 }}>
                        <Text>{bookInfo?.customInfo.review}</Text>
                        <Text>Рецензий</Text>
                    </View>
                </View>

                <View style={{ marginTop: 35 }}>
                    <Text style={styles.descrText}>Description </Text>
                    <Text style={styles.bookDescr}>{bookInfo?.book.description}</Text>
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
        objectFit: "contain",
    },
    bookTitle: {
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
})
