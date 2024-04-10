import { Page } from "../layouts/Page"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ReaderNotif from "../../assets/readaerNotif.png"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"
import { useEffect, useState } from "react"
import { NewsApi, newsInfo } from "../api/newsApi"
import { CloudImage } from "../components/CloudImage"
import CloseImage from "../../assets/close.png"

const ReaderNews = () => {
    const { id } = useRoute<RouteProp<RootStackParamList, "ReaderNews">>().params
    const navigation = useNavigation()
    const { fetchData } = NewsApi("get")
    const [readerData, setReaderData] = useState<newsInfo | null>(null)

    useEffect(() => {
        const news = async () => {
            await fetchData({
                id: id,
            }).then((res) => {
                if (res.result_code === 0) {
                    const newsData: newsInfo = JSON.parse(JSON.stringify(res.data))
                    setReaderData(newsData)
                }
            })
        }

        if (id) {
            news()
        }
    }, [id])

    return (
        <>
            <Page>
                <View style={styles.newsWrapper}>
                    <View style={styles.mainImageBlock}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeImg}>
                            <Image source={CloseImage} resizeMode="contain" style={styles.closeImg} />
                        </TouchableOpacity>
                        <CloudImage url={readerData?.imageLink} styleImg={styles.image} />
                    </View>
                    <View style={styles.newsContent}>
                        <View style={styles.newsInfo}>
                            <Image source={ReaderNotif} alt="Reader Notif" resizeMode="cover" />
                            <Text style={styles.newsTitle}>{readerData?.title}</Text>
                        </View>
                        <View>
                            <Text style={styles.newsSubtitle}>{readerData?.content}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
    },

    mainImageBlock: {
        width: "100%",
        height: 230,
        position: "relative",
    },

    newsContent: {
        paddingVertical: 29,
        paddingHorizontal: 16,
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        top: "85%",
        borderRadius: 43,
        alignItems: "center",
    },

    newsInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        maxWidth: 260,
        // marginLeft: -30,

        marginBottom: 30,
    },

    newsTitle: {
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center",
    },

    newsSubtitle: {
        fontSize: 10,
        fontWeight: "600",
    },

    newsWrapper: {
        position: "relative",
    },

    closeImg: {
        position: "absolute",
        zIndex: 200,
        width: 40,
        height: 40,
        right: 10,
        top: 10,
    },
})

export default ReaderNews
