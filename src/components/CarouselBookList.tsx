import { View, Dimensions, Image, Text, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookInfo } from "../api/bookApi"

export const CarouselBookList = ({ dataList }: { dataList: bookInfo[] }) => {
    const itemWidth = () => {
        if (dataList.length <= 4) {
            return Dimensions.get("window").width / (dataList.length - 0.5)
        }

        return Dimensions.get("window").width / 3.5
    }

    const _renderItem = ({ item }: { item: bookInfo }) => {
        return (
            <View style={styles.card}>
                <Image style={styles.bookImg} source={{ uri: item.imageLink }} />
                <Text style={styles.text}>{item.title}</Text>
            </View>
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
        paddingHorizontal: 20,
    },
    bookImg: {
        width: "100%",
        height: 136,
        borderRadius: 9,
        objectFit: "cover",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 14,
    },
})
