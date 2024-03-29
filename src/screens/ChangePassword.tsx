import { Alert, StyleSheet, Text } from "react-native"
import { Page } from "../layouts/Page"
import Button from "@ant-design/react-native/lib/button"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import Icon from "@ant-design/react-native/lib/icon"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

const ChangePassword = () => {
    const [isVisiblePassword, setIsVisiblePassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    })
    const [info, setInfo] = useState({
        password: "",
        newpassword: "",
        confirmpassword: "",
    })

    const navigate = useNavigation()

    const handleSave = () => {
        if (info.newpassword !== info.password) {
            Alert.alert("Ошибка", "Новый пароль должен отличаться от текущего.")
            return
        }

        if (info.newpassword !== info.confirmpassword) {
            Alert.alert("Ошибка", "Новый пароль и подтверждение пароля должны совпадать.")
            return
        }

        if (info.confirmpassword === "" || info.password === "" || info.newpassword === "") {
            Alert.alert("Ошибка", "Все обязательно полей")
        } else {
            navigate.navigate("Home" as never)
        }
    }

    return (
        <Page>
            <InputStyle inputTitle={"Current Password"}>
                <InputItem type={!isVisiblePassword ? "password" : "text"} style={style.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />
                <Icon onPress={() => setIsVisiblePassword((prevState) => ({ ...prevState, currentPassword: !prevState.currentPassword }))} name={isVisiblePassword.currentPassword ? "eye" : "eye-invisible"} style={style.iconEye} />
            </InputStyle>

            <InputStyle inputTitle={"New Password"}>
                <InputItem type={!isVisiblePassword ? "password" : "text"} style={style.input} value={info.newpassword} onChange={(value) => setInfo((info) => ({ ...info, newpassword: value }))} placeholder={"******"} />
                <Icon onPress={() => setIsVisiblePassword((prevState) => ({ ...prevState, newPassword: !prevState.newPassword }))} name={isVisiblePassword.newPassword ? "eye" : "eye-invisible"} style={style.iconEye} />
            </InputStyle>

            <InputStyle inputTitle={"Confirm New Password"}>
                <InputItem type={!isVisiblePassword ? "password" : "text"} style={style.input} value={info.confirmpassword} onChange={(value) => setInfo((info) => ({ ...info, confirmpassword: value }))} placeholder={"******"} />
                <Icon onPress={() => setIsVisiblePassword((prevState) => ({ ...prevState, confirmNewPassword: !prevState.confirmNewPassword }))} name={isVisiblePassword.confirmNewPassword ? "eye" : "eye-invisible"} style={style.iconEye} />
                <Text style={style.inputExtensionText}>Use at least 8 characters</Text>
            </InputStyle>
            <Button style={style.footerBtn} onPress={handleSave}>
                <Text style={style.footerBtnText}>Save</Text>
            </Button>
        </Page>
    )
}

const style = StyleSheet.create({
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

    inputExtensionText: {
        marginLeft: 5,
        fontWeight: "600",
        fontSize: 13,
    },

    iconEye: {
        position: "absolute",
        right: 18,
        top: 43,
        color: "#000",
    },
})

export default ChangePassword
