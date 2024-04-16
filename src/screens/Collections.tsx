import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { BookApi, bookInfo } from "../api/bookApi"
import { View, StyleSheet } from "react-native"
import { CarouselBookTypeFilter } from "../components/CarouselBookTypeFilter"
import { NoData } from "../components/NoData"
import { BookCard } from "../components/BookCard"

export const Collections = () => {
    const [collectionList, setCollectionList] = useState<{ [key: string]: bookInfo[] }>({})
    const { fetchData: fetchCollectionData } = BookApi("list/collections")
    const [collectionType, setCollectionType] = useState<string>("Bestsellers")

    useEffect(() => {
        fetchCollectionData({}).then((res) => {
            if (res.result_code === 0) {
                setCollectionList(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    const collectionsTypes = Object.keys(collectionList)
    return (
        <Page>
            <Header isCustomHeader={false} isGoBack title="Collections" />

            {collectionsTypes.length ? (
                <>
                    <View style={{ marginTop: 18 }}>
                        <CarouselBookTypeFilter dataList={collectionsTypes.map((item) => ({ title: item }))} handleBookType={(e) => (typeof e === "string" ? setCollectionType(e) : null)} isMultiple={false} type={collectionType} />
                    </View>
                    <View style={styles.bookWrapper}>{collectionList[collectionType]?.length ? collectionList[collectionType].map((item) => <BookCard key={item.id} bookInfo={item} />) : <NoData />}</View>
                </>
            ) : (
                <NoData />
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
})
