import { Header } from "../components/Header"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import InputItem from "@ant-design/react-native/lib/input-item"
import DatePicker from "@ant-design/react-native/lib/date-picker"
import Button from "@ant-design/react-native/lib/button"
import Icon from "@ant-design/react-native/lib/icon"
import Modal from "@ant-design/react-native/lib/modal"
import { useState } from "react"
import { InputStyle } from "../components/InputStyle"
import List from "@ant-design/react-native/lib/list"
import { IconNames } from "@ant-design/react-native/es/icon"
import { RegistrationAPI } from "../api/authApi"
import { IUserInfo } from "../api/authApi"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Page } from "../layouts/Page"
import { setHasLogin } from "../redux/features/mainSlice"
import { useAppDispatch } from "../hook/useStore"
import MaskInput from "react-native-mask-input"

export const CreateAccount = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const [genderList] = useState<{ label: string; value: string; icon: IconNames }[]>([
        { label: "Female", value: "female", icon: "woman" },
        { label: "Male", value: "male", icon: "man" },
    ])
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
    const [isSelectGender, setIsSelectGender] = useState<boolean>(false)
    const [dateBirth, setDateBirth] = useState<Date | undefined>(undefined)
    const [info, setInfo] = useState<IUserInfo>({
        birth: new Date(),
        email: "",
        fullName: "",
        password: "",
        phone: "",
        gender: "",
    })
    const { fetchData } = RegistrationAPI()

    const onSubmit = async () => {
        if (isNotEmpty()) {
            await fetchData({ ...info, birth: new Date(info.birth).getTime() }).then((res) => {
                if (res.result_code === 0) {
                    AsyncStorage.setItem(
                        "token",
                        JSON.stringify({
                            token: res.data.token,
                            refresh_token: res.data.refreshToken,
                            tokenExpireToken: res.data.tokenExpireToken,
                        }),
                    ).then(() => {
                        dispatch(setHasLogin(true))
                        navigation.navigate("Genre" as never)
                    })
                }
            })
        } else {
            console.log("not validated")
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
                    <InputItem type="email-address" style={styles.input} value={info.email} onChange={(value) => setInfo((info) => ({ ...info, email: value }))} placeholder={"example@gmail.com"} />
                </InputStyle>
                <InputStyle inputTitle={"Nickname"}>
                    <InputItem type="text" style={styles.input} value={info.fullName} onChange={(value) => setInfo((info) => ({ ...info, fullName: value }))} placeholder={"Jack Jones"} />
                </InputStyle>
                <InputStyle inputTitle={"Number phone"}>
                    <Text style={{ position: "absolute", top: 46, left: 10 }}>+7</Text>
                    <MaskInput
                        value={info.phone}
                        onChangeText={(value) => setInfo({ ...info, phone: value })}
                        placeholder="(777) 777-77-77"
                        keyboardType="numeric"
                        mask={["(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]}
                        style={{ ...styles.input, marginLeft: 0, paddingLeft: 30 }}
                    />
                </InputStyle>
                <InputStyle inputTitle={"Password"}>
                    <InputItem type={!isVisiblePassword ? "password" : "text"} style={styles.input} value={info.password} onChange={(value) => setInfo((info) => ({ ...info, password: value }))} placeholder={"******"} />
                    {isVisiblePassword ? <Icon onPress={() => setIsVisiblePassword(false)} name={"eye"} style={styles.iconEye} /> : <Icon onPress={() => setIsVisiblePassword(true)} name={"eye-invisible"} style={styles.iconEye} />}
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

                <View style={styles.footerInfo}>
                    <Button style={styles.footerBtn} onPress={() => onSubmit()}>
                        <Text style={styles.footerBtnText}>Sign up</Text>
                    </Button>

                    <View style={styles.orText}>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                        <Text>or</Text>
                        <View style={{ flex: 1, height: 1, width: "100%", backgroundColor: "#7a7878" }}></View>
                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 3 }}>
                        <Text style={styles.logText}>Already have an account?</Text>
                        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate("Login" as never)}>
                            <Text style={styles.logText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    iconEye: {
        position: "absolute",
        right: 18,
        top: 43,
        color: "#000",
    },
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
        marginTop: 5,
        marginBottom: 20,
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
