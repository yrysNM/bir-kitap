import { useEffect, useState } from "react"
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
import { TabBarPropsType } from "@ant-design/react-native/lib/tabs/PropsType"
import { SelectGenres } from "../../components/SelectGenres"
import { useAppDispatch } from "../../hook/useStore"
import { setLoading } from "../../redux/features/mainSlice"
import { CustomTabs } from "../../components/CustomTabs"

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
}

export const CreatePostAndBook = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const { fetchData: fetchGenreData } = GenreAPI("list")
    const { fetchData: fetchCreateBookData } = BookApi("create")
    const { fetchData: fetchCreatePostData } = PostAPI("create")
    const { fetchData: fetchUploadBookImgData } = BookApi("upload")
    const tabs = [
        { title: "Create book", label: "Create book", value: " create_book" },
        { title: "Create post", label: "Create post ", value: "create_post" },
    ]
    const [genreList, setGenreList] = useState<genreInfo[]>([])
    const [showModalGenre, setShowModalGenre] = useState<boolean>(false)
    const [bookInfo, setBookInfo] = useState<bookInfo>(_bookInfo)
    const [postInfo, setPostInfo] = useState<postInfo>(_postInfo)
    const [images, setImages] = useState<string[]>([])
    const [year, setYear] = useState<string>("")
    const [pages, setPages] = useState<string>("")

    useEffect(() => {
        fetchGenreData({}).then((res) => {
            if (res.result_code === 0) {
                setGenreList(res.data)
            }
        })
    }, [])

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
        fetchCreatePostData(postInfo).then((res) => {
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

    return (
        <Page>
            <View style={{ flex: 1, height: "auto", marginBottom: 5 }}>
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
                                <TouchableOpacity onPress={() => setShowModalGenre(true)} style={{ ...styles.input, marginLeft: 0, marginRight: 0 }}>
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
        </Page>
    )
}

const styles = StyleSheet.create({
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
        borderColor: "rgba(0, 0, 0, 0.5)",
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
        paddingTop: 25,
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
        borderColor: " rgba(255, 255, 255, 0.5)",
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
