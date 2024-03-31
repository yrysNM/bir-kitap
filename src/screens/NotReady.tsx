import { Image, View, Text, StyleSheet } from "react-native"
import NotReadyImg from "../../assets/images/not-ready.png"
import Button from "@ant-design/react-native/lib/button"
import { useNavigation } from "@react-navigation/native"
import { logOut as logOutHelper } from "../helpers/logOut"

export const NotReady = () => {
    const navigation = useNavigation()
    const logOut = logOutHelper()

    return (
        <View style={styles.notReadyWrapper}>
            <Image source={NotReadyImg} style={styles.notReadyImg} />
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Soon...</Text>
            <View style={styles.notReadyBtnWrapper}>
                <Button onPress={() => navigation.navigate("Home" as never)} style={styles.btn} type="primary">
                    Home
                </Button>
                <Button
                    onPress={() => {
                        logOut()
                    }}
                    style={styles.btn}
                    type="primary">
                    Logout
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notReadyWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    notReadyImg: {
        width: 300,
        height: 300,
        objectFit: "contain",
    },
    notReadyBtnWrapper: {
        alignItems: "center",
        gap: 20,
        flexDirection: "row",
    },
    btn: {
        backgroundColor: "#005479",
        borderWidth: 0,
        borderRadius: 10,
        marginTop: 20,
        width: 130,
    },
})
