import { useEffect, useState } from "react"
import { GenreAPI } from "../api/genreApi"
import { Header } from "../components/Header"
import { View, Text, StyleSheet } from "react-native"

export const Genre = () => {
    const { fetchData } = GenreAPI()
    const [dataList, setDataList] = useState<{ id: string; title: string }[]>()

    useEffect(() => {
        fetchData({}).then((res) => {
            console.log(res);
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

            <View>{dataList?.map((item) => <Text key={item.id}>{item.title}</Text>)}</View>
        </>
    )
}

const styles = StyleSheet.create({
    descr: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "500",
    },
})
