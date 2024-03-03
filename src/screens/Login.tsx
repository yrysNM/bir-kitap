import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import {useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { ILogin } from "../api/authApi"
import Button from "@ant-design/react-native/lib/button"

export const Login = () => {
    const [info, setInfo] = useState<ILogin>({
        username: "",
        password: "",
    })


    return (
        <Page>
            <Header isCustomHeader={true} title={"Welcome back"} />

            <View style={{ marginTop: 20, gap: 35 }}>
                <InputStyle inputTitle={"E-mail"}>
                    <InputItem type="email-address" style={styles.input} value={info.username} onChange={(value) => setInfo((info) => ({ ...info, username: value }))}></InputItem>
                </InputStyle>

                <InputStyle inputTitle={"Password"}>
                    <InputItem type="password" style={styles.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />

                    <Text style={styles.inputExtensionText}>Use at least 8 characters</Text>
                </InputStyle>
            </View>
            <View>
                <Button>Login in</Button>

                <Text>Forgot password?</Text>

                <View>
                    <View style={styles.orText}>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                        <Text>or</Text>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                    </View>
                </View>

                <Button>Create an account</Button>
            </View>
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
        marginRight: -15,
    },
    inputExtensionText: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 13,
    },
    orText: {
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 11,
    },
})
