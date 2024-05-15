import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native"
import { CloudImage } from "./CloudImage"
import { bookReviewInfo } from "../api/reviewApi"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
import { Icon } from "@ant-design/react-native"
import dayjs from "dayjs"
import { API_URL } from "@env"
import Skeleton from "./Skeleton"
import { useAppSelector } from "../hook/useStore"
import { SplitText } from "../helpers/splitText"
// import { useState } from "react"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReviewDetail">>

type propsInfo = {
    isReviewCard?: boolean
    reviewInfo?: bookReviewInfo
}

export const ReviewCard = ({ reviewInfo, isReviewCard = true }: propsInfo) => {
    const navigation = useNavigation<NavigateType>()
    const {
        userInfo: { id: userId },
    } = useAppSelector((state) => state.mainSlice)
    // const [blackPercentage, setBlackPercentage] = useState<string | null>(null)

    const imageUrl = (url: string) => {
        if (url.indexOf("https") !== -1) {
            return url
        } else {
            return `${API_URL}public/get_resource?name=${url}`
        }
    }

    // const calculateImageBlackPercent = () => {
    //     if (!reviewInfo?.book.imageLink) return
    //     else if (!imageUrl(reviewInfo.book.imageLink)) return
    //     console.log(imageUrl(reviewInfo.book.imageLink))

    //     getPixelRGBA(imageUrl(reviewInfo.book.imageLink), 50, 50)
    //         .then((color: number[]) => {
    //             let blackCount = 0
    //             const totalPixels = color.length / 4

    //             for (let i = 0; i < color.length; i += 4) {
    //                 const intensity = (color[i] + color[i + 1] + color[i + 2]) / 3
    //                 if (intensity < 30) {
    //                     blackCount++
    //                 }
    //             }

    //             const percentage = (blackCount / totalPixels) * 100
    //             setBlackPercentage(percentage.toFixed(2))
    //         })
    //         .catch((err: unknown) => {
    //             console.error("Error getting pixels:", err)
    //         })
    // }

    const ReChildComponent = () => {
        return reviewInfo ? (
            <>
                <ImageBackground style={[styles.bookWrapper, { paddingHorizontal: isReviewCard ? 0 : 20 }]} imageStyle={{ borderRadius: 12, objectFit: "cover" }} source={{ uri: imageUrl(reviewInfo.book.imageLink) }} blurRadius={30} tintColor="#fff">
                    <CloudImage styleImg={styles.bookImage} url={reviewInfo?.book.imageLink || ""} />
                    <View style={styles.bookInfo}>
                        <View>
                            <Text style={styles.bookTitleText}>{reviewInfo?.book.title}</Text>
                            <Text style={styles.bookDescrText}>{reviewInfo?.book.author}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Icon name="star" color="#0A78D6" size={13} style={{ marginTop: 2 }} />
                            <Text style={styles.rateNumberText}>{reviewInfo?.book.rating?.toFixed(2)}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={[styles.headerReview, { justifyContent: "space-between", marginTop: 5 }]}>
                    <View style={styles.headerReview}>
                        <CloudImage url={reviewInfo?.avatar} styleImg={styles.userAvatar} />
                        <Text style={[styles.userNameText, { color: userId === reviewInfo.userId ? "#0A78D6" : "#6D7885" }]}>{reviewInfo?.userName}</Text>
                    </View>
                    <Text style={styles.bookDescrText}>{dayjs(reviewInfo.createtime).format("DD MMMM YYYY [y].")}</Text>
                </View>

                <View style={styles.reviewTitleBlock}>
                    <Text style={styles.reviewTitle}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 10, height: 21 }}>
                            <Icon name="star" color="#0A78D6" size={20} style={{ paddingTop: 2 }} />
                            <Text style={styles.reviewTitle}>{reviewInfo.rating}</Text>
                        </View>
                        <Text>{reviewInfo.message.trim()}</Text>
                    </Text>
                </View>

                <View>
                    <Text style={[styles.bookDescrText, { lineHeight: 20 }]}>{isReviewCard ? SplitText(reviewInfo.book.description || "", 90) : reviewInfo.book.description}</Text>
                </View>
            </>
        ) : (
            <View>
                <View style={{ marginTop: 10 }}>
                    <Skeleton width={1} height={150} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={[styles.headerReview, { justifyContent: "space-between", marginTop: 5 }]}>
                        <View style={styles.headerReview}>
                            <Skeleton width={30} height={30} varient="circle" />
                            <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                        </View>
                        <View>
                            <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                        </View>
                    </View>

                    <View style={styles.reviewTitleBlock}>
                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                        <Skeleton width={100} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Skeleton width={1} height={400} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                </View>
            </View>
        )
    }

    return isReviewCard ? (
        <TouchableOpacity style={[styles.reviewWrapper]} delayPressIn={10} onPress={() => navigation.navigate("ReviewDetail", { id: reviewInfo?.id || "" })}>
            <ReChildComponent />
        </TouchableOpacity>
    ) : (
        <ReChildComponent />
    )
}

const styles = StyleSheet.create({
    reviewTitle: {
        fontSize: 21,
        lineHeight: 25,
        fontWeight: "500",
        color: "#212121",
        display: "flex",
        flexShrink: 1,
    },
    reviewTitleBlock: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 15,
        marginBottom: 10,
    },
    rateNumberText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#212121",
    },
    bookTitleText: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        color: "#212121",
        flexShrink: 1,
        flexWrap: "wrap",
    },
    bookDescrText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    bookInfo: {
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 1,
        gap: 10,
    },
    bookWrapper: {
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        borderRadius: 12,
    },
    bookImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    headerReview: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    userAvatar: {
        width: 30,
        height: 30,
        objectFit: "cover",
        borderRadius: 100,
    },
    userNameText: {
        fontSize: 14,
        lineHeight: 16,
        color: "#6D7885",
    },

    reviewWrapper: {
        width: "100%",
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 9,
        elevation: 1,
        shadowOpacity: 1,
        marginTop: 1,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 19,
    },

    bookReviewImg: {
        width: 84,
        height: 120,
        borderRadius: 9,
        objectFit: "cover",
    },
})
