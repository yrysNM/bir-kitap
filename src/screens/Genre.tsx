import { useEffect, useState } from "react"
import { GenreAPI } from "../api/genreApi"
import { Header } from "../components/Header"
import { View, Text, StyleSheet } from "react-native"
import Button from "@ant-design/react-native/lib/button"

export const Genre = () => {
    const { fetchData } = GenreAPI()
    const [dataList, setDataList] = useState<{ id: string; title: string }[]>()

    useEffect(() => {
        fetchData({}).then((res) => {
            if (res?.result_code === 0) {
                setDataList(res.data)
            }
        })
    }, [])

    return (
        <>
            <Header isCustomHeader={false} title="What genre do you prefer?" />

            <View style={{ marginTop: 20 }}>
                <Text style={styles.descr}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <View>
                {dataList?.map((item) => (
                    <Button key={item.id}>
                        <Text>{item.title}</Text>
                    </Button>
                ))}
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
        display: "flex",
        alignItems: "center",
        gap: 13,
    },
})
