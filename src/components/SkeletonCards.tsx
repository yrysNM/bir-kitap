import { StyleSheet, View } from "react-native"
import Skeleton from "./Skeleton"

export const SkeletonHomeNewsCard = () => {
    return (
        <View style={styles.newsBlock}>
            <Skeleton width={50} height={101} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
            <Skeleton width={10} height={20} varient="box" styleProps={{ width: "100%", borderRadius: 8, marginTop: 10 }} />
        </View>
    )
}

export const SkeletonHomeBooksCard = () => {
    return (
        <View style={styles.bookcard}>
            <Skeleton width={1} height={136} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
            <Skeleton width={1} height={20} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
            <Skeleton width={1} height={20} varient="box" styleProps={{ width: "100%", borderRadius: 8, marginTop: 15 }} />
        </View>
    )
}

export const SkeletonCardReviewsCard = () => {
    return (
        <View style={styles.reviewWrapper}>
            <Skeleton width={84} height={120} varient="box" styleProps={{ borderRadius: 8 }} />

            <View style={styles.reviewBookInfo}>
                <Skeleton width={1} height={20} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
                <Skeleton width={1} height={20} varient="box" styleProps={{ width: "100%", borderRadius: 8, marginTop: 15 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bookcard: {
        width: 145,
        flex: 1,
        marginVertical: 3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 10,
        justifyContent: "space-around",
        marginRight: 15,
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
    },

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

    reviewBookInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },

    newsBlock: {
        marginVertical: 2,
        width: 170,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "column",
        gap: 7,
        borderRadius: 16,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
        backgroundColor: "#fff",
    },
})
