import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native"
import { CloudImage } from "../../components/CloudImage"
import { Page } from "../../layouts/Page"
import { useEffect, useState } from "react"
import { CustomTabs } from "../../components/CustomTabs"
import ClubImg from "../../../assets/images/category/club.png"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import AddClubImg from "../../../assets/images/add-club.png"
import Modal from "@ant-design/react-native/lib/modal"
import { InputStyle } from "../../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import Switch from "@ant-design/react-native/lib/switch"
import Button from "@ant-design/react-native/lib/button"
import { ClubAPI, clubInfo } from "../../api/clubApi"
import Toast from "@ant-design/react-native/lib/toast"
import EditImg from "../../../assets/images/edit.png"
import TrashImg from "../../../assets/images/trash.png"
import { useAppSelector } from "../../hook/useStore"
import { Loading } from "../../components/Loading"
import LockImg from "../../../assets/images/lock.png"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Icon from "@ant-design/react-native/lib/icon"
import * as Clipboard from "expo-clipboard"

dayjs.extend(relativeTime)

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ClubDetail">>

export const Clubs = () => {
    const { fetchData: fetchMyClubData } = ClubAPI("my/list")
    const { fetchData: fetchClubData } = ClubAPI("list")
    const { fetchData: fetchCreateClubData } = ClubAPI("create")
    const { fetchData: fetchUpdateClubData } = ClubAPI("update")
    const { fetchData: fetchDeleteClubData } = ClubAPI("delete")
    const { fetchData: fetchRefreshInviteCodeData } = ClubAPI("refresh/invitecode")
    const navigation = useNavigation<NavigateType>()
    const { isLoading } = useAppSelector((state) => state.mainSlice)

    const tabs = [
        {
            label: "Clubs",
            value: "clubs",
        },
        { label: "My clubs", value: "my_clubs" },
    ]
    const [isRefresh, setIsRefresh] = useState<boolean>(false)
    const [tab, setTab] = useState<string>("clubs")
    const [clubInfo, setClubInfo] = useState<{ title: string; isPrivate: boolean }>({ title: "", isPrivate: false })
    const [myClubList, setMyClubList] = useState<clubInfo[]>([])
    const [clubList, setClubList] = useState<clubInfo[]>([])
    const [showAddClubModal, setShowAddClubModal] = useState<{
        id: string
        isOpen: boolean
    }>({
        id: "",
        isOpen: false,
    })
    const [showWarningModal, setShowWarningModal] = useState<{
        id: string
        isOpen: boolean
    }>({
        id: "",
        isOpen: false,
    })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await fetchClubData({}).then((res) => {
            if (res.result_code === 0) {
                setClubList(res.data)
            }
        })

        fetchMyClubData({}).then((res) => {
            if (res.result_code === 0) {
                setMyClubList(res.data)
                setIsRefresh(false)
            }
        })
    }

    const onDeleteClub = () => {
        if (!showWarningModal.id) return

        fetchDeleteClubData({
            id: showWarningModal.id,
        }).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly deleted post")
                loadData()
                onCloseModal(true)
            }
        })
    }

    const onCreateClub = () => {
        fetchCreateClubData({ ...clubInfo, isPrivate: Number(clubInfo.isPrivate) }).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created post")
                loadData()
                setClubInfo({ title: "", isPrivate: false })
                onCloseModal(false)
            }
        })
    }

    const onUpdateClub = () => {
        fetchUpdateClubData({
            id: showAddClubModal.id,
            ...clubInfo,
            isPrivate: Number(clubInfo.isPrivate),
        }).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly updated post")
                loadData()
                setClubInfo({ title: "", isPrivate: false })
                onCloseModal(false)
            }
        })
    }

    const onSubmitClub = () => {
        if (!showAddClubModal.id) return

        if (showAddClubModal.id === "add") {
            onCreateClub()
        } else {
            onUpdateClub()
        }
    }

    const onCloseModal = (isDeleteModal: boolean) => {
        const _infoTemp = {
            id: "",
            isOpen: false,
        }
        if (!isDeleteModal) {
            setShowAddClubModal(_infoTemp)
            setClubInfo({ title: "", isPrivate: false })
        } else {
            setShowWarningModal(_infoTemp)
        }
    }

    const onRefreshInviteCode = () => {
        fetchRefreshInviteCodeData({
            clubId: showAddClubModal.id,
        }).then((res) => {
            if (res.result_code === 0) {
                loadData()
            }
        })
    }

    const inviteCodeValue = () => {
        return clubList.find((item) => item.id === showAddClubModal.id)?.inviteCode
    }

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(inviteCodeValue() || "")
        Toast.success("Copied")
    }

    const isLastClubIndex = (index: number) => {
        return clubList.length - 1 === index
    }

    const isLastMyClubIndex = (index: number) => {
        return myClubList.length - 1 === index
    }

    const ClubItem = ({ item }: { item: clubInfo }) => {
        return (
            <TouchableOpacity delayPressIn={10} onPress={() => navigation.navigate("ClubDetail", { id: item.id || "" })} style={styles.clubBlock}>
                <CloudImage url={item.avatar} styleImg={styles.clubImg} />
                <View style={styles.clubInfo}>
                    {/* <Text style={styles.clubAdminText}>
                        <Text style={{ color: "#212121", fontWeight: "500" }}>Admin: </Text>
                        <Text style={{}}>Alibi</Text>
                    </Text> */}
                    <Text style={styles.clubTitleText}>{item.title}</Text>

                    <View>
                        {item.lastPostTime !== 0 && (
                            <Text style={styles.clubAdminText}>
                                <Text>Last Post: </Text>
                                <Text style={{ color: "#212121", fontWeight: "500" }}>{dayjs().to(dayjs(item.lastPostTime))}</Text>
                            </Text>
                        )}
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.clubBottomEditBlock}>
                                <Image source={ClubImg} tintColor="#6D7885" style={{ width: 15, height: 25, objectFit: "contain" }} />
                                <Text style={styles.clubUsersText}>{item.followersCount}</Text>
                            </View>
                            {tab === "my_clubs" && (
                                <View style={[styles.clubBottomEditBlock, { gap: 15 }]}>
                                    <TouchableOpacity
                                        style={styles.iconWrapper}
                                        onPress={() => {
                                            setClubInfo({ title: item.title, isPrivate: item.private })
                                            setShowAddClubModal({ id: item.id || "", isOpen: true })
                                        }}>
                                        <Image style={styles.clubEditIcon} source={EditImg} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowWarningModal({ isOpen: true, id: item.id || "" })}>
                                        <Image style={styles.clubEditIcon} source={TrashImg} tintColor="#ed1834" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {tab === "clubs" && item.private && !item.join && (
                    <TouchableOpacity style={[styles.iconWrapper, { position: "absolute", left: 5, top: 5 }]}>
                        <Image style={styles.clubEditIcon} source={LockImg} />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        )
    }

    return (
        <Page isFlatList>
            <Header isCustomHeader={false} isGoBack title="" />
            <View style={styles.clubs}>
                <CustomTabs valueList={tabs} onClickTab={(e) => setTab(e)} />

                <View style={styles.clubWrapper}>
                    {clubList.length || myClubList.length ? (
                        <FlatList
                            refreshing={isRefresh}
                            onRefresh={() => loadData()}
                            data={tab === "clubs" ? clubList : myClubList}
                            renderItem={({ item, index }) => (
                                <View style={[styles.clibBlockBorder, { borderBottomWidth: (tab === "clubs" && isLastClubIndex(index)) || tab === "my_clubs" || isLastMyClubIndex(index) ? 0 : 0.5 }]}>
                                    <ClubItem item={item} />
                                </View>
                            )}
                        />
                    ) : (
                        <NoData />
                    )}
                </View>
            </View>
            {tab === "my_clubs" && (
                <TouchableOpacity onPress={() => setShowAddClubModal({ id: "add", isOpen: true })} style={styles.addClubWrapper}>
                    <Image source={AddClubImg} style={{ width: 50, height: 50, objectFit: "contain" }} />
                </TouchableOpacity>
            )}
            <Modal popup animationType="slide-up" visible={showAddClubModal.isOpen} onClose={() => onCloseModal(false)} style={styles.modalWrapper} maskClosable>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>{showAddClubModal.id === "add" ? "Add Club" : "Update Club"} </Text>
                    <InputStyle inputTitle="Title">
                        <InputItem last type="text" style={styles.input} value={clubInfo.title} onChange={(e) => setClubInfo({ ...clubInfo, title: e })} />
                    </InputStyle>
                    <InputStyle inputTitle="Is private club">
                        <Switch checked={clubInfo.isPrivate} onChange={(e) => setClubInfo({ ...clubInfo, isPrivate: e })} />
                    </InputStyle>
                    <InputStyle inputTitle="Invite code">
                        <InputItem last type="text" style={styles.input} value={inviteCodeValue()} disabled />
                        <TouchableOpacity onPress={() => copyToClipboard()} delayPressIn={10} style={[styles.iconWrapper, { position: "absolute", top: 37, right: 50, paddingVertical: 5, paddingHorizontal: 5 }]}>
                            <Icon name="copy" size={18} color="#0A78D6" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onRefreshInviteCode()} delayPressIn={10} style={[styles.iconWrapper, { position: "absolute", top: 37, right: 10, paddingVertical: 5, paddingHorizontal: 5 }]}>
                            <Icon name="reload" size={18} color="#0A78D6" />
                        </TouchableOpacity>
                    </InputStyle>

                    <Button type="primary" style={styles.createBtn} onPress={() => onSubmitClub()}>
                        {showAddClubModal.id === "add" ? "Create a club" : "Update club"}
                    </Button>
                </View>
                {isLoading && <Loading />}
            </Modal>
            <Modal animationType="fade" transparent={false} visible={showWarningModal.isOpen} onClose={() => onCloseModal(true)} maskClosable style={styles.modalWrapperWarning}>
                <View>
                    <Text style={styles.tileWarningText}>Are you sure delete club ?</Text>
                </View>
                <View style={styles.warningBtns}>
                    <Text style={[styles.btnText, styles.cancelText]} onPress={() => onCloseModal(true)}>
                        No
                    </Text>
                    <Text style={[styles.btnText, { color: "#ed1834", fontWeight: "500" }]} onPress={() => onDeleteClub()}>
                        Yes
                    </Text>
                </View>
                {isLoading && <Loading />}
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    iconWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 12,
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
    clubBottomEditBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    clubEditIcon: {
        width: 15,
        height: 15,
        objectFit: "cover",
    },
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
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    myCluWrapper: {
        marginVertical: 10,
    },
    addClubWrapper: {
        marginTop: 10,
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        zIndex: 1,
    },
    clubs: {
        marginTop: 15,
    },
    clubWrapper: {
        marginVertical: 10,
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
    clubBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    clibBlockBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#0000001f",
        borderBottomStyle: "solid",
    },
    clubImg: {
        width: 110,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    clubInfo: {
        gap: 5,
        flex: 1,
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
