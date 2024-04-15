import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native"
import { useAppSelector } from "../hook/useStore"
import { useEffect, useState } from "react"
import { UserAPI } from "../api/userApi"
import { bookReviewInfo } from "../api/reviewApi"
import { Page } from "../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import Modal from "@ant-design/react-native/lib/modal"
import { logOut as logOutHelper } from "../helpers/logOut"
import { useNavigation } from "@react-navigation/native"
import { BookShowBlock } from "../components/BookShowBlock"
import { bookInfo } from "../api/bookApi"
import { NoData } from "../components/NoData"
import { ReviewCard } from "../components/ReviewCard"
import { CarouselBookList } from "../components/CarouselBookList"
import { CloudImage } from "../components/CloudImage"

interface IProfile {
    readBooksCount: number
    reviewsCount: number
    followersCount: number
    followingCount: number
    reviews: bookReviewInfo[]
    books: {
        [key: string]: bookInfo[]
    }
}

const _infoTemp = {
    books: {
        selected: [],
    },
    readBooksCount: 0,
    reviewsCount: 0,
    followersCount: 0,
    followingCount: 0,
    reviews: [],
}
export const Profile = () => {
    const navigation = useNavigation()
    const {
        userInfo: { fullName, avatar },
    } = useAppSelector((state) => state.mainSlice)
    const logOut = logOutHelper()
    const { fetchData: fetchUserProfileData } = UserAPI("profile")
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [info, setInfo] = useState<IProfile>(_infoTemp)
    const [tab, setTab] = useState<string>("Survey")
    const [statusList] = useState([
        { value: "reading", label: "Reading" },
        { value: "selected", label: "Read Later" },
        { value: "finish", label: "Read" },
    ])
    useEffect(() => {
        fetchUserProfileData({}).then((res) => {
            if (res.result_code === 0) {
                setInfo(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    const onChangeTab = (type: string) => {
        setTab(type)
    }

    const bookType = Object.keys(info.books)

    return (
        <Page>
            <TouchableOpacity onPress={() => setVisibleModal(true)}>
                <Icon name="setting" style={styles.settingIcon} />
            </TouchableOpacity>
            <View style={styles.profileInfoWrapper}>
                <CloudImage url={avatar || ""} styleImg={styles.userProfileImg} />

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
                    <TouchableOpacity onPressIn={() => onChangeTab("Survey")} style={{ ...styles.tabBarBlock, backgroundColor: tab === "Survey" ? "#005479" : "#FFED4A", borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}>
                        <Text style={{ color: tab === "Survey" ? "#fff" : "#000" }}>Survey</Text>
                    </TouchableOpacity>
                    <View style={[styles.line]}></View>
                    <TouchableOpacity onPressIn={() => onChangeTab("Reviews")} style={{ ...styles.tabBarBlock, backgroundColor: tab === "Reviews" ? "#005479" : "#FFED4A" }}>
                        <Text style={{ color: tab === "Reviews" ? "#fff" : "#000" }}>Reviews</Text>
                    </TouchableOpacity>
                    <View style={[styles.line]}></View>
                    <TouchableOpacity onPressIn={() => onChangeTab("Posts")} style={{ ...styles.tabBarBlock, backgroundColor: tab === "Posts" ? "#005479" : "#FFED4A", borderTopRightRadius: 12, borderBottomRightRadius: 12 }}>
                        <Text style={{ color: tab === "Posts" ? "#fff" : "#000" }}>Posts</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentWrapper}>
                    {tab === "Survey" ? (
                        <View style={{ marginBottom: 10 }}>
                            {bookType.map((item) => (
                                <BookShowBlock key={item} bookType={statusList.find((status) => status.value === item)?.label || ""}>
                                    <View style={{ marginHorizontal: -16 }}>{info.books[item].length ? <CarouselBookList dataList={info.books[item]} /> : <NoData />}</View>
                                </BookShowBlock>
                            ))}
                        </View>
                    ) : tab === "Reviews" ? (
                        <View style={styles.bookWrapper}>{info.reviews.length ? info.reviews.map((item) => <ReviewCard key={item.id} reviewInfo={item} />) : <NoData />}</View>
                    ) : (
                        <NoData />
                    )}
                </View>
            </View>

            <Modal popup animationType="slide-up" visible={visibleModal} onClose={() => setVisibleModal(false)} style={styles.modalWrapper} maskClosable>
                <TouchableOpacity onPressIn={() => setVisibleModal(false)}>
                    <Icon name="close" style={styles.closeIcon} />
                </TouchableOpacity>
                <View style={styles.modalInfoBlock}>
                    <TouchableOpacity
                        style={styles.modalWrapperBlock}
                        onPressIn={() => {
                            setVisibleModal(false)
                            navigation.navigate("EditProfile" as never)
                        }}>
                        <Icon name="edit" />
                        <Text style={styles.infoText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <View style={[styles.modalWrapperBlock, { justifyContent: "space-between" }]}>
                        <View style={styles.modalWrapperBlock}>
                            <Icon name="profile" />
                            <Text style={styles.infoText}>Switch to author</Text>
                        </View>
                        <Switch />
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="key" />
                        <Text style={[styles.infoText, { opacity: 0.3 }]}>Change Password (soon)</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="global" />
                        <Text style={[styles.infoText, { opacity: 0.3 }]}>Language (soon)</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="info-circle" />
                        <Text style={[styles.infoText, { opacity: 0.3 }]}>Language (soon)</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="usergroup-add" />
                        <Text style={[styles.infoText, { opacity: 0.3 }]}>Information (soon)</Text>
                    </View>
                    <TouchableOpacity style={styles.modalWrapperBlock} onPress={() => logOut()}>
                        <Icon name="logout" style={{ color: "red" }} />
                        <Text style={[styles.infoText, { color: "red" }]}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    bookWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
    contentWrapper: {
        marginTop: 21,
        borderTopColor: "#000",
        borderTopWidth: 0.5,
        borderStyle: "solid",
    },
    closeIcon: {
        position: "absolute",
        top: -42,
        right: 0,
        zIndex: 100,
    },
    modalWrapperBlock: {
        flexDirection: "row",
        alignItems: "center",
        height: 25,
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
        flexDirection: "row",
    },

    tabBarBlock: {
        paddingVertical: 14,
        paddingHorizontal: 30,
    },
    settingIcon: {
        position: "absolute",
        top: 10,
        right: 0,
        color: "#212121",
        fontSize: 30,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 1000,
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
        color: "#212121",
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
        color: "#212121",
    },
    statisticDescr: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        lineHeight: 15,
        color: "#808080",
    },
})
