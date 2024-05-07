import { useState } from "react"
import { Page } from "../../layouts/Page"
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Image } from "react-native"
import Tabs from "@ant-design/react-native/lib/tabs"
import { BookApi, bookInfo } from "../../api/bookApi"
import { InputStyle } from "../../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import Icon from "@ant-design/react-native/lib/icon"
import Button from "@ant-design/react-native/lib/button"
import { GenreAPI, genreInfo } from "../../api/genreApi"
import Modal from "@ant-design/react-native/lib/modal"
import TextareaItem from "@ant-design/react-native/lib/textarea-item"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "@env"
import Toast from "@ant-design/react-native/lib/toast"
import { base64toFiile } from "../../helpers/base64toFile"
import { useNavigation } from "@react-navigation/native"
import { PostAPI, postInfo } from "../../api/postApi"
import Carousel from "@ant-design/react-native/lib/carousel"
import Switch from "@ant-design/react-native/lib/switch"
import { TabBarPropsType } from "@ant-design/react-native/lib/tabs/PropsType"
import { SelectGenres } from "../../components/SelectGenres"
import { useAppDispatch } from "../../hook/useStore"
import { setLoading } from "../../redux/features/mainSlice"
import { CustomTabs } from "../../components/CustomTabs"
import { ClubAPI, clubInfo } from "../../api/clubApi"
import { NoData } from "../../components/NoData"
import { CloudImage } from "../../components/CloudImage"
import ClubImg from "../../../assets/images/category/club.png"
import { SplitText } from "../../helpers/splitText"

const _bookInfo = {
    title: "",
    year: 0,
    imageLink: "",
    author: "",
    genres: [],
    pages: 0,
    description: "",
}

const _postInfo = {
    title: "",
    attachments: [],
    content: "",
    isClub: false,
    clubId: "",
}

export const CreatePostAndBook = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { fetchData: fetchGenreData } = GenreAPI("list")
    const { fetchData: fetchMyClubData } = ClubAPI("my/list")
    const { fetchData: fetchCreateBookData } = BookApi("create")
    const { fetchData: fetchCreatePostData } = PostAPI("create")
    const { fetchData: fetchUploadBookImgData } = BookApi("upload")
    const tabs = [
        { title: "Create book", label: "Create book", value: " create_book" },
        { title: "Create post", label: "Create post ", value: "create_post" },
    ]
    const [genreList, setGenreList] = useState<genreInfo[]>([])
    const [clubList, setClubList] = useState<clubInfo[]>([])
    const [showModalClub, setShowModalClub] = useState<boolean>(false)
    const [showModalGenre, setShowModalGenre] = useState<boolean>(false)
    const [bookInfo, setBookInfo] = useState<bookInfo>(_bookInfo)
    const [postInfo, setPostInfo] = useState<postInfo>(_postInfo)
    const [images, setImages] = useState<string[]>([])
    const [year, setYear] = useState<string>("")
    const [pages, setPages] = useState<string>("")

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
                    setBookInfo({ ...bookInfo, imageLink: info.path })
                }
            })
        } else {
            dispatch(setLoading(false))
        }
    }

    const handleRemoveImg = (isCreateBook: boolean, indexImage: number) => {
        if (isCreateBook) {
            setBookInfo({ ...bookInfo, imageLink: "" })
        } else {
            setPostInfo({ ...postInfo, attachments: postInfo.attachments.filter((_, index) => index !== indexImage) })
        }

        setImages(images.filter((_, index) => index !== indexImage))
    }

    const onCreateBook = () => {
        fetchCreateBookData(bookInfo).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created book")
                setBookInfo(_bookInfo)
                setImages([])
                setYear("")
                setPages("")
                navigation.navigate("Home" as never)
            }
        })
    }

    const onCreatePost = () => {
        fetchCreatePostData({
            ...postInfo,
            isClub: Number(postInfo.isClub),
        }).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created post")
                setPostInfo(_postInfo)
                setImages([])
                // navigation.navigate("Home" as never)
            }
        })
    }

    const onChangeTab = () => {
        setBookInfo(_bookInfo)
        setPostInfo(_postInfo)
        setImages([])
        setYear("")
        setPages("")
    }

    const textWrapper = (text: string) => {
        if (text.length > 50) {
            return text.slice(0, 50) + "..."
        } else {
            return text
        }
    }

    const openModalGenres = async () => {
        if (!genreList.length) {
            await fetchGenreData({}).then((res) => {
                if (res.result_code === 0) {
                    setGenreList(res.data)
                }
            })
        }
        setShowModalGenre(true)
    }

    const tabHeader = (tabProps: TabBarPropsType) => {
        const { goToTab, onTabClick } = tabProps

        return (
            <CustomTabs
                valueList={tabs}
                onClickTab={(e) => {
                    const tabsIdex = tabs.findIndex((tab) => tab.value === e)
                    if (tabsIdex !== -1) {
                        onTabClick && onTabClick(tabs[tabsIdex], tabsIdex)
                        goToTab && goToTab(tabsIdex)
                        onChangeTab()
                    }
                }}
            />
        )
    }

    const onSelectClub = (clubId: string) => {
        if (postInfo.clubId === clubId) {
            setPostInfo({ ...postInfo, clubId: "" })
        } else {
            setPostInfo({ ...postInfo, clubId })
        }
    }

    return (
        <Page>
            <View style={{ flex: 1, height: "auto", marginBottom: 5, marginTop: 20 }}>
                <Tabs tabs={tabs} swipeable={false} renderTabBar={(tabProps) => tabHeader(tabProps)}>
                    {/* Create book */}
                    <View>
                        <View style={{ marginTop: 30 }}>
                            <InputStyle inputTitle="Title">
                                <InputItem last type="text" style={{ ...styles.input }} value={bookInfo.title} onChange={(value) => setBookInfo({ ...bookInfo, title: value })}></InputItem>
                            </InputStyle>

                            <View style={{ marginVertical: 20 }}>
                                <View style={styles.uploadWrapper}>
                                    {images[0] && images[0].length ? (
                                        <>
                                            <Image style={styles.bookImage} source={{ uri: images[0] }} />
                                            <TouchableOpacity style={styles.iconCloseImg} onPress={() => handleRemoveImg(true, 0)}>
                                                <Icon name="close" />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%" }} onPress={() => handleFileUpload()}>
                                            <Icon name="upload" style={styles.uploadIcon} size="lg" />
                                            <Text style={styles.uploadText}>File size must to be 5MB❗</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>

                            <InputStyle inputTitle="Author">
                                <InputItem last type="text" style={styles.input} value={bookInfo.author} onChange={(value) => setBookInfo({ ...bookInfo, author: value })}></InputItem>
                            </InputStyle>

                            <View style={styles.inputWrapper}>
                                <View style={{ flex: 1 }}>
                                    <InputStyle inputTitle="Year">
                                        <InputItem last type="number" style={styles.input} value={year} onChange={(value) => setYear(value)}></InputItem>
                                    </InputStyle>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <InputStyle inputTitle="Pages">
                                        <InputItem last type="number" style={styles.input} value={pages} onChange={(value) => setPages(value)}></InputItem>
                                    </InputStyle>
                                </View>
                            </View>
                            <InputStyle inputTitle="Genre">
                                <TouchableOpacity onPress={() => openModalGenres()} style={{ ...styles.input, marginLeft: 0, marginRight: 0 }}>
                                    <Text>{textWrapper(bookInfo.genres.join(", "))}</Text>
                                </TouchableOpacity>
                            </InputStyle>
                            <InputStyle inputTitle="Description">
                                <TextareaItem last style={styles.textAreaInput} rows={4} count={400} value={bookInfo.description} onChange={(e) => setBookInfo({ ...bookInfo, description: e || "" })} placeholder="Type post here..." />
                            </InputStyle>

                            <Button type="primary" style={styles.createBtn} onPress={() => onCreateBook()}>
                                Create book
                            </Button>
                        </View>
                    </View>
                    {/* Create Post */}
                    <View>
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
                                                <Image style={styles.bookImage} source={{ uri: image }} />
                                                <TouchableOpacity style={styles.iconCloseImg} onPress={() => handleRemoveImg(true, i)}>
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

                            <Button type="primary" style={styles.createBtn} onPress={() => onCreatePost()}>
                                Create a post
                            </Button>
                        </View>
                    </View>
                </Tabs>
            </View>
            <Modal popup animationType="slide-up" visible={showModalGenre} onClose={() => setShowModalGenre(false)} style={styles.modalWrapper} maskClosable>
                <SelectGenres
                    onSelect={(e) => {
                        setShowModalGenre(false)
                        setBookInfo({ ...bookInfo, genres: e })
                    }}
                    dataList={genreList}
                    selectedGenres={bookInfo.genres}
                />
            </Modal>
            <Modal popup animationType="slide-up" visible={showModalClub} onClose={() => setShowModalClub(false)} style={styles.modalWrapper} maskClosable>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>Clubs</Text>
                    {clubList.length ? (
                        clubList.map((club, i) => (
                            <TouchableOpacity onPress={() => onSelectClub(club.id || "")} key={club.id} style={[styles.clibBlockBorder, { borderBottomWidth: clubList.length - 1 === i ? 0 : 1 }]}>
                                <View style={styles.clubBlock}>
                                    <CloudImage url={club.avatar} styleImg={styles.clubImg} />
                                    <View style={styles.clubInfo}>
                                        <Text style={styles.clubTitleText}>{SplitText(club.title, 20)}</Text>

                                        <View>
                                            <Text style={styles.clubAdminText}>
                                                <Text>Last Post: </Text>
                                                <Text style={{ color: "#212121", fontWeight: "500" }}>16 min ago</Text>
                                            </Text>
                                            <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                                                <View style={styles.clubBottomEditBlock}>
                                                    <Image source={ClubImg} tintColor="#6D7885" style={{ width: 15, height: 25, objectFit: "contain" }} />
                                                    <Text style={styles.clubUsersText}>150</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.selectBlock, { borderColor: postInfo.clubId === club.id ? "#0A78D6" : "#212121" }]}>{postInfo.clubId === club.id && <Icon name="check" color="#0A78D6" />}</View>
                                </View>
                            </TouchableOpacity>
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
    clubBottomEditBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    clubAdminText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    clubTitleText: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 20,
    },
    clubUsersText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 15,
        color: "#6D7885",
    },
    clubBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        paddingVertical: 10,
    },
    clibBlockBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#0000001f",
        borderBottomStyle: "solid",
    },
    clubImg: {
        width: 110,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    clubInfo: {
        gap: 5,
        flex: 1,
    },
    modalWrapper: {
        paddingTop: 15,
        paddingHorizontal: 32,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    spliBlock: {
        position: "absolute",
        top: 0,
        left: "50%",
        height: 47,
        width: 1,
        backgroundColor: "#fff",
        zIndex: 10,
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
    genreItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    selectedGenreItem: {
        backgroundColor: "lightblue",
    },
    genreText: {
        fontSize: 16,
        marginLeft: 10,
    },
    selectedGenresText: {
        marginTop: 20,
        fontSize: 18,
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
})
