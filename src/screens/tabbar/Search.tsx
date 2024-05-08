import { Text, StyleSheet, View } from "react-native"
import { Page } from "../../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import { SearchInput } from "../../components/SearchInput"
import { useEffect, useState } from "react"
import { BookCard } from "../../components/BookCard"
import { BookApi, bookInfo, categoryInfo } from "../../api/bookApi"
import { CarouselBookTypeFilter } from "../../components/carousel/CarouselBookTypeFilter"
import { NoData } from "../../components/NoData"
import { SelectGenres } from "../../components/SelectGenres"
import Modal from "@ant-design/react-native/lib/modal"
import { GenreAPI } from "../../api/genreApi"

export const Search = () => {
    const { fetchData: fetchBookData } = BookApi("list")
    const { fetchData: fetchGenreData } = GenreAPI("list")
    const { fetchData: fetchCategoryData } = BookApi("category/list")

    const [genreList, setGenreList] = useState<{ id: string; title: string }[]>([])

    const [categoryList, setCategoryList] = useState<categoryInfo[]>([])
    const [search, setSearch] = useState<string>("")
    const [selectCategories, setSelectCategories] = useState<string[]>([])
    const [selectGenres, setSelectGenres] = useState<string[]>([])
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [bookList, setBookList] = useState<bookInfo[]>([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await fetchCategoryData({}).then((res) => {
            if (res.result_code === 0) {
                setCategoryList(JSON.parse(JSON.stringify(res.data)))
            }
        })

        fetchGenreData({}).then((res) => {
            if (res?.result_code === 0) {
                setGenreList(res.data)
            }
        })
    }

    useEffect(() => {
        if (!search.length && !selectCategories.length && !selectGenres.length) {
            setBookList([])
            return
        }

        fetchBookData({
            title: search,
            filter: {
                genres: selectGenres,
                categories: selectCategories,
            },
        }).then((res) => {
            if (res?.result_code === 0) {
                setBookList(res.data)
            }
        })
    }, [search, JSON.stringify(selectCategories), JSON.stringify(selectGenres)])

    return (
        <Page>
            <View style={{ marginTop: 20 }}>
                <SearchInput onEnterSearch={(e) => setSearch(e)} onClickFilter={() => setVisibleModal(true)} placeholder="Search books" />
            </View>
            <View style={{ marginTop: 18 }}>
                <CarouselBookTypeFilter dataList={categoryList} handleBookType={(e) => (typeof e === "object" ? setSelectCategories(e) : null)} isMultiple={true} />
            </View>
            {!bookList.length ? (
                <View style={styles.searchBlock}>
                    <Icon name="search" style={styles.searchIcon} />
                    <Text style={styles.searchText}>Search books</Text>
                </View>
            ) : (
                <View style={styles.bookWrapper}>{bookList.length ? bookList.map((book, i) => <BookCard key={i} bookInfo={book} />) : <NoData />}</View>
            )}
            <Modal popup animationType="slide-up" visible={visibleModal} onClose={() => setVisibleModal(false)} style={styles.modalWrapper} maskClosable>
                <SelectGenres
                    onSelect={(e) => {
                        setVisibleModal(false)
                        setSelectGenres(e)
                    }}
                    dataList={genreList}
                    selectedGenres={selectGenres}
                />
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        paddingTop: 15,
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    bookWrapper: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
    searchBlock: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: -1,
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
