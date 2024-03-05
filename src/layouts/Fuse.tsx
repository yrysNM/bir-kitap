import { ReactNode, useMemo, useState } from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import Modal from "@ant-design/react-native/lib/modal"

export const Fuse = ({ isLoading, error, children }: { isLoading: boolean; error: string | undefined; children: ReactNode }) => {
    const [isErrorModalActive, setIsErrorModalActive] = useState<boolean>(false)

    useMemo(() => {
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
                <View>
                    <Text>{error}</Text>
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
})
