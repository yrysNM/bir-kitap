import { ReactNode } from "react"
import Icon from "@ant-design/react-native/lib/icon"
import { View, Text } from "react-native"

export const Fuse = ({ isLoading, error, children }: { isLoading: boolean; error: string | undefined; children: ReactNode }) => {
    if (isLoading) {
        return (
            <View>
                <Icon name="loading" size="md" />
                <Text>вфвфывфыв</Text>
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
