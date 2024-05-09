import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { PostAPI, postInfo } from "../api/postApi"
import { CloudImage } from "./CloudImage"
import Skeleton from "./Skeleton"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"
import EditImg from "../../assets/images/edit.png"
import TrashImg from "../../assets/images/trash.png"
import Modal from "@ant-design/react-native/lib/modal"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { useState } from "react"
import { Loading } from "./Loading"
import { setRefresh } from "../redux/features/mainSlice"
import { RootTabbarStackParamList } from "../navigation/TabBarNavigator"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootTabbarStackParamList, "Create">, NativeStackNavigationProp<RootStackParamList, "PostDetail">>

type propsInfo = {
    postInfo: postInfo
    isUpdatePost?: boolean
}

export const PostCard = ({ postInfo, isUpdatePost = false }: propsInfo) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigateType>()
    const { fetchData: fetchDeletePostData } = PostAPI("delete")
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false)
    const { isLoading } = useAppSelector((state) => state.mainSlice)

    const onDeletePost = () => {
        dispatch(setRefresh(true))
        fetchDeletePostData({
            id: postInfo.id,
        }).then((res) => {
            if (res.result_code === 0) {
                setShowWarningModal(false)
                dispatch(setRefresh(false))
            }
        })
    }

    const openUpdatePost = () => {
        navigation.navigate("UpdatePost", { id: postInfo.id || "" })
    }

    return postInfo ? (
        <>
            <TouchableOpacity style={styles.postBlock} onPress={() => navigation.navigate("PostDetail", { id: postInfo.id || "" })} delayPressIn={10}>
                <CloudImage url={postInfo.attachments[0]} styleImg={styles.image} />
                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                    <View style={styles.readerTitle}>
                        <View style={styles.readerTitleBlock}>
                            <Text style={{ color: "#fff", fontSize: 16, lineHeight: 20 }}>{postInfo.title || "-"}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.readerText}>{postInfo.content || "-"}</Text>
                </View>
                {isUpdatePost && (
                    <View style={styles.updateDeletePost}>
                        <TouchableOpacity style={styles.iconWrapper} onPress={() => openUpdatePost()}>
                            <Image style={styles.clubEditIcon} source={EditImg} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconWrapper} onPress={() => setShowWarningModal(true)}>
                            <Image style={styles.clubEditIcon} source={TrashImg} tintColor="#ed1834" />
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
            <Modal animationType="fade" transparent={false} visible={showWarningModal} onClose={() => setShowWarningModal(false)} maskClosable style={styles.modalWrapperWarning}>
                <View>
                    <Text style={styles.tileWarningText}>Are you sure delete post ?</Text>
                </View>
                <View style={styles.warningBtns}>
                    <Text style={[styles.btnText, styles.cancelText]} onPress={() => setShowWarningModal(false)}>
                        No
                    </Text>
                    <Text style={[styles.btnText, { color: "#ed1834", fontWeight: "500" }]} onPress={() => onDeletePost()}>
                        Yes
                    </Text>
                </View>
                {isLoading && <Loading />}
            </Modal>
        </>
    ) : (
        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 20 }}>
            <Skeleton width={1} height={250} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    cancelText: {
        borderRightWidth: 1,
        borderStyle: "solid",
        borderColor: "#0000001f",
        fontWeight: "700",
        color: "#0A78D6",
    },
    warningBtns: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderStyle: "solid",
        borderTopColor: "#0000001f",
    },
    btnText: {
        flex: 1,
        justifyContent: "center",
        paddingVertical: 16,
        textAlign: "center",
    },
    tileWarningText: {
        paddingHorizontal: 16,
        color: "#212121",
        fontSize: 17,
        lineHeight: 18,
        fontWeight: "700",
    },
    modalWrapperWarning: {
        width: "90%",
        paddingTop: 32,
        marginHorizontal: 32,
        borderRadius: 12,
        backgroundColor: "#fff",
        position: "absolute",
        left: -10,
        bottom: -Dimensions.get("window").height / 2,
        zIndex: -1,
    },
    clubEditIcon: {
        width: 15,
        height: 15,
        objectFit: "cover",
    },
    iconWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowRadius: 100,
        elevation: 10,
        shadowOpacity: 1,
    },
    updateDeletePost: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    postBlock: {
        backgroundColor: "#fff",
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 9.5,
        marginBottom: 16,

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    image: {
        width: "100%",
        marginBottom: 14,
        height: 200,
        borderRadius: 12,
    },
    readerContent: {
        width: "100%",
        position: "relative",
    },

    readerTitle: {
        flexDirection: "row",
    },

    readerTitleBlock: {
        backgroundColor: "#0A78D6",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    readerText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "600",
        color: "#6D7885",
        marginTop: 7,
        marginBottom: 10,
        marginLeft: 5,
    },
})
