import { Image, Text, View, StyleSheet } from "react-native"
import { CloudImage } from "../../components/CloudImage"
import { Page } from "../../layouts/Page"
import { useState } from "react"
import { CustomTabs } from "../../components/CustomTabs"
import ClubImg from "../../../assets/images/category/club.png"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import AddClubImg from "../../../assets/images/add-club.png"

export const Clubs = () => {
    const [tab, setTab] = useState<string>("clubs")
    const tabs = [
        {
            label: "Clubs",
            value: "clubs",
        },
        { label: "My clubs", value: "my_clubs" },
    ]

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack title="" />
            <View style={styles.clubs}>
                <CustomTabs valueList={tabs} onClickTab={(e) => setTab(e)} />

                <View style={{ marginVertical: 10 }}>
                    {tab === "clubs" ? (
                        <View style={styles.clubWrapper}>
                            <CloudImage url="https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg" styleImg={styles.clubImg} />
                            <View style={styles.clubInfo}>
                                <Text style={styles.clubAdminText}>
                                    <Text style={{ color: "#212121", fontWeight: "500" }}>Admin: </Text>
                                    <Text style={{}}>Alibi</Text>
                                </Text>
                                <Text style={styles.clubTitleText}>Atomic Habit's Book Club</Text>

                                <View>
                                    <Text style={styles.clubAdminText}>
                                        <Text>Last Post: </Text>
                                        <Text style={{ color: "#212121", fontWeight: "500" }}>16 min ago</Text>
                                    </Text>
                                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                                        <Image source={ClubImg} tintColor="#6D7885" style={{ width: 15, height: 25, objectFit: "contain" }} />
                                        <Text style={styles.clubUsersText}>150</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.myCluWrapper}>
                            <NoData />
                        </View>
                    )}
                </View>
            </View>
            {tab === "my_clubs" && (
                <View style={styles.addClubWrapper}>
                    <Image source={AddClubImg} style={{ width: 50, height: 50, objectFit: "contain" }} />
                </View>
            )}
        </Page>
    )
}

const styles = StyleSheet.create({
    myCluWrapper: {
        marginVertical: 10,
    },
    addClubWrapper: {
        position: "absolute",
        right: 16,
        bottom: 50,
    },
    clubs: {
        marginTop: 15,
    },
    clubWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        shadowRadius: 12,
        elevation: 1,
        shadowOpacity: 1,
    },
    clubImg: {
        width: 100,
        height: "100%",
        borderRadius: 12,
        objectFit: "cover",
    },
    clubInfo: {
        gap: 5,
    },
    clubAdminText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    clubTitleText: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 20,
    },
    clubUsersText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 15,
        color: "#6D7885",
    },
})
