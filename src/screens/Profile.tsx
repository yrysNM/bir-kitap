import { Image, View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native"
import UserProfileImg from "../../assets/images/custom-user-profile.jpg"
import { useAppSelector } from "../hook/useStore"
import { useEffect, useState } from "react"
import { UserAPI } from "../api/userApi"
import { bookReviewInfo } from "../api/reviewApi"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import Modal from "@ant-design/react-native/lib/modal"

interface IProfile {
    readBooksCount: number
    reviewsCount: number
    followersCount: number
    followingCount: number
    reviews: bookReviewInfo
    // books: {}
}

export const Profile = () => {
    const {
        userInfo: { fullName },
    } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchUserProfileData } = UserAPI("profile")
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [info, setInfo] = useState<IProfile>()

    useEffect(() => {
        fetchUserProfileData({}).then((res) => {
            if (res.result_code === 0) {
                setInfo(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    return (
        <Page>
            <TouchableOpacity onPress={() => setVisibleModal(true)}>
                <Icon name="setting" style={styles.settingIcon} />
            </TouchableOpacity>
            <View style={styles.profileInfoWrapper}>
                <Image source={UserProfileImg} style={styles.userProfileImg} />

                <Text style={styles.fullName}>{fullName}</Text>

                <View style={styles.userStatistic}>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.readBooksCount}</Text>
                        <Text style={styles.statisticDescr}>read</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.reviewsCount}</Text>
                        <Text style={styles.statisticDescr}>reviews</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.followersCount}</Text>
                        <Text style={styles.statisticDescr}>followers</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.followingCount}</Text>
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

            <Modal popup animationType="slide-up" visible={visibleModal} onClose={() => setVisibleModal(false)} style={styles.modalWrapper} maskClosable>
                <TouchableOpacity onPress={() => setVisibleModal(false)}>
                    <Icon name="close" style={styles.closeIcon}/>
                </TouchableOpacity>
                <View style={styles.modalInfoBlock}>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="edit" />
                        <Text style={styles.infoText}>Edit Profile</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="profile" />
                        <Text style={styles.infoText}>Switch to author</Text>
                        <Switch />
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="key" />
                        <Text style={styles.infoText}>Change Password</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="global" />
                        <Text style={styles.infoText}>Language</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="info-circle" />
                        <Text style={styles.infoText}>Language</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="usergroup-add" />
                        <Text style={styles.infoText}>Information</Text>
                    </View>
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        top: -42,
        right: 0,
        zIndex: 100,
    },
    modalWrapperBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
    },
    infoText: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        color: "#F9FAF8",
    },
    modalInfoBlock: {
        flexDirection: "column",
        gap: 34,
    },
    modalWrapper: {
        paddingTop: 62,
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#005479",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
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
        right: 0,
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
