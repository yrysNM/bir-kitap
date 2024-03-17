import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { IUserInfo } from "../api/authApi"
import { useState } from "react"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import List from "@ant-design/react-native/lib/list"
import Modal from "@ant-design/react-native/lib/modal"
import Icon, { IconNames } from "@ant-design/react-native/lib/icon"
import Button from "@ant-design/react-native/lib/button"

const EditProfile = () => {
    const [info, setInfo] = useState<IUserInfo>({
        birth: new Date(),
        email: "",
        fullName: "",
        password: "",
        phone: "",
        gender: "",
    })
    const [dateBirth, setDateBirth] = useState<Date | undefined>(undefined)
    const [genderList] = useState<{ label: string; value: string; icon: IconNames }[]>([
        { label: "Female", value: "female", icon: "woman" },
        { label: "Male", value: "male", icon: "man" },
    ])
    const [isSelectGender, setIsSelectGender] = useState<boolean>(false)

    const handleSelectGender = (item: string) => {
        setInfo((info) => ({ ...info, gender: item }))
        setIsSelectGender(false)
    }

    return (
        <Page backColor="#005479">
            <Header isCustomHeader={true} />
            <View>
                <View style={style.editPhoto}>
                    <View style={style.avatar} />
                    <Image source={require("../../assets/edit.png")} style={style.photo} resizeMode="contain" />
                </View>
                <View style={style.homeContent}>
                    <Text style={[style.text, style.homeTitle]}>Profile photo</Text>
                </View>
            </View>

            <View style={style.homeNav}>
                <InputStyle inputTitle={"E-mail"}>
                    <InputItem type="email-address" style={style.input} value={info.email} onChange={(value) => setInfo((info) => ({ ...info, email: value }))} placeholder={"example@gmail.com"} />
                </InputStyle>
                <InputStyle inputTitle={"Nickname"}>
                    <InputItem type="text" style={style.input} value={info.fullName} onChange={(value) => setInfo((info) => ({ ...info, fullName: value }))} placeholder={"Jack Jones"} />
                </InputStyle>

                <InputStyle inputTitle={"Date of Birth"}>
                    <View style={style.datePickerInput}>
                        <DatePicker style={{ borderWidth: 0 }} mode="date" defaultDate={new Date()} value={dateBirth} onChange={(value) => setDateBirth(value)} format="YYYY-MM-DD">
                            <List.Item style={{ marginLeft: -5 }} arrow="horizontal">
                                Select Date
                            </List.Item>
                        </DatePicker>
                    </View>
                </InputStyle>

                <InputStyle inputTitle={"Gender"}>
                    <View style={style.datePickerInput}>
                        <TouchableOpacity style={{ ...style.selectGenderInput }} onPress={() => setIsSelectGender(true)}>
                            <Text style={{ fontSize: 19, fontWeight: "500", color: genderList.some((item) => item.value === info.gender) ? "#000" : "#808080" }}>{info.gender ? genderList.find((item) => item.value === info.gender)?.label : "Gender"}</Text>
                            <Icon name="down" size={25} color="black" />
                        </TouchableOpacity>
                        <Modal animationType="slide" transparent maskClosable visible={isSelectGender} onClose={() => setIsSelectGender(false)}>
                            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, gap: 20 }}>
                                {genderList.map((gender) => (
                                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", gap: 50 }} key={gender.value} onPress={() => handleSelectGender(gender.value)}>
                                        <Text>{gender.label}</Text>
                                        <Icon name={gender.icon} size={20} color={"#000"} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </Modal>
                    </View>
                </InputStyle>

                <Button style={style.footerBtn}>
                    <Text style={style.footerBtnText}>Sign up</Text>
                </Button>
            </View>
        </Page>
    )
}

const style = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#eee",
        marginLeft: "50%",
        transform: [{ translateX: -50 }],
    },

    text: {
        color: "white",
        textAlign: "center",
    },

    homeContent: {
        marginTop: 13.03,
        marginBottom: 26,
    },

    homeTitle: {
        fontSize: 30,
        fontWeight: "600",
    },

    homeNav: {
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingBottom: 31,
        paddingHorizontal: 26,
        paddingTop: 20,
    },

    homeNavLinks: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 30,
    },

    editPhoto: {
        position: "relative",
    },

    photo: {
        width: 30,
        height: 30,
        position: "absolute",
        bottom: 0,
        left: "55%",
    },

    input: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        paddingLeft: 10,
        borderRadius: 12,
        marginLeft: -15,
        marginRight: -15,
        backgroundColor: "#F9FAF8",
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
        backgroundColor: "#F9FAF8",
    },

    selectGenderInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },

    footerBtn: {
        marginTop: 42,
        borderRadius: 20,
        width: "100%",
        backgroundColor: "#FFED4A",
        borderWidth: 0,
    },

    footerBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
})

export default EditProfile
