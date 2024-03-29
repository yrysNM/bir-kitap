import { Image, View, Text } from "react-native"
import NotReadyImg from "../../assets/images/not-ready.png"
import Button from "@ant-design/react-native/lib/button"
import { useNavigation } from "@react-navigation/native"

export const NotReady = () => {
    const navigation = useNavigation()
    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Image source={NotReadyImg} style={{ width: 300, height: 300, objectFit: "contain" }} />
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Soon...</Text>
            <Button onPress={() => navigation.navigate("Home" as never)} style={{ backgroundColor: "#005479", borderWidth: 0, borderRadius: 10, marginTop: 20, width: 130 }} type="primary">
                Home
            </Button>
        </View>
    )
}
