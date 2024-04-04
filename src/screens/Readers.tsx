import { Page } from "../layouts/Page"
import { Image, StyleSheet, Text, View } from "react-native"
import ReadersImage from "../../assets/readers.png"
import ReadersNotif from "../../assets/readaerNotif.png"
import ReadersMore from "../../assets/readerMore.png"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { NewsApi } from "../api/newsApi"
import { NoData } from "../components/NoData"

const Readers = () => {
    const { fetchData } = NewsApi("list")
    const [readerData, setReaderData] = useState([])

    useEffect(() => {
        const news = async () => {
            await fetchData({})
                .then((res) => {
                    if (res.result_code === 0) {
                        setReaderData(res.data)
                    }
                })
                .catch((err: any) => {
                    if (err) {
                        alert(JSON.stringify(err))
                    }
                })
        }

        news()
    }, [])

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack={true} title="Announcement" />
            <View style={{ marginTop: 45 }}>
                {readerData.length === 1 ? (
                    <NoData />
                ) : (
                    <>
                        <View style={styles.readerbook}>
                            <Image source={ReadersImage} alt="ReadersImage" resizeMode="cover" style={styles.image} />
                            <View style={styles.readerContent}>
                                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                    <Image source={ReadersNotif} alt="ReadersNotif" resizeMode="cover" />

                                    <View style={styles.readerTitle}>
                                        <View style={styles.readerTitleBlock}>
                                            <Text style={{ color: "white", fontSize: 8 }}>BOOKWARM DAY12</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.readerText}>A marathon for book lovers begins! This event will be online/offline January 15 - January 18</Text>
                                    <Text style={styles.readerText}>
                                        for more infromation write email <Text style={styles.readeremail}>ayalanayashova1@mail.ru</Text>
                                    </Text>
                                </View>

                                <Text style={styles.readerTime}>12:25 AM</Text>

                                <View style={styles.readerMore}>
                                    <Image source={ReadersMore} alt="Reader More" resizeMode="cover" />
                                </View>
                            </View>
                        </View>

                        <View style={styles.readerbook}>
                            <Image source={ReadersImage} alt="ReadersImage" resizeMode="cover" style={styles.image} />
                            <View style={styles.readerContent}>
                                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                    <Image source={ReadersNotif} alt="ReadersNotif" resizeMode="cover" />

                                    <View style={styles.readerTitle}>
                                        <View style={styles.readerTitleBlock}>
                                            <Text style={{ color: "white", fontSize: 8 }}>BOOKWARM DAY12</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.readerText}>A marathon for book lovers begins! This event will be online/offline January 15 - January 18</Text>
                                    <Text style={styles.readerText}>
                                        for more infromation write email <Text style={styles.readeremail}>ayalanayashova1@mail.ru</Text>
                                    </Text>
                                </View>

                                <Text style={styles.readerTime}>12:25 AM</Text>

                                <View style={styles.readerMore}>
                                    <Image source={ReadersMore} alt="Reader More" resizeMode="cover" />
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    readerbook: {
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        paddingVertical: 15,
        paddingHorizontal: 21,
        borderRadius: 9.5,
        marginBottom: 16,

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 0,
        shadowRadius: 4,
        shadowOpacity: 1,
    },

    image: {
        width: "100%",
        marginBottom: 14,
    },

    readerContent: {
        width: "100%",
        position: "relative",
    },

    readerTitle: {
        flexDirection: "row",
    },

    readerTitleBlock: {
        backgroundColor: "#DC9E41",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    readerText: {
        fontSize: 8,
        fontWeight: "600",
        marginTop: 7,
        marginBottom: 10,
    },

    readeremail: {
        color: "#60B4D9",
    },

    readerTime: {
        fontSize: 8,
        color: "#7A7878",
    },

    readerMore: {
        position: "absolute",
        top: 5,
        right: 0,
    },
})

export default Readers
