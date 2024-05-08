import { View } from "react-native"
import { Page } from "../../layouts/Page"
import { CarouselBookList } from "../../components/carousel/CarouselBookList"
import { useEffect, useState } from "react"
import { BookApi, bookInfo } from "../../api/bookApi"
import { NoData } from "../../components/NoData"
import { BookShowBlock } from "../../components/BookShowBlock"
import { Header } from "../../components/Header"

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
            <Header isCustomHeader={false} isGoBack title="Genres" />

            <View style={{ marginBottom: 20 }}>
                {Object.keys(bookGenreInfo).map((item, i) => (
                    <BookShowBlock key={i} bookType={item} navigationUrl={`BookMore/${item}`}>
                        <View>{bookGenreInfo[item].length ? <CarouselBookList dataList={bookGenreInfo[item]} /> : <NoData />}</View>
                    </BookShowBlock>
                ))}
            </View>
        </Page>
    )
}
