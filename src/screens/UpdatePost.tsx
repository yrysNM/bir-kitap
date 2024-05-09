import InputItem from "@ant-design/react-native/lib/input-item"
import Icon from "@ant-design/react-native/lib/icon"
import TextareaItem from "@ant-design/react-native/lib/textarea-item"
import Button from "@ant-design/react-native/lib/button"
import Switch from "@ant-design/react-native/lib/switch"
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native"
import Modal from "@ant-design/react-native/lib/modal"
import Carousel from "@ant-design/react-native/lib/carousel"
import { CloudImage } from "../components/CloudImage"
import { InputStyle } from "../components/InputStyle"
import { useEffect, useState } from "react"
import { PostAPI, postInfo } from "../api/postApi"
import Toast from "@ant-design/react-native/lib/toast"
import { base64toFiile } from "../helpers/base64toFile"
import { setLoading } from "../redux/features/mainSlice"
import * as ImagePicker from "expo-image-picker"
import { useAppDispatch } from "../hook/useStore"
import { BookApi } from "../api/bookApi"
import { API_URL } from "@env"
import { Header } from "../components/Header"
import { Page } from "../layouts/Page"
import { clubInfo, ClubAPI } from "../api/clubApi"
import { ClubCard } from "../components/ClubCard"
import { NoData } from "../components/NoData"
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"
import { RootStackParamList } from "../navigation/MainNavigation"

const _postInfo = {
    title: "",
    attachments: [],
    content: "",
    isClub: false,
    clubId: "",
}

export const UpdatePost = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const [postInfo, setPostInfo] = useState<postInfo>(_postInfo)
    const [images, setImages] = useState<string[]>([])
    const [clubList, setClubList] = useState<clubInfo[]>([])
    const [showModalClub, setShowModalClub] = useState<boolean>(false)
    const { id } = useRoute<RouteProp<RootStackParamList, "UpdatePost">>().params
    const { fetchData: fetchGetPostData } = PostAPI("get")
    const { fetchData: fetchUpdatePostData } = PostAPI("update")

    const { fetchData: fetchUploadBookImgData } = BookApi("upload")
    const { fetchData: fetchMyClubData } = ClubAPI("my/list")

    useEffect(() => {
        fetchGetPostData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                const postInfo: postInfo = JSON.parse(JSON.stringify(res.data))
                setPostInfo(postInfo)
                setImages(postInfo.attachments)
            }
        })
    }, [])

    const onChangeSwitchClub = async (e: boolean) => {
        if (e) {
            await fetchMyClubData({}).then((res) => {
                if (res.result_code === 0) {
                    setClubList(res.data)
                }
            })
        }

        setShowModalClub(e)
        setPostInfo({ ...postInfo, isClub: e })
    }

    const handleFileUpload = async () => {
        dispatch(setLoading(true))
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: 1,
            base64: true,
        })

        if (!response.canceled && response.assets) {
            const uriList = response.assets[0].uri.split("/")
            const file = base64toFiile(`data:image/jpeg;base64,${response.assets[0].base64}`, uriList[uriList.length - 1])
            const isLt5M: boolean = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                console.log("The file size must be less than 5 MB.")
                Toast.fail("The file size must be less than 5 MB.")
                dispatch(setLoading(false))

                return
            }

            const param = new FormData()
            param.append("file", {
                uri: uriList.join("/"),
                type: "image/jpeg",
                name: uriList.pop(),
            } as never)

            fetchUploadBookImgData(param, { "Content-Type": "multipart/form-data" } as never).then((res) => {
                dispatch(setLoading(false))

                if (res.result_code === 0) {
                    const info: { path: string } = JSON.parse(JSON.stringify(res.data))
                    const urlImage = `${API_URL}public/get_resource?name=${info.path}`
                    setImages([...images, urlImage])
                    setPostInfo({ ...postInfo, attachments: [...postInfo.attachments, info.path] })
                }
            })
        } else {
            dispatch(setLoading(false))
        }
    }

    const handleRemoveImg = (indexImage: number) => {
        setPostInfo({ ...postInfo, attachments: postInfo.attachments.filter((_, index) => index !== indexImage) })
        setImages(images.filter((_, index) => index !== indexImage))
    }

    const onSelectClub = (clubId: string) => {
        if (postInfo.clubId === clubId) {
            setPostInfo({ ...postInfo, clubId: "" })
        } else {
            setPostInfo({ ...postInfo, clubId })
        }
    }

    const onUpdateBtn = () => {
        fetchUpdatePostData({
            id,
            ...postInfo,
        }).then((res) => {
            if (res.result_code === 0) {
                navigation.goBack()
            }
        })
    }

    return (
        <Page>
            <Header isGoBack title="Update post" />
            <View style={{ marginTop: 30 }}>
                <InputStyle inputTitle="Title">
                    <InputItem last type="text" style={{ ...styles.input }} value={postInfo.title} onChange={(value) => setPostInfo({ ...postInfo, title: value })}></InputItem>
                </InputStyle>

                <View style={{ marginVertical: 20 }}>
                    <View style={styles.uploadWrapper}>
                        <Carousel horizontal style={{ width: "100%", height: 169 }}>
                            <View>
                                <TouchableOpacity onPress={() => handleFileUpload()} style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <Icon name="upload" style={styles.uploadIcon} size="lg" />
                                    <Text style={styles.uploadText}>File size must to be 5MB❗</Text>
                                </TouchableOpacity>
                            </View>
                            {images.map((image, i) => (
                                <View key={i}>
                                    <CloudImage styleImg={styles.bookImage} url={image} />
                                    <TouchableOpacity style={styles.iconCloseImg} onPress={() => handleRemoveImg(i)}>
                                        <Icon name="close" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </Carousel>
                    </View>
                </View>
                <InputStyle inputTitle="Club">
                    <View style={{ width: "100%" }}>
                        <Switch checked={postInfo.isClub} onChange={onChangeSwitchClub} />
                        {postInfo.isClub && (
                            <TouchableOpacity onPress={() => setShowModalClub(true)} style={{ ...styles.input, marginLeft: 0, marginRight: 0, marginTop: 10 }}>
                                <Text style={{ opacity: postInfo.clubId?.length ? 1 : 0.5 }}>{postInfo.clubId && postInfo.clubId.length ? clubList.find((item) => item.id === postInfo.clubId)?.title : "Select club!"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </InputStyle>
                <InputStyle inputTitle="Description">
                    <TextareaItem last style={styles.textAreaInput} rows={4} count={400} value={postInfo.content} onChange={(e) => setPostInfo({ ...postInfo, content: e || "" })} placeholder="Type post here..." />
                </InputStyle>

                <Button type="primary" style={styles.createBtn} onPress={() => onUpdateBtn()}>
                    Update post
                </Button>
            </View>
            <Modal popup animationType="slide-up" visible={showModalClub} onClose={() => setShowModalClub(false)} style={styles.modalWrapper} maskClosable>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Clubs</Text>
                    {clubList.length ? (
                        clubList.map((club) => (
                            <ClubCard key={club.id} isClubsPage={false} clubInfo={club} onClickClubBlock={() => onSelectClub(club.id || "")}>
                                <View style={[styles.selectBlock, { borderColor: postInfo.clubId === club.id ? "#0A78D6" : "#212121" }]}>{postInfo.clubId === club.id && <Icon name="check" color="#0A78D6" />}</View>
                            </ClubCard>
                        ))
                    ) : (
                        <NoData />
                    )}
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        paddingTop: 15,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    selectBlock: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        borderRadius: 100,
        borderColor: "#212121",
        borderStyle: "solid",
        borderWidth: 1,
    },
    textAreaInput: {
        height: 120,
        width: Dimensions.get("window").width - 32,
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
        borderRadius: 14,
        paddingLeft: 14,
        paddingTop: 13,
    },
    createBtn: {
        width: "100%",
        borderRadius: 13,
        backgroundColor: "#0A78D6",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        borderWidth: 0,
    },
    iconCloseImg: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 5,
        fontSize: 25,
        borderWidth: 1,
        borderColor: "#6D7885",
        borderStyle: "solid",
        backgroundColor: "#000",
        zIndex: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    bookImage: {
        width: "100%",
        height: 169,
        objectFit: "contain",
        borderRadius: 25,
    },
    input: {
        height: 42,
        width: "100%",
        borderWidth: 0.5,
        borderColor: "#000",
        borderStyle: "solid",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginLeft: -15,
        marginRight: -15,
    },
    uploadWrapper: {
        width: "100%",
        height: 169,
        borderRadius: 25,
        backgroundColor: "#F9FAF8",
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: "#212121",
    },
    uploadIcon: {
        fontSize: 57,
        textAlign: "center",
        color: "#000",
    },
    uploadText: {
        marginTop: 5,
        fontSize: 9,
        fontWeight: "500",
        lineHeight: 9,
    },
    inputWrapper: {
        marginTop: 11,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
})
