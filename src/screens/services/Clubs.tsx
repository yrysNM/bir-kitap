import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
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

export const Clubs = () => {
    const { fetchData: fetchMyClubData } = ClubAPI("my/list")
    const { fetchData: fetchClubData } = ClubAPI("list")
    const { fetchData: fetchCreateClubData } = ClubAPI("create")
    // const screenWidth = Dimensions.get("window").width
    // const screenHeight = Dimensions.get("window").height
    const tabs = [
        {
            label: "Clubs",
            value: "clubs",
        },
        { label: "My clubs", value: "my_clubs" },
    ]
    const [tab, setTab] = useState<string>("clubs")
    // const [position, setPosition] = useState<{ x: number; y: number }>({
    //     x: screenWidth - 80,
    //     y: screenHeight - 80,
    // })
    const [clubInfo, setClubInfo] = useState<{ title: string; isPrivate: boolean }>({ title: "", isPrivate: false })
    const [myClubList, setMyClubList] = useState<clubInfo[]>([])
    const [clubList, setClubList] = useState<clubInfo[]>([])
    const [showAddClubModal, setShowAddClubModal] = useState<boolean>(false)

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
            }
        })
    }

    // useEffect(() => {
    //     AsyncStorage.getItem("clubAddElementPosition").then((value) => {
    //         console.log(value)
    //     })
    // }, [])

    /**
     * @TODO add move add club btn
     */
    // const panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: () => true,
    //     onStartShouldSetPanResponderCapture: () => false,
    //     onMoveShouldSetPanResponderCapture: () => false,
    //     onPanResponderMove: (event, gesture) => {
    //         const newX = position.x + gesture.dx
    //         const newY = position.y + gesture.dy

    //         if (newX >= 0 && newX <= screenWidth - 50 && newY >= 0 && newY <= screenHeight - 50) {
    //             setPosition({ x: newX, y: newY })
    //         }
    //     },
    //     onPanResponderRelease: () => {
    //         savePosition()
    //     },
    // })

    // const savePosition = async () => {
    //     try {
    //         await AsyncStorage.setItem("clubAddElementPosition", JSON.stringify(position))
    //     } catch (error) {
    //         console.error("Error saving position:", error)
    //     }
    // }

    const onCreateClub = () => {
        fetchCreateClubData({ ...clubInfo, isPrivate: Number(clubInfo.isPrivate) }).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created post")
                setClubInfo({ title: "", isPrivate: false })
                setShowAddClubModal(false)
            }
        })
    }

    const ClubItem = ({ item }: { item: clubInfo }) => {
        return (
            <View style={styles.clubBlock}>
                <CloudImage url="https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg" styleImg={styles.clubImg} />
                <View style={styles.clubInfo}>
                    <Text style={styles.clubAdminText}>
                        <Text style={{ color: "#212121", fontWeight: "500" }}>Admin: </Text>
                        <Text style={{}}>Alibi</Text>
                    </Text>
                    <Text style={styles.clubTitleText}>{item.title}</Text>

                    <View>
                        <Text style={styles.clubAdminText}>
                            <Text>Last Post: </Text>
                            <Text style={{ color: "#212121", fontWeight: "500" }}>16 min ago</Text>
                        </Text>
                        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={styles.clubBottomEditBlock}>
                                <Image source={ClubImg} tintColor="#6D7885" style={{ width: 15, height: 25, objectFit: "contain" }} />
                                <Text style={styles.clubUsersText}>150</Text>
                            </View>
                            {tab === "my_clubs" && (
                                <View style={[styles.clubBottomEditBlock, { gap: 15 }]}>
                                    <Image style={styles.clubEditIcon} source={EditImg} />
                                    <Image style={styles.clubEditIcon} source={TrashImg} tintColor="#ed1834" />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <Page isFlatList>
            <Header isCustomHeader={false} isGoBack title="" />
            <View style={styles.clubs}>
                <CustomTabs valueList={tabs} onClickTab={(e) => setTab(e)} />

                <View style={styles.clubWrapper}>
                    {tab === "clubs" ? (
                        <FlatList
                            data={clubList}
                            renderItem={({ item, index }) => (
                                <View style={[styles.clibBlockBorder, { borderBottomWidth: clubList.length - 1 === index ? 0 : 0.5 }]}>
                                    <ClubItem item={item} />
                                </View>
                            )}
                        />
                    ) : (
                        <View style={styles.myCluWrapper}>
                            {myClubList.length ? (
                                <FlatList
                                    data={myClubList}
                                    renderItem={({ item, index }) => (
                                        <View style={[styles.clibBlockBorder, { borderBottomWidth: myClubList.length - 1 === index ? 0 : 0.5 }]}>
                                            <ClubItem item={item} />
                                        </View>
                                    )}
                                />
                            ) : (
                                <NoData />
                            )}
                        </View>
                    )}
                </View>
            </View>
            {tab === "my_clubs" && (
                <TouchableOpacity onPress={() => setShowAddClubModal(true)} style={styles.addClubWrapper}>
                    <Image source={AddClubImg} style={{ width: 50, height: 50, objectFit: "contain" }} />
                </TouchableOpacity>
            )}
            <Modal popup animationType="slide-up" visible={showAddClubModal} onClose={() => setShowAddClubModal(false)} style={styles.modalWrapper} maskClosable>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Add Club</Text>
                    <InputStyle inputTitle="Title">
                        <InputItem last type="text" style={styles.input} value={clubInfo.title} onChange={(e) => setClubInfo({ ...clubInfo, title: e })} />
                    </InputStyle>
                    <InputStyle inputTitle="Is private club">
                        <Switch checked={clubInfo.isPrivate} onChange={(e) => setClubInfo({ ...clubInfo, isPrivate: e })} />
                    </InputStyle>

                    <Button type="primary" style={styles.createBtn} onPress={() => onCreateClub()}>
                        Create a club
                    </Button>
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
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
        position: "absolute",
        right: 16,
        bottom: 50,
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
        width: 100,
        height: "100%",
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
