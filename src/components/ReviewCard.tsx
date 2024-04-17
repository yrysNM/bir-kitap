import { View, StyleSheet, Text, Image } from "react-native"
import { CloudImage } from "./CloudImage"
import { StarRate } from "./StarRate"
import UserCustomProfileImg from "../../assets/images/custom-user-profile.jpg"
import { bookReviewInfo } from "../api/reviewApi"

export const ReviewCard = ({ reviewInfo }: { reviewInfo: bookReviewInfo }) => {
    return (
        <View style={styles.reviewWrapper}>
            <CloudImage url={reviewInfo?.book?.imageLink} styleImg={styles.bookReviewImg} />
            <View style={styles.reviewBookInfo}>
                <View style={styles.reviewUserInfo}>
                    <Image style={styles.reviewUserProfileImg} source={UserCustomProfileImg} />
                    <View style={{ flexShrink: 1 }}>
                        <Text style={styles.reviewUserName}>{reviewInfo.userName}</Text>
                        <View style={styles.starBlock}>
                            <StarRate rateNumber={reviewInfo.rating} />
                            <Text style={{ fontSize: 9, fontWeight: "600", color: "#7A7878" }}>{reviewInfo.rating.toFixed(0)}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.reviewBookMessage}>{reviewInfo.message}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewWrapper: {
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        marginTop: 1,
        marginHorizontal: 5,
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

    starBlock: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
})
