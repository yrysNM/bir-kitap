import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { View, StyleSheet, Text, Modal, TouchableOpacity } from "react-native"
import InputItem from "@ant-design/react-native/lib/input-item"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import Button from "@ant-design/react-native/lib/button"
import Icon from "@ant-design/react-native/lib/icon"
import { useState } from "react"
import { InputStyle } from "../components/InputStyle"
import List from "@ant-design/react-native/lib/list"
import useApi from "../hook/useApi"
import { IconNames } from "@ant-design/react-native/es/icon"

interface iRegister {
    email: string
    fullName: string
    phone: string
    password: string
    birth: Date
    gender: string
}

export const CreateAccount = () => {
    const [genderList] = useState<{ label: string; value: string; icon: IconNames }[]>([
        { label: "Female", value: "female", icon: "woman" },
        { label: "Male", value: "male", icon: "man" },
    ])
    const [isSelectGender, setIsSelectGender] = useState<boolean>(false)
    const [dateBirth, setDateBirth] = useState<Date | undefined>(undefined)
    const [info, setInfo] = useState<iRegister>({
        birth: new Date(),
        email: "",
        fullName: "",
        password: "",
        phone: "",
        gender: "",
    })
    const { fetchData, data, isLoading, error } = useApi<iRegister>("/auth/register", "POST")

    const onSubmit = async () => {
        if (isNotEmpty()) {
            await fetchData({
                ...info,
                birth: new Date(info.birth).getTime(),
            })
            console.log(data, isLoading, error)
        }
    }

    const isNotEmpty = () => {
        return Object.values(info).every((item) => item)
    }

    const handleSelectGender = (item: string) => {
        setInfo((info) => ({ ...info, gender: item }))
        setIsSelectGender(false)
    }

    return (
        <Page>
            <Header isCustomHeader={true} title={"Create an account"} />
            <View style={{ marginTop: 20, gap: 11 }}>
                <InputStyle inputTitle={"E-mail"}>
                    <InputItem type="text" style={styles.input} value={info.email} onChange={(value) => setInfo((info) => ({ ...info, email: value }))} placeholder={"example@gmail.com"} />
                </InputStyle>
                <InputStyle inputTitle={"Nickname"}>
                    <InputItem type="text" style={styles.input} value={info.fullName} onChange={(value) => setInfo((info) => ({ ...info, fullName: value }))} placeholder={"Jack Jones"} />
                </InputStyle>
                <InputStyle inputTitle={"Number phone"}>
                    <InputItem type="phone" style={styles.input} placeholder="+7" value={info.phone} onChange={(value) => setInfo((info) => ({ ...info, phone: value }))} />
                </InputStyle>
                <InputStyle inputTitle={"Password"}>
                    <InputItem type="password" style={styles.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />

                    <Text style={styles.inputExtensionText}>Use at least 8 characters</Text>
                </InputStyle>
                <InputStyle inputTitle={"Date of Birth"}>
                    <View style={styles.datePickerInput}>
                        <DatePicker style={{ borderWidth: 0 }} mode="date" defaultDate={new Date()} value={dateBirth} onChange={(value) => setDateBirth(value)} format="YYYY-MM-DD">
                            <List.Item style={{ marginLeft: -5 }} arrow="horizontal">
                                Select Date
                            </List.Item>
                        </DatePicker>
                    </View>
                </InputStyle>
                <InputStyle inputTitle={"Gender"}>
                    <View style={styles.datePickerInput}>
                        <TouchableOpacity style={{ ...styles.selectGenderInput }} onPress={() => setIsSelectGender(true)}>
                            <Text style={{ fontSize: 19, fontWeight: "500", color: "#808080" }}>{info.gender ? genderList.find((item) => item.value === info.gender)?.label : "Gender"}</Text>
                            <Icon name="down" size={25} color="black" />
                        </TouchableOpacity>
                        <Modal animationType="slide" transparent={true} visible={isSelectGender} onRequestClose={() => setIsSelectGender(false)}>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                                    {genderList.map((gender) => (
                                        <TouchableOpacity style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", gap: 50 }} key={gender.value} onPress={() => handleSelectGender(gender.value)}>
                                            <Text>{gender.label}</Text>
                                            <Icon name={gender.icon} size={20} color={"#000"} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </Modal>
                    </View>
                </InputStyle>

                <View style={styles.footerInfo}>
                    <Button style={styles.footerBtn} onPress={() => onSubmit()}>
                        <Text style={styles.footerBtnText}>Sign up</Text>
                    </Button>

                    <View style={styles.orText}>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                        <Text>or</Text>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                    </View>

                    <Text style={styles.logText}>Already have an account? Log in</Text>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    footerInfo: {
        marginTop: 50,
    },
    orText: {
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 11,
    },
    logText: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 14,
        fontWeight: "700",
    },
    footerBtn: {
        borderRadius: 20,
        width: "100%",
        height: 54,
        backgroundColor: "#0c1e34",
    },
    footerBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#f9faf8",
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
    selectGenderInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    modalGender: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "70%",
        gap: 20,
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
    inputExtensionText: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 13,
    },
})
