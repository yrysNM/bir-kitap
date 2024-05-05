import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Page } from "../../layouts/Page"

import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import BookTrackerImg from "../../../assets/images/category/book-tracker.png"
import BookCrossingImage from "../../../assets/images/category/crossing.png"
import BookTestImg from "../../../assets/images/category/book-test.png"
import ReadersImg from "../../../assets/images/category/readers.png"
import ReviewsImg from "../../../assets/images/category/reviews.png"
import RecommendImg from "../../../assets/images/category/recomend.png"
import CollectionImg from "../../../assets/images/category/collection.png"
import ClubImg from "../../../assets/images/category/club.png"
import GenresImg from "../../../assets/images/category/genres.png"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList>>

export const Services = () => {
    const categoryList = [
        {
            title: "Genres",
            icon: GenresImg,
            url: "BookGenres",
        },
        {
            title: "Clubs",
            icon: ClubImg,
            url: "Clubs",
        },
        {
            title: "Collections",
            icon: CollectionImg,
            url: "Collections",
        },
        {
            title: "Recomend",
            icon: RecommendImg,
            url: "Recommendations",
        },
        {
            title: "Reviews",
            icon: ReviewsImg,
            url: "Reviews",
        },
        {
            title: "Readers",
            icon: ReadersImg,
            url: "ReadersUser",
        },
    ]
    const navigation = useNavigation<NavigateType>()

    const onLink = (linkName?: string) => {
        if (linkName && linkName !== "url") {
            const navigationList = linkName.split("/")
            const isHaveQuery = navigationList.length > 1
            if (!isHaveQuery) {
                navigation.navigate(linkName as never)
            } else {
                navigation.navigate(navigationList[0] as navigationDetail, { id: navigationList[1] })
            }
        } else {
            navigation.navigate("NotReady" as never)
        }
    }

    return (
        <Page>
            <View style={styles.serviceCotegory}>
                <Text style={styles.contentTitle}>Services</Text>

                <View style={{ gap: 25, flexDirection: "row", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate("BookTrackerWebView" as never)}>
                        <View style={styles.categoryBlock}>
                            <Image source={BookTrackerImg} style={{ width: 54, height: 54, objectFit: "cover" }} />
                        </View>
                        <Text style={styles.categoryText}>Book Tracker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate("BookCrossingWebView" as never)}>
                        <View style={styles.categoryBlock}>
                            <Image source={BookCrossingImage} style={{ width: 54, height: 54, objectFit: "contain" }} />
                        </View>
                        <Text style={styles.categoryText}>Book crossing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate("BookTestWebView" as never)}>
                        <View style={styles.categoryBlock}>
                            <Image source={BookTestImg} style={{ width: 54, height: 54, objectFit: "scale-down" }} />
                        </View>
                        <Text style={styles.categoryText}>Book Test</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 58 }}>
                <Text style={styles.contentTitle}>Categories </Text>
                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {categoryList.slice(0, 3).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.url)}>
                            <View style={styles.categoryBlock}>
                                <Image source={item.icon} style={{ width: 54, height: 54, objectFit: "scale-down" }} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: 35, gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {categoryList.slice(3, 6).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.url)}>
                            <View style={styles.categoryBlock}>
                                <Image source={item.icon} style={{ width: 54, height: 54, objectFit: "scale-down" }} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
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
        fontWeight: "400",
        lineHeight: 20,
        color: "#212121",
        marginBottom: 17,
    },
    categoryWrapper: {
        alignItems: "center",
        flexDirection: "column",
        flexWrap: "wrap",
        width: 95,
        gap: 5,
    },
    categoryBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowRadius: 1,
        elevation: 6,
        shadowOpacity: 1,
    },
    categoryText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 16,
        color: "#212121",
    },
})
