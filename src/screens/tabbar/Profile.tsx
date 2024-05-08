import { View, Text, StyleSheet, TouchableOpacity, Easing, FlatList } from "react-native"
import { useAppSelector } from "../../hook/useStore"
import { useEffect, useRef, useState } from "react"
import { UserAPI } from "../../api/userApi"
import { bookReviewInfo } from "../../api/reviewApi"
import { Page } from "../../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import Modal from "@ant-design/react-native/lib/modal"
import { logOut as logOutHelper } from "../../helpers/logOut"
import { useNavigation } from "@react-navigation/native"
import { BookShowBlock } from "../../components/BookShowBlock"
import { bookInfo } from "../../api/bookApi"
import { NoData } from "../../components/NoData"
import { ReviewCard } from "../../components/ReviewCard"
import { CarouselBookList } from "../../components/carousel/CarouselBookList"
import { CloudImage } from "../../components/CloudImage"
import { CustomTabs } from "../../components/customs/CustomTabs"
import { postInfo } from "../../api/postApi"
import { PostCard } from "../../components/PostCard"
import Popover from "@ant-design/react-native/lib/popover"
import i18next from "i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTranslation } from "react-i18next"

const Item = Popover.Item

interface IProfile {
    readBooksCount: number
    reviewsCount: number
    followersCount: number
    followingCount: number
    reviews: bookReviewInfo[]
    books: {
        [key: string]: bookInfo[]
    }
    posts: postInfo[]
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
    posts: [],
}
export const Profile = () => {
    const { i18n } = useTranslation()
    const popoverRef = useRef<Popover | null>(null)
    const navigation = useNavigation()
    const {
        userInfo: { fullName, avatar },
        isRefresh,
    } = useAppSelector((state) => state.mainSlice)
    const logOut = logOutHelper()
    const { fetchData: fetchUserProfileData } = UserAPI("profile")
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [info, setInfo] = useState<IProfile>(_infoTemp)
    const [tab, setTab] = useState<string>("survey")
    const languages = [
        { label: "English", value: "en" },
        { label: "Қазақша", value: "kk" },
    ]
    const statusList = [
        { value: "reading", label: "Reading" },
        { value: "selected", label: "Read Later" },
        { value: "finish", label: "Read" },
    ]
    const tabList = [
        { value: "survey", label: "Survey" },
        { value: "reviews", label: "Reviews" },
        { value: "posts", label: "Posts" },
    ]
    useEffect(() => {
        if (!isRefresh) {
            fetchUserProfileData({}).then((res) => {
                if (res.result_code === 0) {
                    setInfo(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }, [isRefresh])

    const onChangeTab = (type: string) => {
        setTab(type)
    }

    const onChangeLang = async (lang: string) => {
        try {
            await AsyncStorage.setItem("lang", lang)
            i18next.changeLanguage(lang)
        } catch {
            console.log("err in saving data")
        }
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
                        <Text style={styles.statisticDescr}>Read</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.reviewsCount}</Text>
                        <Text style={styles.statisticDescr}>Reviews</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.followersCount}</Text>
                        <Text style={styles.statisticDescr}>Followers</Text>
                    </View>
                    <View>
                        <Text style={styles.statisticNumber}>{info?.followingCount}</Text>
                        <Text style={styles.statisticDescr}>Following</Text>
                    </View>
                </View>

                <CustomTabs valueList={tabList} onClickTab={onChangeTab} />

                <View style={styles.contentWrapper}>
                    {tab === "survey" ? (
                        <View style={{ marginTop: -10, marginBottom: 20 }}>
                            {bookType.map((item) => (
                                <BookShowBlock key={item} bookType={statusList.find((status) => status.value === item)?.label || ""}>
                                    <View style={{ marginHorizontal: -16 }}>{info.books[item].length ? <CarouselBookList dataList={info.books[item]} /> : <NoData />}</View>
                                </BookShowBlock>
                            ))}
                        </View>
                    ) : tab === "reviews" ? (
                        <View style={styles.bookWrapper}>{info.reviews.length ? info.reviews.map((item) => <ReviewCard key={item.id} reviewInfo={item} />) : <NoData />}</View>
                    ) : tab === "posts" ? (
                        <View style={{ marginTop: 10 }}>{info.posts.length ? info.posts.map((post) => <PostCard postInfo={post} key={post.id} />) : <NoData />}</View>
                    ) : null}
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
                        <Icon name="edit" color="#212121" />
                        <Text style={styles.infoText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <Popover
                        ref={popoverRef}
                        placement="top"
                        useNativeDriver
                        duration={200}
                        easing={(show) => (show ? Easing.in(Easing.ease) : Easing.step0)}
                        overlay={null}
                        renderOverlayComponent={(_, closePopover) => {
                            return (
                                <View style={{ width: 200 }}>
                                    <FlatList
                                        data={languages}
                                        renderItem={({ item }) => (
                                            <Item key={item.value} value={item.value}>
                                                <Text
                                                    onPress={() => {
                                                        onChangeLang(item.value)
                                                        closePopover()
                                                    }}>
                                                    {item.label}
                                                </Text>
                                            </Item>
                                        )}
                                    />
                                </View>
                            )
                        }}>
                        <View style={styles.modalWrapperBlock}>
                            <Icon name="global" color="#212121" />
                            <Text style={[styles.infoText]}>Language ({languages.find((lang) => lang.value === i18n.language)?.label})</Text>
                        </View>
                    </Popover>
                    {/* <View style={styles.modalWrapperBlock}>
                        <Icon name="key" />
                        <Text style={[styles.infoText]}>Change Password</Text>
                        </View>
                        <View style={[styles.modalWrapperBlock, { justifyContent: "space-between" }]}>
                            <View style={styles.modalWrapperBlock}>
                                <Icon name="profile" color="#212121" />
                                <Text style={styles.infoText}>Switch to author</Text>
                            </View>
                            <Switch />
                        </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="info-circle" />
                        <Text style={[styles.infoText]}>Language</Text>
                    </View>
                    <View style={styles.modalWrapperBlock}>
                        <Icon name="usergroup-add" />
                        <Text style={[styles.infoText, { opacity: 0.3 }]}>Information (soon)</Text>
                    </View> */}

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
        marginVertical: 10,
    },
    contentWrapper: {
        // marginTop: 21,
        width: "100%",
    },
    closeIcon: {
        position: "absolute",
        top: -22,
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
        color: "#212121",
    },
    modalInfoBlock: {
        flexDirection: "column",
        gap: 34,
    },
    modalWrapper: {
        paddingTop: 32,
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    line: {
        top: 0,
        height: "100%",
        width: 1,
        backgroundColor: "#fff",
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
        objectFit: "cover",
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
