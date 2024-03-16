import { Header } from "../components/Header"
import { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import { ILogin, LoginAPI } from "../api/authApi"
import Button from "@ant-design/react-native/lib/button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { useNavigation } from "@react-navigation/native"
import { setHasLogin, setUserInfo } from "../redux/features/mainSlice"
import Icon from "@ant-design/react-native/lib/icon"

export const Login = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { isLoading, hasLogin } = useAppSelector((state) => state.mainSlice)
    const [info, setInfo] = useState<ILogin>({
        username: "",
        password: "",
    })
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
    const { fetchData } = LoginAPI()

    const onLogin = async () => {
        await fetchData(info).then(async (res) => {
            if (!isLoading && res?.result_code === 0) {
                await AsyncStorage.setItem(
                    "token",
                    JSON.stringify({
                        token: res.data.token,
                        refresh_token: res.data.refreshToken,
                        tokenExpireToken: res.data.tokenExpireToken,
                    }),
                )
                dispatch(setHasLogin(true))
                dispatch(setUserInfo(res.data.userInfo))
            }
        })
        if (hasLogin) navigation.navigate("HomeScreen" as never)
    }

    return (
        <>
            <Header isCustomHeader={true} title={"Welcome back"} />

            <View style={{ marginTop: 20, gap: 35 }}>
                <InputStyle inputTitle={"E-mail"}>
                    <InputItem type="email-address" style={styles.input} value={info.username} onChange={(value) => setInfo((info) => ({ ...info, username: value }))}></InputItem>
                </InputStyle>

                <InputStyle inputTitle={"Password"}>
                    <InputItem type={!isVisiblePassword ? "password" : "text"} style={styles.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />
                    {isVisiblePassword ? <Icon onPress={() => setIsVisiblePassword(false)} name={"eye"} style={styles.iconEye} /> : <Icon onPress={() => setIsVisiblePassword(true)} name={"eye-invisible"} style={styles.iconEye} />}
                    <Text style={styles.inputExtensionText}>Use at least 8 characters</Text>
                </InputStyle>
            </View>
            <View style={styles.loginBtnWrapper}>
                <Button style={{ ...styles.btnWrapper, backgroundColor: "#005479" }} onPress={onLogin}>
                    <Text style={styles.btnText}>Login in</Text>
                </Button>

                <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen" as never)}>
                    <Text style={styles.forGotPasWordText}>Forgot password?</Text>
                </TouchableOpacity>

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
        </>
    )
}

const styles = StyleSheet.create({
    iconEye: {
        position: "absolute",
        right: 18,
        top: 43,
        color: "#000",
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
