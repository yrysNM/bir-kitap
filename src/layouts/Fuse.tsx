import { ReactNode, useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import Modal from "@ant-design/react-native/lib/modal"
import { useAppSelector } from "../hook/useStore"
import { Loading } from "../components/Loading"

export const Fuse = ({ children }: { children: ReactNode }) => {
    const [isErrorModalActive, setIsErrorModalActive] = useState<boolean>(false)
    const { error, isLoading } = useAppSelector((state) => state.mainSlice)

    useEffect(() => {
        if (error && Object.keys(error).length > 0) {
            setIsErrorModalActive(true)
        }
    }, [error])
    return (
        <>
            {isLoading && (
               <Loading />
            )}
            {children}
            <Modal animationType="slide" transparent maskClosable visible={isErrorModalActive} onClose={() => setIsErrorModalActive(false)}>
                <View style={styles.error}>
                    <Text style={styles.errorText}>{error?.message}</Text>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        flex: 1,
        zIndex: 100,
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
