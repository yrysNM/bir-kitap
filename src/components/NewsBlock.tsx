import React, { FC } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ReadersNotif from "../../assets/images/readaerNotif.png"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { newsInfo } from "../api/newsApi"
import { CloudImage } from "./CloudImage"
import { timestampToDate } from "../helpers/timestampToDate"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RootStackParamList } from "../navigation/MainNavigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface IProps {
    readerData: newsInfo[]
}

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReaderNews">>

const NewsBlock: FC<IProps> = ({ readerData }) => {
    const navigation = useNavigation<NavigateType>()

    return (
        <>
            {readerData &&
                readerData.map((item) => (
                    <TouchableOpacity onPress={() => navigation.navigate("ReaderNews", { id: item.id || "" })} key={item.id}>
                        <View style={styles.readerbook}>
                            <CloudImage url={item.imageLink} styleImg={styles.image} />
                            <View style={styles.readerContent}>
                                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                    <Image source={ReadersNotif} alt="ReadersNotif" resizeMode="contain" style={{ width: 15, height: 15 }} />

                                    <View style={styles.readerTitle}>
                                        <View style={styles.readerTitleBlock}>
                                            <Text style={{ color: "white", fontSize: 8 }}>{item.title}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.readerText}>
                                        {item.content} 
                                    </Text>
                                    <Text style={styles.readerText}>
                                        for more infromation write email <Text style={styles.readeremail}>ayalanayashova1@mail.ru</Text>
                                    </Text>
                                </View>

                                <Text style={styles.readerTime}>{timestampToDate(item.createtime)}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
        </>
    )
}

const styles = StyleSheet.create({
    readerbook: {
        backgroundColor: "#fff",
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 9.5,
        marginBottom: 16,

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },

    image: {
        width: "100%",
        marginBottom: 14,
        height: 200,
        borderRadius: 12,
    },

    readerContent: {
        width: "100%",
        position: "relative",
    },

    readerTitle: {
        flexDirection: "row",
    },

    readerTitleBlock: {
        backgroundColor: "#0A78D6",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    readerText: {
        fontSize: 8,
        fontWeight: "600",
        marginTop: 7,
        marginBottom: 10,
    },

    readeremail: {
        color: "#60B4D9",
    },

    readerTime: {
        fontSize: 8,
        color: "#7A7878",
    },
})

export default NewsBlock
