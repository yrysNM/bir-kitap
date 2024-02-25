import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { View, StyleSheet, Text } from "react-native"
import InputItem from "@ant-design/react-native/lib/input-item"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import { useState } from "react"
import { InputStyle } from "../components/InputStyle"
import Provider from "@ant-design/react-native/lib/provider"
import List from "@ant-design/react-native/lib/list"

export const CreateAccount = () => {
    const [dateBirth, setDateBirth] = useState<Date | undefined>(undefined)
    const [info, setInfo] = useState<{ email: string; fullName: string; phone: string; password: string; gender: string; birth: Date }>({
        birth: new Date(),
        email: "",
        fullName: "",
        gender: "",
        password: "",
        phone: "",
    })

    return (
        <Page>
            <Header isCustomHeader={true} title={"Create an account"} />
            <Provider>
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
                        <Text>Test</Text>
                        <Provider>
                            <DatePicker value={dateBirth} onChange={(value) => setDateBirth(value)} format={"DD-MM-YYYY"}>
                                <List.Item arrow="horizontal">Select Date</List.Item>
                            </DatePicker>
                        </Provider>
                    </InputStyle>
                </View>
            </Provider>
        </Page>
    )
}

const styles = StyleSheet.create({
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
    },
    inputExtensionText: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 13,
    },
})
