import { Image, View, Text, StyleSheet } from "react-native"
import UserProfileImg from "../../assets/images/custom-user-profile.jpg"
import { useAppSelector } from "../hook/useStore"
import { useState } from "react"
import { IUserInfo } from "../api/authApi"
import { UserAPI } from "../api/userApi"
import { bookReviewInfo } from "../api/reviewApi"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"

interface IProfile {
    readBooksCount: number
    reviewsCount: number
    followersCount: number
    followingCount: number
    reviews: bookReviewInfo
    books: {}
}

export const Profile = () => {
    const {
        userInfo: { fullName },
    } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchUserProfileData } = UserAPI("profile")
    // const [info, setInfo] = useState<>({})

    return (
        <Page>
            <Icon name="setting" style={styles.settingIcon} />
            <View style={styles.profileInfoWrapper}>
                <Image source={UserProfileImg} style={styles.userProfileImg} />

                <Text style={styles.fullName}>{fullName}</Text>

                <View style={styles.userStatistic}>
                    <View>
                        <Text style={styles.statisticNumber}>88</Text>
                        <Text style={styles.statisticDescr}>read</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>88</Text>
                        <Text style={styles.statisticDescr}>reviews</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>88</Text>
                        <Text style={styles.statisticDescr}>followers</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>10</Text>
                        <Text style={styles.statisticDescr}>following</Text>
                    </View>
                </View>

                <View style={styles.tabBarWrapper}>
                    <Text>Survey</Text>
                    <View style={[styles.line]}></View>
                    <Text>Reviews</Text>
                    <View style={[styles.line]}></View>
                    <Text>Posts</Text>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    line: {
        top: 0,
        height: "100%",
        width: 1,
        backgroundColor: "#fff",
    },
    tabBarWrapper: {
        width: "100%",
        borderRadius: 12,
        backgroundColor: "#FFED4A",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 47,
        marginTop: 5,
    },
    settingIcon: {
        position: "absolute",
        top: 20,
        right: 20,
        color: "#000",
        fontSize: 30,
    },
    profileInfoWrapper: {
        marginTop: 70,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
    },
    userProfileImg: {
        width: 120,
        height: 120,
        objectFit: "contain",
        borderRadius: 1000,
    },
    fullName: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 27,
        color: "#000000",
    },
    userStatistic: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
    statisticNumber: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        color: "#000000",
    },
    statisticDescr: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        lineHeight: 15,
        color: "#808080",
    },
})
