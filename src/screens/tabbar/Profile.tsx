import { View, Text, StyleSheet, TouchableOpacity, Easing, FlatList, Dimensions } from "react-native"
import { useAppSelector } from "../../hook/useStore"
import { useRef, useState } from "react"
import { Page } from "../../layouts/Page"
import Icon from "@ant-design/react-native/lib/icon"
import Modal from "@ant-design/react-native/lib/modal"
import { logOut as logOutHelper } from "../../helpers/logOut"
import { useNavigation } from "@react-navigation/native"
import Popover from "@ant-design/react-native/lib/popover"
import i18next from "i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTranslation } from "react-i18next"
import { Loading } from "../../components/Loading"
import { UserProfileComponent } from "../../components/UserProfileComponent"

const Item = Popover.Item

export const Profile = () => {
    const { i18n } = useTranslation()
    const popoverRef = useRef<Popover | null>(null)
    const navigation = useNavigation()
    const { isLoading } = useAppSelector((state) => state.mainSlice)
    const logOut = logOutHelper()
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false)
    const languages = [
        { label: "English", value: "en" },
        { label: "Қазақша", value: "kk" },
    ]

    const onChangeLang = async (lang: string) => {
        try {
            await AsyncStorage.setItem("lang", lang)
            i18next.changeLanguage(lang)
        } catch {
            console.log("err in saving data")
        }
    }

    return (
        <Page>
            <TouchableOpacity onPress={() => setVisibleModal(true)} delayPressIn={5}>
                <Icon name="setting" style={styles.settingIcon} />
            </TouchableOpacity>

            <UserProfileComponent id="add" />

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
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
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

                    <TouchableOpacity style={styles.modalWrapperBlock} onPress={() => setShowWarningModal(true)}>
                        <Icon name="logout" style={{ color: "red" }} />
                        <Text style={[styles.infoText, { color: "red" }]}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={false} visible={showWarningModal} onClose={() => setShowWarningModal(false)} maskClosable style={styles.modalWrapperWarning}>
                <View>
                    <Text style={styles.tileWarningText}>Are you sure logout ?</Text>
                </View>
                <View style={styles.warningBtns}>
                    <Text style={[styles.btnText, styles.cancelText]} onPress={() => setShowWarningModal(false)}>
                        No
                    </Text>
                    <Text style={[styles.btnText, { color: "#ed1834", fontWeight: "500" }]} onPress={() => logOut()}>
                        Yes
                    </Text>
                </View>
                {isLoading && <Loading />}
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
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
