import { ReactNode, useState, useEffect } from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import Modal from "@ant-design/react-native/lib/modal"

export const Fuse = ({ isLoading, error, children }: { isLoading: boolean; error: string | undefined; children: ReactNode }) => {
    const [isErrorModalActive, setIsErrorModalActive] = useState<boolean>(false)

    useEffect(() => {
        if (error && error.length > 0) {
            setIsErrorModalActive(true)
        }
    }, [error])

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#015C84" />
                <Text>Loading</Text>
            </View>
        )
    }

    if (error && error.length > 0) {
        return (
            <Modal animationType="slide" transparent maskClosable visible={isErrorModalActive} onClose={() => setIsErrorModalActive(false)}>
                <View style={styles.error}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </Modal>
        )
    }

    return children
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
    },
    errorText: {
        fontSize: 20,
        fontWeight: "500",
    },
})
