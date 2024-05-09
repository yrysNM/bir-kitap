import { useEffect, useState } from "react"
import { GenreAPI } from "../../api/genreApi"
import { Header } from "../../components/Header"
import { View, Text, StyleSheet } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { useNavigation } from "@react-navigation/native"
import { Page } from "../../layouts/Page"
import { UserAPI } from "../../api/userApi"

export const Genre = () => {
    const navigation = useNavigation()
    const { fetchData: fetchGenreData } = GenreAPI("list")
    const { fetchData: fetchUserAddGenreData } = UserAPI("genre/add")
    const [dataList, setDataList] = useState<{ id: string; title: string }[]>([])
    const [info, setInfo] = useState<{ genres: string[] }>({ genres: [] })

    useEffect(() => {
        fetchGenreData({}).then((res) => {
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

    const onContinue = () => {
        fetchUserAddGenreData({
            genres: info.genres.map((genreId) => dataList.find((genre) => genre.id === genreId)),
        }).then((res) => {
            if (res.result_code === 0) {
                navigation.navigate("Home" as never)
            }
        })
    }

    return (
        <Page>
            <Header isCustomHeader={false} title="What genre do you prefer?" />

            <View style={{ marginTop: 20 }}>
                <Text style={styles.descr}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <View style={styles.genreWrapper}>
                {dataList?.map((item) => (
                    <Button key={item.id} activeStyle={false} style={{ ...styles.genreBtn, backgroundColor: isSelectGenre(item.id) ? "#0A78D6" : "#fff", borderColor: isSelectGenre(item.id) ? "#005479" : "#000" }} onPress={() => onSelectGenre(item.id)}>
                        <Text style={{ ...styles.genreText, color: isSelectGenre(item.id) ? "#fff" : "#212121" }}>{item.title}</Text>
                    </Button>
                ))}
            </View>

            <View style={{ marginTop: 50, width: "100%" }}>
                <Button style={styles.continueBtn} type="primary" onPress={onContinue}>
                    <Text style={styles.continueText}>Continue</Text>
                </Button>
            </View>
        </Page>
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
        paddingHorizontal: 30,
        backgroundColor: "#0A78D6",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 12,
    },
    genreText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "700",
    },
    continueBtn: {
        paddingVertical: 13,
        backgroundColor: "#0A78D6",
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
