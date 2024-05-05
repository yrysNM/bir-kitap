import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../components/CloudImage"
import { useEffect, useState } from "react"
import { PostAPI, postInfo } from "../api/postApi"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"
import dayjs from "dayjs"

export const PostDetail = () => {
    const { fetchData } = PostAPI("get")
    const { id } = useRoute<RouteProp<RootStackParamList, "PostDetail">>().params
    const [postInfo, setPostInfo] = useState<postInfo>({
        attachments: [],
        title: "",
        content: "",
        club: false,
    })

    useEffect(() => {
        fetchData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                setPostInfo(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    const timeText = (time: number) => {
        if (time < 10) {
            return `0${time}`
        } else {
            return time
        }
    }

    const createTimeText = (createTime?: number) => {
        const hour = dayjs(createTime).get("hour")
        const minnute = dayjs(createTime).get("minute")
        return `${timeText(hour)}:${timeText(minnute)}`
    }

    const _renderItemPostImage = ({ item }: { item: string }) => {
        return (
            <View style={styles.imageWrapper}>
                <CloudImage url={item} styleImg={styles.postImages} />
            </View>
        )
    }
    return (
        <Page>
            <Header isGoBack title="" />
            <View style={styles.postImagesBlock}>
                {postInfo.attachments.length !== 1 ? (
                    <Carousel data={postInfo.attachments} renderItem={_renderItemPostImage} sliderWidth={Dimensions.get("window").width} itemWidth={180} loop activeSlideAlignment={"center"} />
                ) : (
                    <View style={[styles.imageWrapper, { paddingBottom: 10 }]}>
                        <CloudImage url={postInfo.attachments[0]} styleImg={styles.postImages} />
                    </View>
                )}
            </View>
            <View style={styles.postWrapper}>
                {postInfo.title.length && postInfo.content.length ? (
                    <View style={{ justifyContent: "center" }}>
                        <Text style={styles.postTitleText}>{postInfo.title}</Text>
                        <Text style={styles.postDescrText}>{postInfo.content}</Text>
                    </View>
                ) : null}
                <View style={styles.postInfoTimeBlock}>
                    <Text style={styles.timeText}>{dayjs(postInfo.createtime).format("DD MMMM YYYY [y].")}</Text>
                    <Text style={styles.timeText}>{createTimeText(postInfo.createtime)}</Text>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    timeText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    postInfoTimeBlock: {
        position: "absolute",
        bottom: 5,
        right: 12,
        flexDirection: "row",
        gap: 5,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    postDescrText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#212121",
        marginTop: 5,
        marginLeft: 2,
    },
    postTitleText: {
        fontSize: 24,
        fontWeight: "500",
        lineHeight: 32,
        color: "#212121",
        textTransform: "capitalize",
    },
    postWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 30,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    postImagesBlock: {
        paddingBottom: 10,
        marginLeft: -16,
    },
    imageWrapper: {
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    postImages: {
        width: 150,
        height: 200,
        objectFit: "cover",
        borderRadius: 12,
    },
})
