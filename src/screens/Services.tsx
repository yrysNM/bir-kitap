import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import GenresImg from "../../assets/images/category/genres.png"
import ReadersImg from "../../assets/images/category/readers.png"
import NewsImg from "../../assets/images/category/news.png"
import CollectionImg from "../../assets/images/category/collection.png"
import RecomendImg from "../../assets/images/category/recomend.png"
import ReviewsImg from "../../assets/images/category/reviews.png"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"

export const Services = () => {
    const  navigation = useNavigation();
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

    return (
        <Page>
            {/* <SearchInput placeholder="Search books" onChangeSearch={(e) => setSearchValue(e)} /> */}
            <Text style={styles.headText}>Categories & Services</Text>
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

                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate('BookCrossingWebView' as never)}>
                        <View style={styles.categoryBlock}>
                            <Icon name="read" style={{ fontSize: 54, color: "#808080" }} />
                        </View>
                        <Text style={styles.categoryText}>Book crossing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate('BookTracker' as never)}>
                        <View style={styles.categoryBlock}>
                            <Icon name="read" style={{ fontSize: 54, color: "#808080" }} />
                        </View>
                        <Text style={styles.categoryText}>Book Tracker</Text>
                    </TouchableOpacity>
                </View>
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
        color: "#fff",
    },
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
        width: 93,
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
