import { Text, StyleSheet, View } from "react-native"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import { SearchInput } from "../components/SearchInput"
import { useCallback, useEffect, useState } from "react"
import { BookCard } from "../components/BookCard"
import { BookApi, bookInfo } from "../api/bookApi"
import { CarouselBookTypeFilter } from "../components/CarouselBookTypeFilter"
import { NoData } from "../components/NoData"
import { useAppSelector } from "../hook/useStore"

export const Search = () => {
    const { categoryList } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchBookData } = BookApi("list")
    const [search, setSearch] = useState<string>("")
    const [selectCategories, setSelectCategories] = useState<string[]>([])
    const [bookList, setBookList] = useState<bookInfo[]>([])

    useEffect(() => {
        onSearchBook()
    }, [search, JSON.stringify(selectCategories)])

    const onSearchBook = useCallback(() => {
        if (!search.length && !selectCategories.length) {
            setBookList([])
            return
        }

        fetchBookData({
            title: search,
            filter: {
                genres: selectCategories,
            },
        }).then((res) => {
            if (res.result_code === 0) {
                setBookList(res.data)
            }
        })
    }, [search, JSON.stringify(selectCategories)])

    return (
        <Page>
            <Text style={styles.headText}>Search</Text>
            <SearchInput onEnterSearch={(e) => setSearch(e)} placeholder="Search books" />
            <View style={{ marginTop: 18 }}>
                <CarouselBookTypeFilter dataList={categoryList} handleBookType={(e) => (typeof e === "object" ? setSelectCategories(e) : null)} isMultiple={true} />
            </View>
            {!bookList.length ? (
                <View style={styles.searchBlock}>
                    <Icon name="search" style={styles.searchIcon} />
                    <Text style={styles.searchText}>Search books</Text>
                </View>
            ) : (
                <View style={styles.bookWrapper}>{bookList.length ? bookList.map((book) => <BookCard key={book.id} bookInfo={book} />) : <NoData />}</View>
            )}
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        opacity: 0.5,
        color: "#000000",
    },
    searchBlock: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    searchIcon: {
        fontSize: 82,
        color: "#BABABA",
    },
    searchText: {
        fontSize: 23,
        fontWeight: "500",
        lineHeight: 23,
        color: "#808080",
        marginTop: 13,
    },
})
