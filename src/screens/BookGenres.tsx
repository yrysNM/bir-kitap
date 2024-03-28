import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import { CarouselBookList } from "../components/CarouselBookList"
import { useEffect, useState } from "react"
import { BookApi, bookInfo } from "../api/bookApi"
import { NoData } from "../components/NoData"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"

type bookGenreInfo = {
    [key: string]: bookInfo[]
}

export const BookGenres = () => {
    const navigation = useNavigation()
    const { fetchData: fetchBookGenreData } = BookApi("list/genre")
    const [bookGenreInfo, setBookGenreInfo] = useState<bookGenreInfo>({})

    useEffect(() => {
        fetchBookGenreData({}).then((res) => {
            if (res.result_code === 0) {
                const info: bookGenreInfo = JSON.parse(JSON.stringify(res.data))
                setBookGenreInfo(info)
            }
        })
    }, [])

    return (
        <Page>
            <View style={styles.headerBlock}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="left" style={{ fontSize: 35, color: "#000", marginLeft: -10 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Genres</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                {Object.keys(bookGenreInfo).map((item, i) => (
                    <View style={styles.listWrapper} key={i}>
                        <View style={styles.listHeaderBlock}>
                            <Text style={styles.listHeadTitle}>{item}</Text>
                        </View>

                        <View>{bookGenreInfo[item].length ? <CarouselBookList dataList={bookGenreInfo[item]} /> : <NoData />}</View>
                    </View>
                ))}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    headerBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 35,
        marginBottom: 50,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "600",
        lineHeight: 40,
        color: "#000000",
    },
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
})
