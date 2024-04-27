import Icon from "@ant-design/react-native/lib/icon"
import { useState } from "react"
import { TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import FilterImg from "../../assets/images/filter.png"

type propsInfo = {
    placeholder: string
    onEnterSearch: (e: string) => void
    onClickFilter?: () => void
}

export const SearchInput = ({ onEnterSearch, placeholder, onClickFilter }: propsInfo) => {
    const [search, setSearch] = useState<string>("")

    return (
        <View style={styles.searchWrapper}>
            <TouchableOpacity onPress={() => onEnterSearch(search)}>
                <Icon name="search" style={styles.iconSearch} />
            </TouchableOpacity>
            <TextInput style={styles.inputSearch} value={search} placeholder={placeholder} onChangeText={setSearch} onSubmitEditing={() => onEnterSearch(search)} />
            {onClickFilter && (
                <TouchableOpacity onPress={() => onClickFilter()} style={styles.filterWrapper}>
                    <Image source={FilterImg} style={styles.filterImg} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    searchWrapper: {
        paddingLeft: 16,
        paddingRight: 11,
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: "#FFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 1,
        elevation: 6,
        shadowOpacity: 0.3,
        alignItems: "center",
        flexDirection: "row",
        // position: "relative",
    },
    iconSearch: {
        color: "#000000",
        fontSize: 20,
    },
    inputSearch: {
        paddingLeft: 4,
        flex: 1,
    },
    filterWrapper: {
        borderRadius: 13,
        padding: 10,
        position: "absolute",
        right: 11,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    filterImg: {
        width: 15,
        height: 15,
        objectFit: "contain",
    },
})
