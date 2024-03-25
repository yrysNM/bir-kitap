import { Text, View, Image, StyleSheet } from "react-native"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import { SearchInput } from "../components/SearchInput"
import GenresImg from "../../assets/images/category/genres.png"
import ReadersImg from "../../assets/images/category/readers.png"
import NewsImg from "../../assets/images/category/news.png"
import CollectionImg from "../../assets/images/category/collection.png"
import RecomendImg from "../../assets/images/category/recomend.png"
import ReviewsImg from "../../assets/images/category/reviews.png"
import Icon from "@ant-design/react-native/lib/icon"

export const Services = () => {
    const [searchValue, setSearchValue] = useState<string>("")
    const categoryList = [
        {
            title: "Genres",
            image: GenresImg,
        },
        {
            title: "News",
            image: NewsImg,
        },
        {
            title: "Collection",
            image: CollectionImg,
        },
        {
            title: "Recomend",
            image: RecomendImg,
        },
        {
            title: "Reviews",
            image: ReviewsImg,
        },
        {
            title: "Readers",
            image: ReadersImg,
        },
    ]

    useEffect(() => {
        console.log(searchValue)
    }, [])
    return (
        <Page>
            <SearchInput placeholder="Search books" onChangeSearch={(e) => setSearchValue(e)} />
            <View style={styles.serviceCotegory}>
                <Text style={styles.contentTitle}>Categories </Text>
                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(0, 3).map((item, i) => (
                        <View style={styles.categoryWrapper} key={i}>
                            <View style={styles.categoryBlock}>
                                <Image style={{ width: 54, height: 54, objectFit: "scale-down" }} source={item.image} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ marginTop: 35, gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(3, 6).map((item, i) => (
                        <View style={styles.categoryWrapper} key={i}>
                            <View style={styles.categoryBlock}>
                                <Image style={{ width: 54, height: 54, objectFit: "scale-down" }} source={item.image} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{ marginTop: 58 }}>
                <Text style={styles.contentTitle}>Services</Text>

                <View style={{ marginTop: 35, gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={styles.categoryWrapper}>
                        <View style={styles.categoryBlock}>
                            <Icon name="read" style={{fontSize: 54}}/>
                        </View>
                        <Text style={styles.categoryText}>Book crossing</Text>
                    </View>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    serviceCotegory: {
        marginTop: 42,
    },
    contentTitle: {
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 20,
        color: "#FFFFFF",
        marginBottom: 27,
    },
    categoryWrapper: {
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 5,
    },
    categoryBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 29,
        backgroundColor: "#F9FAF8",
    },
    categoryText: {
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 16,
        color: "#FFFFFF",
    },
})
