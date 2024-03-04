import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { ILogin, LoginAPI } from "../api/authApi"
import Button from "@ant-design/react-native/lib/button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAppDispatch } from "../hook/useStore"
import { useNavigation } from "@react-navigation/native"
import { setUserInfo } from "../redux/features/userInfoSlice"
import { Fuse } from "../layouts/Fuse"

export const Login = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [info, setInfo] = useState<ILogin>({
        username: "",
        password: "",
    })
    const { res, isLoading, error, fetchData } = LoginAPI()

    useEffect(() => {
        initialData()
    }, [isLoading])

    const onLogin = async () => {
        await fetchData(info)
    }

    const initialData = async () => {
        if (!isLoading && res?.result_code === 0) {
            await AsyncStorage.setItem(
                "token",
                JSON.stringify({
                    token: res.data.token,
                    refresh_token: res.data.refreshToken,
                    tokenExpireToken: res.data.tokenExpireToken,
                }),
            )

            dispatch(setUserInfo(res.data.userInfo))
        }
    }

    return (
        <Page>
            <Fuse isLoading={isLoading} error={error?.message}>
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
                <View style={styles.loginBtnWrapper}>
                    <Button style={{ ...styles.btnWrapper, backgroundColor: "#005479" }} onPress={onLogin}>
                        <Text style={styles.btnText}>Login in</Text>
                    </Button>

                    <Text style={styles.forGotPasWordText}>Forgot password?</Text>

                    <View>
                        <View style={styles.orText}>
                            <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                            <Text>or</Text>
                            <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                        </View>
                    </View>

                    <Button style={{ ...styles.btnWrapper, backgroundColor: "#0C1E34", marginTop: 40 }} onPress={() => navigation.navigate("CreateAccountScreen" as never)}>
                        <Text style={styles.btnText}>Create an account</Text>
                    </Button>
                </View>
            </Fuse>
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
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 11,
    },
    loginBtnWrapper: {
        marginTop: 50,
        flexDirection: "column",
    },
    btnWrapper: {
        borderRadius: 20,
        textAlign: "center",
    },
    btnText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    forGotPasWordText: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center",
    },
})
