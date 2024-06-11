import { Text, View, StyleSheet, TouchableOpacity, Easing, Dimensions, Image, ScrollView } from "react-native"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import List from "@ant-design/react-native/lib/list"
import { useNavigation } from "@react-navigation/native"
import Toast from "@ant-design/react-native/lib/toast"
import Popover from "@ant-design/react-native/lib/popover"
import Modal from "@ant-design/react-native/lib/modal"
import { useEffect, useRef, useState } from "react"
import { UserAPI } from "../api/userApi"
import Button from "@ant-design/react-native/lib/button"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { FirstUpperCaseText } from "../helpers/firstUpperCaseText"
import { CloudImage } from "../components/CloudImage"
import ArrowBackImg from "../../assets/images/arrow-back.png"
import EditImg from "../../assets/images/edit.png"
import { setUserInfo } from "../redux/features/mainSlice"
import { Loading } from "../components/Loading"

const Item = Popover.Item

interface IEdit {
    email: string
    fullname: string
    gender: string
    avatar: string
}

export const EditProfile = () => {
    const popoverRef = useRef<Popover | null>(null)
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [dateOfBirth, setDateOfBirth] = useState<Date>()
    const [avatarList, setAvatarList] = useState<string[]>([])
    const [showAvatarModal, setShowAvatarModal] = useState<boolean>(false)
    const [edit, setEdit] = useState<IEdit>({
        email: "",
        fullname: "",
        gender: "",
        avatar: "public/avatar/logo3.png",
    })

    const { fetchData: fetchUserEditData } = UserAPI("profile/edit")
    const { fetchData: fetchAvatarListData } = UserAPI("avatar/list")
    const { userInfo, isLoading } = useAppSelector((state) => state.mainSlice)

    const onEdit = async () => {
        await fetchUserEditData({
            fullName: edit.fullname,
            birth: Number(new Date(dateOfBirth || "").getTime()),
            gender: edit.gender,
            avatar: edit.avatar,
        }).then((res) => {
            if (res && res.result_code === 0) {
                dispatch(
                    setUserInfo({
                        ...userInfo,
                        fullName: edit.fullname,
                        avatar: edit.avatar,
                        gender: edit.gender,
                        birth: Number(new Date(dateOfBirth || "").getTime()),
                    }),
                )
                Toast.success("Updated")
            }
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        if (userInfo) {
            setEdit({
                email: userInfo.email,
                fullname: userInfo.fullName,
                gender: userInfo.gender,
                avatar: userInfo.avatar || "",
            })
        }

        setDateOfBirth(new Date(userInfo.birth))

        await fetchAvatarListData({}).then((res) => {
            if (res.result_code === 0) {
                setAvatarList(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }

    const onSelectGender = (gender: string) => {
        setEdit({ ...edit, gender })
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: "#0A78D6" }}>
                <TouchableOpacity onPressIn={() => navigation.goBack()} style={styles.headerCommon}>
                    <Image source={ArrowBackImg} style={styles.icon_back} />
                    <Text style={styles.titleCommon}>Edit Profile</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 46, gap: 12, justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <CloudImage url={edit.avatar} styleImg={styles.userImg} />
                    <Text style={styles.profileText}>Profile photo</Text>
                    <TouchableOpacity onPress={() => setShowAvatarModal(true)} style={styles.editBlock}>
                        <Image source={EditImg} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.userInputWrapper}>
                    <InputStyle inputTitle="E-mail">
                        <InputItem cursorColor="#0A78D6" selectionColor="rgba(10, 120, 214, 0.3)" disabled type="email-address" style={styles.input} placeholder={"example@gmail.com"} name="email" value={edit.email} onChange={(e) => setEdit((edit) => ({ ...edit, email: e }))} />
                    </InputStyle>
                    <InputStyle inputTitle="Full name">
                        <InputItem cursorColor="#0A78D6" selectionColor="rgba(10, 120, 214, 0.3)" type="text" style={styles.input} placeholder="Jack Jones" name="fullname" value={edit.fullname} onChange={(e) => setEdit((edit) => ({ ...edit, fullname: e }))} />
                    </InputStyle>

                    <InputStyle inputTitle="Date of Birth">
                        <View style={styles.datePickerInput}>
                            <DatePicker style={{ borderWidth: 0 }} minDate={new Date(1970, 7, 6)} maxDate={new Date()} mode="date" defaultDate={new Date()} format="YYYY-MM-DD" value={dateOfBirth} onChange={(e) => setDateOfBirth(e)}>
                                <List.Item style={{ marginLeft: -5 }} arrow="horizontal">
                                    Select Date
                                </List.Item>
                            </DatePicker>
                        </View>
                    </InputStyle>

                    <InputStyle inputTitle="Gender">
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
                                        <Item key={"Male"} value="male">
                                            <Text
                                                onPress={() => {
                                                    onSelectGender("male")
                                                    closePopover()
                                                }}>
                                                Male
                                            </Text>
                                        </Item>
                                        <Item key={"Female"} value="female">
                                            <Text
                                                onPress={() => {
                                                    onSelectGender("female")
                                                    closePopover()
                                                }}>
                                                Female
                                            </Text>
                                        </Item>
                                    </View>
                                )
                            }}>
                            <View style={[styles.input, { height: 44, width: Dimensions.get("window").width - 70, marginLeft: -1 }]}>
                                <Text style={{ color: edit.gender ? "#000" : "#808080" }}>{edit.gender ? FirstUpperCaseText(edit.gender) : "Gender"}</Text>
                            </View>
                        </Popover>
                    </InputStyle>

                    <Button style={styles.footerBtn} onPress={() => onEdit()}>
                        <Text style={styles.footerBtnText}>Save</Text>
                    </Button>
                </View>
                <Modal animationType="fade" transparent={false} visible={showAvatarModal} onClose={() => setShowAvatarModal(false)} maskClosable style={styles.modalWrapper}>
                    <View style={styles.avatarListWrapper}>
                        {avatarList.map((item, i) => (
                            <TouchableOpacity key={i} style={[styles.avatarBlock, { backgroundColor: item === edit.avatar ? "#0a78d6" : "#fff" }]} onPress={() => setEdit({ ...edit, avatar: item })}>
                                <CloudImage url={item} styleImg={styles.avatarImg} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Modal>
            </View>
            {isLoading && <Loading />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    avatarListWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
    },
    avatarBlock: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarImg: {
        width: 80,
        height: 80,
        objectFit: "cover",
        borderRadius: 100,
    },
    modalWrapper: {
        paddingTop: 32,
        marginHorizontal: 32,
        borderRadius: 12,
        paddingBottom: 20,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: -Dimensions.get("screen").height / 2,
    },
    icon_back: {
        width: 24,
        height: 24,
        objectFit: "contain",
        tintColor: "#fff",
    },
    editBlock: {
        position: "absolute",
        bottom: 50,
        left: Dimensions.get("screen").width / 2 + 30,
        zIndex: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 100,
        elevation: 6,
        shadowOpacity: 1,
    },
    editIcon: {
        width: 20,
        objectFit: "contain",
        height: 20,
    },
    titleCommon: {
        fontWeight: "600",
        fontSize: 24,
        color: "#fff",
        marginBottom: 3,
    },
    headerCommon: {
        marginTop: 20,
        marginLeft: 16,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    userImg: {
        width: 135,
        height: 135,
        objectFit: "cover",
        borderRadius: 1000,
    },
    profileText: {
        fontSize: 26,
        fontWeight: "600",
        lineHeight: 30,
        color: "#fff",
    },
    userInputWrapper: {
        height: "100%",
        marginTop: 50,
        paddingVertical: 30,
        paddingHorizontal: 35,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: "#fff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
    },
    input: {
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "#212121",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        marginLeft: -15,
        marginRight: -15,
        backgroundColor: "#FFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 2,
        elevation: 6,
        shadowOpacity: 1,
    },
    datePickerInput: {
        height: 45,
        width: "100%",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "#000",
        borderRadius: 10,
        justifyContent: "center",
        overflow: "hidden",
    },

    footerBtn: {
        borderRadius: 12,
        width: "100%",
        height: 54,
        backgroundColor: "#0A78D6",
        marginTop: 12,
    },
    footerBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
})
