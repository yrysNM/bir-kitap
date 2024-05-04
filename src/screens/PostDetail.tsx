import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../components/CloudImage"

export const PostDetail = () => {
    const attachements = ["https://cdn.pixabay.com/photo/2022/12/01/04/35/sunset-7628294_640.jpg", "https://img.freepik.com/free-photo/beautiful-anime-character-cartoon-scene_23-2151035157.jpg"]

    const _renderItemPostImage = ({ item }: { item: string }) => {
        return (
            <View>
                <CloudImage url={item} styleImg={styles.postImages} />
            </View>
        )
    }
    return (
        <Page>
            <Header isGoBack title="" />
            <View style={styles.postWrapper}>{attachements.length !== 1 ? <Carousel dataList={attachements} renderItem={_renderItemPostImage} sliderWidth={Dimensions.get("window").width} itemWidth={170} layout={"default"} currentIndex={1} loop /> : <Text>Test</Text>}</View>
            <View>
                <Text>Test book</Text>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    postImages: {
        width: 150,
        height: 150,
        objectFit: "cover",
        borderRadius: 12,
    },
})
