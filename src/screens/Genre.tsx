import { useEffect, useState } from "react"
import { GenreAPI } from "../api/genreApi"
import { Header } from "../components/Header"
import { View, Text, StyleSheet } from "react-native"
import Button from "@ant-design/react-native/lib/button"

export const Genre = () => {
    const { fetchData } = GenreAPI()
    const [dataList, setDataList] = useState<{ id: string; title: string }[]>()
    const [info, setInfo] = useState<{ genres: string[] }>({ genres: [] })

    useEffect(() => {
        fetchData({}).then((res) => {
            if (res?.result_code === 0) {
                setDataList(res.data)
            }
        })
    }, [])

    const onSelectGenre = (genreId: string) => {
        if (isSelectGenre(genreId)) {
            const filterGenre = info.genres.filter((item) => item !== genreId)
            setInfo({ genres: filterGenre })
        } else {
            setInfo((info) => ({ genres: [...info.genres, genreId] }))
        }
    }

    const isSelectGenre = (genreId: string) => {
        return info.genres.includes(genreId)
    }

    return (
        <>
            <Header isCustomHeader={false} title="What genre do you prefer?" />

            <View style={{ marginTop: 20 }}>
                <Text style={styles.descr}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <View style={styles.genreWrapper}>
                {dataList?.map((item) => (
                    <Button key={item.id} style={{ ...styles.genreBtn, backgroundColor: isSelectGenre(item.id) ? "#005479" : "#F9FAF8", borderColor: isSelectGenre(item.id) ? "#005479" : "#000" }} onPress={() => onSelectGenre(item.id)}>
                        <Text style={{ ...styles.genreText, color: isSelectGenre(item.id) ? "#F9FAF8" : "#000" }}>{item.title}</Text>
                    </Button>
                ))}
            </View>

            <View style={{ marginTop: 50, width: "100%" }}>
                <Button style={styles.continueBtn} type="primary">
                    <Text style={styles.continueText}>Continue</Text>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    descr: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "500",
    },
    genreWrapper: {
        marginTop: 22,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 13,
    },
    genreBtn: {
        paddingVertical: 16,
        paddingHorizontal: 30,
        backgroundColor: "#F9FAF8",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
    },
    genreText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "700",
    },
    continueBtn: {
        paddingVertical: 13,
        backgroundColor: "#0C1E34",
        borderRadius: 20,
        borderWidth: 0,
    },
    continueText: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff",
        textAlign: "center",
    },
})
