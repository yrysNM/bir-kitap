import { Dimensions, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookInfo } from "../api/bookApi"
import { API_URL } from "@env"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "BookDetail">>

export const CarouselBookList = ({ dataList }: { dataList: bookInfo[] }) => {
    const navigation = useNavigation<NavigateType>()
    const itemWidth = () => {
        if (dataList.length <= 4) {
            return Dimensions.get("window").width / (dataList.length - 0.5)
        }

        return Dimensions.get("window").width / 3.5
    }

    const _renderItem = ({ item }: { item: bookInfo }) => {
        const imageUrl = `${API_URL}/public/get_resource?name=${item.imageLink}`
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("BookDetail", { bookId: item.id as string })}>
                <Image style={styles.bookImg} source={{ uri: imageUrl }} />
                <Text style={styles.text}>{item.title.length > 15 ? `${item.title.slice(0, 10)}...` : item.title}</Text>
            </TouchableOpacity>
        )
    }

    return <Carousel data={dataList} renderItem={_renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={itemWidth()} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        gap: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        // width: 84,
    },
    bookImg: {
        width: "100%",
        height: 136,
        borderRadius: 9,
        objectFit: "cover",
        borderWidth: 0.1,
        // borderStyle: "solid",
        borderColor: "#000",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 18,
    },
})
