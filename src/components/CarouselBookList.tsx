import { Dimensions,  Text, StyleSheet, TouchableOpacity } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookInfo } from "../api/bookApi"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
import { CloudImage } from "./CloudImage"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "BookDetail">>

export const CarouselBookList = ({ dataList }: { dataList: bookInfo[] }) => {
    const navigation = useNavigation<NavigateType>()

    const _renderItem = ({ item }: { item: bookInfo }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("BookDetail", { id: item.id as string })}>
                <CloudImage styleImg={styles.bookImg} url={item.imageLink} />
                <Text style={styles.text}>{item.title.length > 15 ? `${item.title.slice(0, 10)}...` : item.title}</Text>
            </TouchableOpacity>
        )
    }

    return <Carousel data={dataList} renderItem={_renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={104} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    card: {
        gap: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        marginLeft: 10,
        width: 84,
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
