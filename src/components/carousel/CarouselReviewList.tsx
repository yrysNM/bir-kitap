import { View, TouchableOpacity, Dimensions, Text, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { bookReviewInfo } from "../../api/reviewApi"
import { CloudImage } from "../CloudImage"
import { StarRate } from "../StarRate"
import { useAppSelector } from "../../hook/useStore"
import { SkeletonCardReviewsCard } from "../SkeletonCards"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { SplitText } from "../../helpers/splitText"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReviewDetail">>

export const CarouselReviewList = ({ dataList }: { dataList: bookReviewInfo[] }) => {
    const {
        userInfo: { id: userId },
        isLoading,
    } = useAppSelector((state) => state.mainSlice)
    const navigation = useNavigation<NavigateType>()

    const _renderReviewItem = ({ item }: { item: bookReviewInfo }) => {
        return isLoading ? (
            <SkeletonCardReviewsCard />
        ) : (
            <TouchableOpacity delayPressIn={10} onPress={() => navigation.navigate("ReviewDetail", { id: item.id || "" })} style={styles.reviewWrapper}>
                <CloudImage url={item?.book?.imageLink} styleImg={styles.bookReviewImg} />
                <View style={styles.reviewBookInfo}>
                    <View style={styles.reviewUserInfo}>
                        <CloudImage styleImg={styles.reviewUserProfileImg} url={item.avatar || ""} />
                        <View style={{ flexShrink: 1 }}>
                            <Text style={[styles.reviewUserName, { color: item.userId === userId ? "#0A78D6" : "#212121" }]}>{item.userName}</Text>
                            <Text style={styles.reviewUserNic}>{SplitText(item.book.title, 14)}</Text>
                        </View>
                    </View>
                    <StarRate rateNumber={item.rating} />
                    <Text style={styles.reviewBookMessage}>{SplitText(item.message, 85)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return <Carousel data={dataList} renderItem={_renderReviewItem} sliderWidth={Dimensions.get("window").width} itemWidth={275} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    reviewWrapper: {
        marginRight: 15,
        backgroundColor: "#fff",
        width: 265,
        marginHorizontal: 3,
        borderRadius: 15,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
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

    avatar: {
        width: 30,
        height: 30,
        objectFit: "cover",
    },

    reviewBookInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    reviewBookMessage: {
        fontSize: 10,
        fontWeight: "600",
        lineHeight: 16,
    },

    reviewUserInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },

    reviewUserProfileImg: {
        width: 31,
        height: 31,
        borderRadius: 500,
        marginTop: -3,
    },

    reviewUserName: {
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 17,
        color: "#212121",
    },

    reviewUserNic: {
        fontSize: 10,
        fontWeight: "600",
        lineHeight: 13,
        color: "#6D7885",
    },
})
