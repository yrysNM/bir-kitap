import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Page } from "../layouts/Page"

import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { CloudImage } from "../components/CloudImage"
import BookTrackerImg from "../../assets/images/category/book-tracker.png"
import BookCrossingImage from "../../assets/crossing.png"
import BookTestImg from "../../assets/images/category/book-test.png"
import { useAppSelector } from "../hook/useStore"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList>>

export const Services = () => {
    const { categoryList } = useAppSelector((state) => state.mainSlice)
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
            <Text style={styles.headText}>Categories & Services</Text>
            <View style={styles.serviceCotegory}>
                <Text style={styles.contentTitle}>Services</Text>

                <View style={{ gap: 25, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
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
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate("NotReady" as never)}>
                        <View style={styles.categoryBlock}>
                            <Image source={BookTestImg} style={{ width: 54, height: 54, objectFit: "scale-down" }} />
                        </View>
                        <Text style={styles.categoryText}>Book Test</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 58 }}>
                <Text style={styles.contentTitle}>Categories </Text>
                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(0, 3).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.url)}>
                            <View style={styles.categoryBlock}>
                                <CloudImage url={item.icon} styleImg={{ width: 54, height: 54, objectFit: "scale-down" }} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: 35, gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(3, 6).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.url)}>
                            <View style={styles.categoryBlock}>
                                <CloudImage url={item.icon} styleImg={{ width: 54, height: 54, objectFit: "scale-down" }} />
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
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        lineHeight: 20,
        color: "#000",
    },
    serviceCotegory: {
        marginTop: 42,
    },
    contentTitle: {
        fontSize: 20,
        fontWeight: "400",
        lineHeight: 20,
        color: "#000",
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
        backgroundColor: "#005479",
    },
    categoryText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 16,
        color: "#000",
    },
})
