import { Text, View, StyleSheet, FlatList, Image, Dimensions } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { CloudImage } from "../components/CloudImage"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { useEffect, useState } from "react"
import { IUserInfo } from "../api/authApi"
import { ClubAPI, clubInfo } from "../api/clubApi"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"
import { postInfo } from "../api/postApi"
import { NoData } from "../components/NoData"
import { PostCard } from "../components/entities/PostCard"
import { useAppSelector } from "../hook/useStore"
import { BlurView } from "expo-blur"
import LockImg from "../../assets/images/lock.png"
import Toast from "@ant-design/react-native/lib/toast"
import Modal from "@ant-design/react-native/lib/modal"
import { Loading } from "../components/Loading"
import { InputItem } from "@ant-design/react-native"
import { InputStyle } from "../components/InputStyle"
import { CustomTabs } from "../components/customs/CustomTabs"
import FollowUserCard from "../components/entities/FollowUserCard"

interface IClubGet {
    admin: IUserInfo
    club: clubInfo
    followers: IUserInfo[]
}

const _tabList = [
    {
        value: "posts",
        label: "Posts",
    },
    {
        value: "followers",
        label: "Followers",
    },
]

export const ClubDetail = () => {
    const { fetchData: fetchClubDetailData } = ClubAPI("get")
    const { fetchData: fetchClubPostData } = ClubAPI("posts")
    const { fetchData: fetchClubJoinData } = ClubAPI("join")
    const { fetchData: fetchUnJoinClubData } = ClubAPI("unjoin")
    const { id } = useRoute<RouteProp<RootStackParamList, "ClubDetail">>().params
    const [clubPosts, setClubPosts] = useState<postInfo[]>([])
    const [inviteCode, setInviteCode] = useState<string>("")
    const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false)
    const [tab, setTab] = useState<string>("posts")
    const [tabList, setTabList] = useState(_tabList)
    const [clubInfo, setClubInfo] = useState<IClubGet>({
        admin: {
            email: "",
            fullName: "",
            phone: "",
            password: "",
            birth: 0,
            gender: "",
        },
        club: {
            title: "",
            private: false,
            avatar: "",
            followersCount: 0,
            lastPostTime: 0,
        },
        followers: [],
    })
    const {
        userInfo: { id: userId },
        isLoading,
    } = useAppSelector((state) => state.mainSlice)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        let clubTabInfo = { value: _tabList[1].value, label: `Followers` }
        await fetchClubDetailData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                const clubInfo: IClubGet = JSON.parse(JSON.stringify(res.data))
                setClubInfo(clubInfo)
                clubTabInfo = { value: _tabList[1].value, label: `Followers ${clubInfo.followers.length}` }
            }
        })

        fetchClubPostData({
            clubId: id,
        }).then((res) => {
            if (res.result_code === 0) {
                setClubPosts(JSON.parse(JSON.stringify(res.data)))

                setTabList([{ value: _tabList[0].value, label: `Post ${res.data.length}` }, clubTabInfo])
            }
        })
    }

    const isPrivate = () => {
        return clubInfo.club.private && !clubInfo.club.join
    }

    const onClickToggleJoinBtn = () => {
        if (!clubInfo.club.join) {
            if (isPrivate()) {
                setShowInviteModal(true)
            } else {
                onJoinClub()
            }
        } else {
            if (!showInviteModal) {
                setShowWarningModal(true)
            } else {
                onLeaveClub()
            }
        }
    }

    const onJoinClub = () => {
        fetchClubJoinData({
            clubId: clubInfo.club.id,
            inviteCode,
        }).then((res) => {
            if (res.result_code === 0) {
                loadData()
                onCloseModal(true)
                Toast.success("...")
            }
        })
    }

    const onLeaveClub = () => {
        fetchUnJoinClubData({
            clubId: clubInfo.club.id,
        }).then((res) => {
            if (res.result_code === 0) {
                loadData()
                onCloseModal(false)
                Toast.success("...")
            }
        })
    }

    const onCloseModal = (isJoinModal: boolean) => {
        if (isJoinModal) {
            setShowInviteModal(false)
        } else {
            setShowWarningModal(false)
        }
    }

    const dataList = () => {
        if (tab === "posts") {
            return clubPosts
        } else if (tab === "followers") {
            return clubInfo.followers
        }
    }

    const isDataListEmpty = () => {
        if ((tab === "posts" && !clubPosts.length) || (tab === "followers" && !clubInfo.followers.length)) {
            return true
        }
        return false
    }

    return (
        <Page isFlatList>
            <Header isGoBack title="" />

            <View style={styles.clubWrapper}>
                <CloudImage url={clubInfo.club.avatar} styleImg={styles.avatarImg} />
                <Text style={styles.clubTitleText}>{clubInfo.club.title}</Text>
                <Text style={[styles.userNameText, { color: userId === clubInfo.admin.id ? "#0A78D6" : "#6D7885" }]}>{clubInfo.admin.fullName}</Text>

                <Button type="primary" style={styles.joinBtn} onPress={() => onClickToggleJoinBtn()}>
                    <Text style={styles.joinBtnText}>{!clubInfo.club.join ? "Join" : "Unjoin"}</Text>
                    {isPrivate() && (
                        <View style={[styles.iconWrapper, { position: "absolute", left: -65, top: -20 }]}>
                            <Image style={styles.clubEditIcon} source={LockImg} />
                        </View>
                    )}
                </Button>

                <CustomTabs valueList={tabList} onClickTab={(e) => setTab(e)} />
            </View>

            <View style={{ marginTop: 10, gap: 20, flex: 1 }}>
                {!isDataListEmpty() ? (
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={dataList() as []}
                        renderItem={({ item }) => (
                            <BlurView
                                experimentalBlurMethod="dimezisBlurView"
                                intensity={isPrivate() ? 10 : 0}
                                tint="light"
                                style={[styles.blurContainer, { backgroundColor: "none", paddingHorizontal: 0, shadowOpacity: 0, elevation: 0, shadowOffset: { width: 0, height: 0 }, marginBottom: 0, marginTop: 0 }]}>
                                <View style={{ zIndex: isPrivate() ? -10 : 1 }}>
                                    {tab === "posts" ? (
                                        <PostCard postInfo={item} />
                                    ) : (
                                        <FollowUserCard
                                            user={item}
                                            onToggleFollow={(e) =>
                                                setClubInfo({
                                                    ...clubInfo,
                                                    followers: clubInfo.followers.map((item) => {
                                                        if (item.id === e.id) {
                                                            return e
                                                        }
                                                        return item
                                                    }),
                                                })
                                            }
                                        />
                                    )}
                                </View>
                            </BlurView>
                        )}
                    />
                ) : (
                    <BlurView experimentalBlurMethod="dimezisBlurView" intensity={isPrivate() ? 10 : 0} tint="light" style={styles.blurContainer}>
                        <View style={{ zIndex: isPrivate() ? -10 : 1, gap: 20, paddingTop: 20 }}>
                            <NoData />
                        </View>
                    </BlurView>
                )}
            </View>

            <Modal popup animationType="slide-up" visible={showInviteModal} onClose={() => onCloseModal(true)} style={styles.modalWrapper} maskClosable>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Join Club </Text>
                    <InputStyle inputTitle="Invite code">
                        <InputItem cursorColor="#0A78D6" selectionColor="rgba(10, 120, 214, 0.3)" last type="text" style={styles.input} value={inviteCode} onChange={(e) => setInviteCode(e)} />
                    </InputStyle>

                    <Button type="primary" style={styles.createBtn} onPress={() => onJoinClub()}>
                        Join
                    </Button>
                </View>
                {isLoading && <Loading />}
            </Modal>
            <Modal animationType="fade" transparent={false} visible={showWarningModal} onClose={() => onCloseModal(false)} maskClosable style={styles.modalWrapperWarning}>
                <View>
                    <Text style={styles.tileWarningText}>Are you sure unjoin club ?</Text>
                </View>
                <View style={styles.warningBtns}>
                    <Text style={[styles.btnText, styles.cancelText]} onPress={() => onCloseModal(false)}>
                        No
                    </Text>
                    <Text style={[styles.btnText, { color: "#ed1834", fontWeight: "500" }]} onPress={() => onLeaveClub()}>
                        Yes
                    </Text>
                </View>
                {isLoading && <Loading />}
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    createBtn: {
        width: "100%",
        borderRadius: 13,
        backgroundColor: "#0A78D6",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderWidth: 0,
    },
    input: {
        height: 42,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginLeft: -15,
        marginRight: -15,
    },
    modalWrapper: {
        paddingTop: 15,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
    },
    cancelText: {
        borderRightWidth: 1,
        borderStyle: "solid",
        borderColor: "#0000001f",
        fontWeight: "700",
        color: "#0A78D6",
    },
    warningBtns: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#0000001f",
    },
    btnText: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 16,
        textAlign: "center",
    },
    tileWarningText: {
        paddingHorizontal: 16,
        color: "#212121",
        fontSize: 17,
        lineHeight: 18,
        fontWeight: "700",
    },
    modalWrapperWarning: {
        width: "90%",
        paddingTop: 32,
        marginHorizontal: 32,
        borderRadius: 12,
        backgroundColor: "#fff",
        position: "absolute",
        left: -10,
        bottom: -Dimensions.get("window").height / 2,
        zIndex: -1,
    },
    clubEditIcon: {
        width: 15,
        height: 15,
        objectFit: "cover",
    },
    iconWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 100,
        elevation: 10,
        shadowOpacity: 1,
    },
    blurContainer: {
        flex: 1,
        width: "100%",
        marginTop: 10,
        borderRadius: 12,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        overflow: "hidden",
        marginBottom: 16,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    absolute: {
        justifyContent: "center",
        alignItems: "center",
    },
    userNameText: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: "600",
        color: "#6D7885",
    },
    joinBtnText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        color: "#fff",
    },
    joinBtn: {
        marginVertical: 20,
        width: 150,
        height: 40,
        borderRadius: 13,
        backgroundColor: "#0A78D6",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderWidth: 0,
    },
    clubWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 10,
    },
    avatarImg: {
        width: 150,
        height: 150,
        objectFit: "cover",
        borderRadius: 12,
    },
    clubTitleText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 27,
        color: "#212121",
    },
    clubInfo: {
        marginTop: 20,
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
    infoNumber: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        color: "#212121",
    },
    infoText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        lineHeight: 15,
        color: "#808080",
    },
})
