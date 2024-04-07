import { Image, Text, View, StyleSheet, TouchableOpacity, Easing, Dimensions } from "react-native"
import UserImg from "../../assets/images/custom-user-profile.jpg"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { Fuse } from "../layouts/Fuse"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import List from "@ant-design/react-native/lib/list"
import Icon from "@ant-design/react-native/lib/icon"
import { useNavigation } from "@react-navigation/native"
import Popover from "@ant-design/react-native/lib/popover"
import { useState } from "react"
import { UserAPI } from "../api/userApi"

interface IEdit {
    email: string
    fullname: string
    gender: string
}

export const EditProfile = () => {
    const navigation = useNavigation()
    const [dateOfBirth, setDateOfBirth] = useState<Date>()
    const [edit, setEdit] = useState<IEdit>({
        email: "",
        fullname: "",
        gender: "",
    })
    const [error, setError] = useState<string>("")

    const { fetchData } = UserAPI("profile/edit")

    const handleChangeEditProfileEvent = (event: any) => {
        const { name, value } = event
        setEdit({ ...edit, [name]: value })
    }

    const onEdit = async () => {
        try {
            if (dateOfBirth && edit.email && edit.fullname && edit.gender) {
                await fetchData({
                    fullName: edit.fullname,
                    gender: edit.gender,
                })
                    .then((res) => {
                        if (res && res.result_code === 0) {
                            setError("")
                        }
                    })
                    .catch((err) => {
                        if (err) {
                            setError("Required all input")
                        }
                    })
            }
        } catch (error) {
            setError("Required all input")
            console.log(error)
        }
    }

    return (
        <Fuse>
            <View style={{ backgroundColor: "#005479" }}>
                <View style={styles.headerCommon}>
                    <TouchableOpacity onPressIn={() => navigation.goBack()}>
                        <Icon style={styles.icon} name="left" />
                    </TouchableOpacity>
                    <Text style={styles.titleCommon}>Edit Profile</Text>
                </View>

                <View style={{ marginTop: 46, gap: 12, justifyContent: "center", alignItems: "center" }}>
                    <Image source={UserImg} style={styles.userImg} />
                    <Text style={styles.profileText}>Profile phoxto</Text>
                </View>
                <View style={styles.userInputWrapper}>
                    <InputStyle inputTitle="E-mail">
                        <InputItem type="email-address" style={styles.input} placeholder={"example@gmail.com"} name="email" value={edit.email} onChange={(e) => handleChangeEditProfileEvent(e)} />
                    </InputStyle>
                    <InputStyle inputTitle="Full name">
                        <InputItem type="text" style={styles.input} placeholder="Jack Jones" name="fullname" value={edit.fullname} onChange={(e) => handleChangeEditProfileEvent(e)} />
                    </InputStyle>

                    <InputStyle inputTitle="Date of Birth">
                        <View style={styles.datePickerInput}>
                            <DatePicker style={{ borderWidth: 0 }} mode="date" defaultDate={new Date()} format="YYYY-MM-DD" value={dateOfBirth} onChange={(e) => setDateOfBirth(e)}>
                                <List.Item style={{ marginLeft: -5 }} arrow="horizontal">
                                    Select Date
                                </List.Item>
                            </DatePicker>
                        </View>
                    </InputStyle>

                    <InputStyle inputTitle="Gender">
                        <Popover
                            placement="top"
                            useNativeDriver
                            duration={200}
                            easing={(show) => (show ? Easing.in(Easing.ease) : Easing.step0)}
                            onSelect={(e) => setEdit({ ...edit, gender: e })}
                            overlay={
                                <View style={{ width: 200 }}>
                                    <Popover.Item value="Male">
                                        <Text>Male</Text>
                                    </Popover.Item>
                                    <Popover.Item value="Female">
                                        <Text>Female</Text>
                                    </Popover.Item>
                                </View>
                            }>
                            <View style={[styles.input, { height: 44, width: Dimensions.get("window").width - 70, marginLeft: -1 }]}>
                                <Text style={{ color: "#808080" }}>Gender</Text>
                            </View>
                        </Popover>
                    </InputStyle>
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
})
