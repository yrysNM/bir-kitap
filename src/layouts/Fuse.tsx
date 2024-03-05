import { ReactNode } from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"

export const Fuse = ({ isLoading, error, children }: { isLoading: boolean; error: string | undefined; children: ReactNode }) => {
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
            <View>
                <Text>{error}</Text>
            </View>
        )
    }

    return children;
}


const styles = StyleSheet.create({
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})