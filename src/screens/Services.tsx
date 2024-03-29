import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"

import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"
import { BookApi, categoryInfo } from "../api/bookApi"
import { useEffect, useState } from "react"
import { CloudImage } from "../components/CloudImage"

export const Services = () => {
    const { fetchData: fetchCategoryData } = BookApi("category/list")
    const [categoryList, setCategoryList] = useState<categoryInfo[]>([])
    const navigation = useNavigation()

    useEffect(() => {
        fetchCategoryData({}).then((res) => {
            if (res.result_code === 0) {
                const categoryInfo: categoryInfo[] = JSON.parse(JSON.stringify(res.data))

                setCategoryList(
                    categoryInfo.map((item) => {
                        if (item.title === "Genres") {
                            return {
                                ...item,
                                linkName: "BookGenres",
                            }
                        }
                        return item
                    }),
                )
            }
        })
    }, [])

    const onLink = (linkName?: string) => {
        if (linkName) {
            navigation.navigate(linkName as never)
        }
    }

    return (
        <Page>
            {/* <SearchInput placeholder="Search books" onChangeSearch={(e) => setSearchValue(e)} /> */}
            <Text style={styles.headText}>Categories & Services</Text>
            <View style={styles.serviceCotegory}>
                <Text style={styles.contentTitle}>Categories </Text>
                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(0, 3).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.linkName)}>
                            <View style={styles.categoryBlock}>
                                <CloudImage url={item.icon} styleImg={{ width: 54, height: 54, objectFit: "scale-down" }} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: 35, gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {categoryList.slice(3, 6).map((item, i) => (
                        <TouchableOpacity style={styles.categoryWrapper} key={i} onPress={() => onLink(item.linkName)}>
                            <View style={styles.categoryBlock}>
                                <CloudImage url={item.icon} styleImg={{ width: 54, height: 54, objectFit: "scale-down" }} />
                            </View>
                            <Text style={styles.categoryText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={{ marginTop: 58 }}>
                <Text style={styles.contentTitle}>Services</Text>

                <View style={{ gap: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity style={styles.categoryWrapper} onPress={() => navigation.navigate("BookCrossingWebView" as never)}>
                        <View style={styles.categoryBlock}>
                            <Icon name="read" style={{ fontSize: 54, color: "#808080" }} />
                        </View>
                        <Text style={styles.categoryText}>Book crossing</Text>
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
