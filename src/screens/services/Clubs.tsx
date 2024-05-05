import { Image, Text, View, StyleSheet, PanResponder, Dimensions, TouchableOpacity } from "react-native"
import { CloudImage } from "../../components/CloudImage"
import { Page } from "../../layouts/Page"
import { useEffect, useState } from "react"
import { CustomTabs } from "../../components/CustomTabs"
import ClubImg from "../../../assets/images/category/club.png"
import { Header } from "../../components/Header"
import { NoData } from "../../components/NoData"
import AddClubImg from "../../../assets/images/add-club.png"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Modal from "@ant-design/react-native/lib/modal"
import { InputStyle } from "../../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import Switch from "@ant-design/react-native/lib/switch"
import Button from "@ant-design/react-native/lib/button"
import { ClubAPI } from "../../api/clubApi"
import Toast from "@ant-design/react-native/lib/toast"

export const Clubs = () => {
    const { fetchData: fetchCreateClubData } = ClubAPI("create")
    const screenWidth = Dimensions.get("window").width
    const screenHeight = Dimensions.get("window").height
    const tabs = [
        {
            label: "Clubs",
            value: "clubs",
        },
        { label: "My clubs", value: "my_clubs" },
    ]
    const [tab, setTab] = useState<string>("clubs")
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: screenWidth - 80,
        y: screenHeight - 70,
    })
    const [clubInfo, setClubInfo] = useState<{ title: string; isPrivate: boolean }>({ title: "", isPrivate: false })
    const [showAddClubModal, setShowAddClubModal] = useState<boolean>(false)

    useEffect(() => {
        AsyncStorage.getItem("clubAddElementPosition").then((value) => {
            console.log(value)
        })
    }, [])

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderMove: (event, gesture) => {
            const newX = position.x + gesture.dx
            const newY = position.y + gesture.dy

            if (newX >= 0 && newX <= screenWidth - 50 && newY >= 0 && newY <= screenHeight - 50) {
                setPosition({ x: newX, y: newY })
            }
        },
        onPanResponderRelease: () => {
            savePosition()
        },
    })

    const savePosition = async () => {
        try {
            await AsyncStorage.setItem("clubAddElementPosition", JSON.stringify(position))
        } catch (error) {
            console.error("Error saving position:", error)
        }
    }

    const onCreateClub = () => {
        fetchCreateClubData(clubInfo).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created post")
                setClubInfo({ title: "", isPrivate: false })
                setShowAddClubModal(false)
            }
        })
    }

    console.log(position)

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
                <TouchableOpacity onPress={() => setShowAddClubModal(true)} style={[styles.addClubWrapper, { left: position.x, top: position.y }]} {...panResponder.panHandlers}>
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
                        <Switch checked={clubInfo.isPrivate} />
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
