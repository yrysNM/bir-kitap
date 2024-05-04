import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../components/CloudImage"
import { useEffect, useState } from "react"
import { PostAPI, postInfo } from "../api/postApi"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"

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
            <View style={styles.postWrapper}>
                <View style={styles.postImagesBlock}>
                    {postInfo.attachments.length !== 1 ? (
                        <Carousel data={postInfo.attachments} renderItem={_renderItemPostImage} sliderWidth={Dimensions.get("window").width} itemWidth={180} loop activeSlideAlignment={"center"} />
                    ) : (
                        <View style={[styles.imageWrapper, { paddingBottom: 10 }]}>
                            <CloudImage url={postInfo.attachments[0]} styleImg={styles.postImages} />
                        </View>
                    )}
                </View>
                {postInfo.title.length && postInfo.content.length && (
                    <View style={{ justifyContent: "center", alignItems: "flex-end", width: 150 }}>
                        <View style={styles.postInfoTitleBlock}>
                            <Text style={styles.postTitleText}>{postInfo.title}</Text>
                        </View>
                        <Text style={styles.postDescrText}>{postInfo.content}</Text>
                    </View>
                )}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    postDescrText: {
        fontSize: 16,
        lineHeight: 24,
        color: "",
        marginTop: 10,
    },
    postInfoTitleBlock: {
        backgroundColor: "#0A78D6",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
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
