import { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { genreInfo } from "../api/genreApi"

type propsInfo = {
    onSelect: (genres: string[]) => void
    dataList: genreInfo[]
    selectedGenres: string[]
}

export const SelectGenres = ({ onSelect, dataList, selectedGenres }: propsInfo) => {
    const [genres, setGenres] = useState<string[]>([])

    useEffect(() => {
        if (selectedGenres && selectedGenres.length) {
            setGenres(selectedGenres)
        }
    }, [JSON.stringify(selectedGenres)])

    const onSelectGenre = (genreTitle: string) => {
        if (isSelectGenre(genreTitle)) {
            const filterGenre = genres.filter((item) => item !== genreTitle)
            setGenres(filterGenre)
        } else {
            setGenres([...genres, genreTitle])
        }
    }

    const isSelectGenre = (genreTitle: string) => {
        return genres.includes(genreTitle)
    }

    const onSelectGenres = () => {
        onSelect(genres)
    }

    return (
        <View>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Genres</Text>
            <View style={styles.genreWrapper}>
                {dataList?.map((item) => (
                    <Button key={item.id} activeStyle={false} style={{ ...styles.genreBtn, backgroundColor: isSelectGenre(item.title) ? "#005479" : "#F9FAF8", borderColor: isSelectGenre(item.title) ? "#005479" : "#000" }} onPress={() => onSelectGenre(item.title)}>
                        <Text style={{ ...styles.genreText, color: isSelectGenre(item.title) ? "#F9FAF8" : "#000" }}>{item.title}</Text>
                    </Button>
                ))}
            </View>

            <View style={{ marginTop: 50, width: "100%" }}>
                <Button style={styles.selectBtn} type="primary" onPress={onSelectGenres}>
                    <Text style={styles.selectText}>Select</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    genreWrapper: {
        marginTop: 22,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 13,
    },
    genreBtn: {
        paddingHorizontal: 30,
        backgroundColor: "#F9FAF8",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
    },
    genreText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "700",
    },
    selectBtn: {
        paddingVertical: 13,
        backgroundColor: "#0C1E34",
        borderRadius: 20,
        borderWidth: 0,
    },
    selectText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff",
        textAlign: "center",
    },
})
