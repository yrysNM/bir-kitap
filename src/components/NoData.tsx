import { Image, View, StyleSheet, Text } from "react-native"
import NoDataImg from "../../assets/images/no-data.png"

export const NoData = () => {
    return (
        <View style={styles.noData}>
            <Image style={{width: 100, height: 82}} source={NoDataImg} />

            <Text style={{ textAlign: "center" }}>No Data</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noData: {
        justifyContent: "center",
        alignItems: "center",
    },
})
