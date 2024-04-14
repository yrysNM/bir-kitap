import { Dimensions, Text, StyleSheet, TouchableOpacity, View } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookInfo } from "../api/bookApi"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
import { CloudImage } from "./CloudImage"
import { SplitText } from "../helpers/splitText"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "BookDetail">>

export const CarouselBookList = ({ dataList }: { dataList: bookInfo[] }) => {
    const navigation = useNavigation<NavigateType>()

    const _renderItem = ({ item }: { item: bookInfo }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("BookDetail", { id: item.id as string })} delayPressIn={5}>
                <CloudImage styleImg={styles.bookImg} url={item.imageLink} />
                <View>
                    <Text style={styles.text}>{SplitText(item.title, 20)}</Text>
                    <View style={styles.textInfo}>
                        <Text style={styles.descr}>{SplitText(item.author, 15)}</Text>
                        <Text style={styles.descr}>{item.year}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return <Carousel data={dataList} renderItem={_renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={160} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    card: {
        width: 145,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        justifyContent: "space-around",
        marginRight: 15,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 16,
        shadowOpacity: 0.3,
    },
    bookImg: {
        width: "100%",
        height: 136,
        objectFit: "contain",
    },
    textInfo: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 18,
    },
    descr: {
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
})
