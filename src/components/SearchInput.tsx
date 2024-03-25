import Icon from "@ant-design/react-native/lib/icon"
import { useState } from "react"
import { TextInput, View, StyleSheet } from "react-native"

type propsInfo = {
    placeholder: string
    onChangeSearch: (e: string) => void
}

export const SearchInput = ({ onChangeSearch, placeholder }: propsInfo) => {
    const [search, setSearch] = useState<string>("")

    const onhandleSearch = (e: string) => {
        onChangeSearch(e)
        setSearch(e)
    }

    return (
        <View style={styles.searchWrapper}>
            <Icon name="search" style={styles.iconSearch} />
            <TextInput style={styles.inputSearch} value={search} placeholder={placeholder} onChange={(e) => onhandleSearch(e.currentTarget.toString())} />
            <Icon name="filter" style={styles.filterWrapper} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchWrapper: {
        paddingLeft: 16,
        paddingRight: 11,
        paddingVertical: 15,
        borderRadius: 19,
        backgroundColor: "#F2F2EE",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
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
        color: "#ffff",
    },
})
