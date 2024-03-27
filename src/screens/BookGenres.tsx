import { StyleSheet, View, Text } from "react-native"
import { Page } from "../layouts/Page"
import { CarouselBookList } from "../components/CarouselBookList"
import { useEffect, useState } from "react"
import { BookApi, bookInfo } from "../api/bookApi"
import { NoData } from "../components/NoData"

type bookGenreInfo = {
    [key: string]: bookInfo[]
}

export const BookGenres = () => {
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
            <View>
                <Text>Genres</Text>
            </View>

            <View>
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
