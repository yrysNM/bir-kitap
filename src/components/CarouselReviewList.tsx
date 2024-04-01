import { View, Dimensions, Image, Text, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookReviewInfo } from "../api/reviewApi"
import { CloudImage } from "./CloudImage"
import { StarRate } from "./StarRate"
import UserCustomProfileImg from "../../assets/images/custom-user-profile.jpg"

export const _renderReviewItem = ({ item }: { item: bookReviewInfo }) => {
    return (
        <View style={styles.reviewWrapper}>
            <CloudImage url={item?.book?.imageLink} styleImg={styles.bookReviewImg} />
            <View style={styles.reviewBookInfo}>
                <View style={styles.reviewUserInfo}>
                    <Image style={styles.reviewUserProfileImg} source={UserCustomProfileImg} />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.reviewUserName}>{item.userName}</Text>
                        <Text style={styles.reviewUserNic}>Book Lover</Text>
                    </View>
                </View>
                <StarRate rateNumber={item.rating} />
                <Text style={styles.reviewBookMessage}>{item.message}</Text>
            </View>
        </View>
    )
}

export const CarouselREviewList = ({ dataList }: { dataList: bookReviewInfo[] }) => {
    return <Carousel data={dataList} renderItem={_renderReviewItem} sliderWidth={Dimensions.get("window").width} itemWidth={275} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    reviewWrapper: {
        marginRight: 17,
        backgroundColor: "#f9faf8",
        // width: 254,
        flex: 1,
        // height: 171,
        borderRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 7,
        shadowRadius: 4,
        shadowOpacity: 1,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 19,
        flexDirection: "row",
        gap: 14,
        alignItems: "flex-start",
    },

    bookReviewImg: {
        width: 84,
        height: 120,
        borderRadius: 9,
        objectFit: "cover",
    },

    reviewBookInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    reviewBookMessage: {
        fontSize: 7,
        fontWeight: "600",
        lineHeight: 10,
    },

    reviewUserInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    reviewUserProfileImg: {
        width: 31,
        height: 31,
        borderRadius: 500,
    },

    reviewUserName: {
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 15,
        color: "#000000",
    },

    reviewUserNic: {
        fontSize: 8,
        fontWeight: "600",
        lineHeight: 10,
        color: "#7A7878",
    },
})
