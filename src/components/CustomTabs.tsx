import { View, Text } from "react-native"

type propsInfo = {
    valueList: { value: string; label: string }[]
    onClick: () => void
}

export const CustomTabs = ({ valueList }: propsInfo) => {
    return (
        <View>
            {valueList.map((item, i) => (
                <View key={i}>
                    <Text>{item.label}</Text>
                </View>
            ))}
        </View>
    )
}
