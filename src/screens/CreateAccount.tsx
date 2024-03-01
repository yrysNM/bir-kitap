import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { View, StyleSheet, Text } from "react-native"
import InputItem from "@ant-design/react-native/lib/input-item"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import Button from "@ant-design/react-native/lib/button"
import { useState } from "react"
import { InputStyle } from "../components/InputStyle"
import List from "@ant-design/react-native/lib/list"
import useApi from "../hook/useApi"

interface iRegister {
    email: string
    fullName: string
    phone: string
    password: string
    birth: Date
    gender: string
}

export const CreateAccount = () => {
    const [dateBirth, setDateBirth] = useState<Date | undefined>(undefined)
    const [info, setInfo] = useState<iRegister>({
        birth: new Date(),
        email: "",
        fullName: "",
        password: "",
        phone: "",
        gender: "male",
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

    return (
        <Page>
            <Header isCustomHeader={true} title={"Create an account"} />
            <View style={{ marginTop: 20, gap: 11 }}>
                <InputStyle inputTitle={"E-mail"}>
                    <InputItem type={"text"} style={styles.input} value={info.email} onChange={(value) => setInfo((info) => ({ ...info, email: value }))} placeholder={"example@gmail.com"} />
                </InputStyle>
                <InputStyle inputTitle={"Nickname"}>
                    <InputItem type={"text"} style={styles.input} value={info.fullName} onChange={(value) => setInfo((info) => ({ ...info, fullName: value }))} placeholder={"Jack Jones"} />
                </InputStyle>
                <InputStyle inputTitle={"Number phone"}>
                    <InputItem type={"phone"} style={styles.input} value={info.phone} onChange={(value) => setInfo((info) => ({ ...info, phone: value }))} />
                </InputStyle>
                <InputStyle inputTitle={"Password"}>
                    <InputItem style={styles.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />

                    <Text style={styles.inputExtensionText}>Use at least 8 characters</Text>
                </InputStyle>
                <InputStyle inputTitle={"Date of Birth"}>
                    <View style={styles.datePickerInput}>
                        <DatePicker mode="date" defaultDate={new Date()} value={dateBirth} onChange={(value) => setDateBirth(value)} format="YYYY-MM-DD">
                            <List.Item style={{ marginLeft: -5 }} arrow="horizontal">
                                Select Date
                            </List.Item>
                        </DatePicker>
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
        height: 60,
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        justifyContent: "center",
        overflow: "hidden",
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
