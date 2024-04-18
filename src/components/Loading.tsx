import { View, ActivityIndicator, StyleSheet } from "react-native"

export const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={40} color="#0A78D6" />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
    },
})
