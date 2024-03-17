import { ReactNode } from "react"
import { Text, View, StyleSheet } from "react-native"

export const InputStyle = ({ inputTitle, children }: { inputTitle: string; children: ReactNode }) => {
    return (
        <View style={styles.inputBlock}>
            <Text style={styles.inputTitle}>{inputTitle}</Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputBlock: {
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-start",
        marginBottom: 11
    },
    inputTitle: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: 5,
    },
})
