import { Text, View, StyleSheet, TouchableOpacity, Easing, Dimensions } from "react-native"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { Fuse } from "../layouts/Fuse"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import List from "@ant-design/react-native/lib/list"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"
import Toast from "@ant-design/react-native/lib/toast"
import Popover from "@ant-design/react-native/lib/popover"
import { useEffect, useRef, useState } from "react"
import { UserAPI } from "../api/userApi"
import Button from "@ant-design/react-native/lib/button"
import { useAppSelector } from "../hook/useStore"
import { FirstUpperCaseText } from "../helpers/firstUpperCaseText"
import { CloudImage } from "../components/CloudImage"

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
    const [dateOfBirth, setDateOfBirth] = useState<Date>()
    const [edit, setEdit] = useState<IEdit>({
        email: "",
        fullname: "",
        gender: "",
        avatar: "public/avatar/logo3.png",
    })

    const { fetchData } = UserAPI("profile/edit")
    const { userInfo } = useAppSelector((state) => state.mainSlice)

    const onEdit = async () => {
        await fetchData({
            fullName: edit.fullname,
            birth: Number(new Date(dateOfBirth || "").getTime()),
            gender: edit.gender,
            avatar: edit.avatar,
        }).then((res) => {
            if (res && res.result_code === 0) {
                Toast.success("Updated")
            }
        })
    }

    useEffect(() => {
        if (userInfo) {
            setEdit({
                email: userInfo.email,
                fullname: userInfo.fullName,
                gender: userInfo.gender,
                avatar: "public/avatar/logo3.png",
            })
        }

        setDateOfBirth(new Date(userInfo.birth))
    }, [userInfo])

    const onSelectGender = (gender: string) => {
        setEdit({ ...edit, gender })
    }

    return (
        <Fuse>
            <View style={{ backgroundColor: "#0A78D6" }}>
                <View style={styles.headerCommon}>
                    <TouchableOpacity onPressIn={() => navigation.goBack()}>
                        <Icon style={styles.icon} name="left" />
                    </TouchableOpacity>
                    <Text style={styles.titleCommon}>Edit Profile</Text>
                </View>

                <View style={{ marginTop: 46, gap: 12, justifyContent: "center", alignItems: "center" }}>
                    <CloudImage url={edit.avatar} styleImg={styles.userImg} />
                    <Text style={styles.profileText}>Profile photo</Text>
                </View>
                <View style={styles.userInputWrapper}>
                    <InputStyle inputTitle="E-mail">
                        <InputItem type="email-address" style={styles.input} placeholder={"example@gmail.com"} name="email" value={edit.email} onChange={(e) => setEdit((edit) => ({ ...edit, email: e }))} />
                    </InputStyle>
                    <InputStyle inputTitle="Full name">
                        <InputItem type="text" style={styles.input} placeholder="Jack Jones" name="fullname" value={edit.fullname} onChange={(e) => setEdit((edit) => ({ ...edit, fullname: e }))} />
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
            </View>
        </Fuse>
    )
}

const styles = StyleSheet.create({
    icon: {
        color: "#fff",
        fontSize: 35,
        borderRadius: 10,
    },
    titleCommon: {
        fontWeight: "600",
        fontSize: 20,
        color: "#fff",
    },
    headerCommon: {
        marginTop: 34,
        marginLeft: 16,
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },

    userImg: {
        width: 135,
        height: 135,
        objectFit: "contain",
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
        backgroundColor: "#F9FAF8",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 1.0)",
    },
    input: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 20,
        marginLeft: -15,
        marginRight: -15,
    },
    datePickerInput: {
        height: 45,
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        justifyContent: "center",
        overflow: "hidden",
    },

    footerBtn: {
        borderRadius: 20,
        width: "100%",
        height: 54,
        backgroundColor: "#FFED4A",
        marginTop: 12,
    },
    footerBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
})
