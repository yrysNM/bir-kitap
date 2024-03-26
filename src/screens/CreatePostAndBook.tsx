import { useEffect, useState } from "react"
import { Page } from "../layouts/Page"
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Image } from "react-native"
import Tabs from "@ant-design/react-native/lib/tabs"
import { BookApi, bookInfo } from "../api/bookApi"
import { InputStyle } from "../components/InputStyle"
import InputItem from "@ant-design/react-native/lib/input-item"
import Icon from "@ant-design/react-native/lib/icon"
import Button from "@ant-design/react-native/lib/button"
import { GenreAPI, genreInfo } from "../api/genreApi"
import Modal from "@ant-design/react-native/lib/modal"
import TextareaItem from "@ant-design/react-native/lib/textarea-item"
import InputItemStyle from "@ant-design/react-native/lib/input-item/style"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "@env"
import Toast from "@ant-design/react-native/lib/toast"
import { base64toFiile } from "../helpers/base64toFile"
import { useNavigation } from "@react-navigation/native"

const _bookInfo = {
    title: "",
    year: 0,
    imageLink: "",
    author: "",
    genres: [],
    pages: 0,
    description: "",
}

export const CreatePostAndBook = () => {
    const navigation = useNavigation()
    const { fetchData: fetchGenreData } = GenreAPI("list")
    const { fetchData: fetchCreateBookData } = BookApi("create")
    const { fetchData: fetchUploadBookImgData } = BookApi("upload")
    const [tabs] = useState<{ title: string }[]>([{ title: "Create book" }, { title: "Create post" }])
    const [genreList, setGenreList] = useState<genreInfo[]>([])
    const [showModalGenre, setShowModalGenre] = useState<boolean>(false)
    const [bookInfo, setBookInfo] = useState<bookInfo>(_bookInfo)
    const [year, setYear] = useState<string>("")
    const [pages, setPages] = useState<string>("")

    useEffect(() => {
        fetchGenreData({}).then((res) => {
            if (res.result_code === 0) {
                setGenreList(res.data)
            }
        })
    }, [])

    const toggleGenre = (genreTitle: string) => {
        const isSelected = bookInfo.genres.includes(genreTitle)
        if (isSelected) {
            setBookInfo((bookInfo) => ({ ...bookInfo, genres: bookInfo.genres.filter((genre) => genre !== genreTitle) }))
        } else {
            setBookInfo((bookInfo) => ({ ...bookInfo, genres: [...bookInfo.genres, genreTitle] }))
        }
    }

    const handleFileUpload = async (isCreateBook: boolean) => {
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
                console.log("File size small than 5mb")
                Toast.fail("File size small than 5mb")
            }

            const param = new FormData()
            param.append("file", {
                uri: uriList.join("/"),
                type: "image/jpeg",
                name: uriList.pop(),
            } as never)

            if (isCreateBook) {
                fetchUploadBookImgData(param, { "Content-Type": "multipart/form-data" } as never).then((res) => {
                    if (res.result_code === 0) {
                        const info: { path: string } = JSON.parse(JSON.stringify(res.data))
                        const urlImage = `${API_URL}/public/get_resource?name=${info.path}`
                        setBookInfo({ ...bookInfo, imageLink: urlImage })
                    }
                })
            } else {
                console.log("create post")
            }
        }
    }

    const handleRemoveImg = (isCreateBook: boolean) => {
        if (isCreateBook) {
            setBookInfo({ ...bookInfo, imageLink: "" })
        }
    }

    const onCreateBook = () => {
        fetchCreateBookData(bookInfo).then((res) => {
            if (res.result_code === 0) {
                Toast.success("Successfuly created book")
                setBookInfo(_bookInfo)
                navigation.navigate("Home" as never)
            }
        })
    }

    return (
        <Page>
            <Text style={styles.headText}>Create book & Create post</Text>

            <View style={{ flex: 1, height: "auto", marginBottom: 5 }}>
                <Tabs tabs={tabs} tabBarUnderlineStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    {/* Create book */}
                    <View>
                        <View style={{ marginTop: 30 }}>
                            <InputStyle inputTitle="Title">
                                <InputItem last type="text" style={{ ...styles.input }} value={bookInfo.title} onChange={(value) => setBookInfo({ ...bookInfo, title: value })}></InputItem>
                            </InputStyle>
                            <InputStyle inputTitle="Author">
                                <InputItem last type="text" style={styles.input} value={bookInfo.author} onChange={(value) => setBookInfo({ ...bookInfo, author: value })}></InputItem>
                            </InputStyle>

                            <View>
                                <View style={styles.uploadWrapper}>
                                    {bookInfo.imageLink.length ? (
                                        <>
                                            <Image style={styles.bookImage} source={{ uri: bookInfo.imageLink }} />
                                            <TouchableOpacity style={styles.iconCloseImg} onPress={() => handleRemoveImg(true)}>
                                                <Icon name="close" />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <>
                                            <Icon name="upload" style={styles.uploadIcon} size="lg" />
                                            <Text style={styles.uploadText}>File size must to be 5MB❗</Text>
                                            <Button type="primary" onPress={() => handleFileUpload(true)} style={styles.uploadBtn}>
                                                <Text style={styles.uploadBtnText}>Click here to upload</Text>
                                            </Button>
                                        </>
                                    )}
                                </View>
                            </View>

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
                                    <Text>{bookInfo.genres.join(", ").length > 50 ? bookInfo.genres.join(", ").slice(0, 50) + "..." : bookInfo.genres.join(", ")}</Text>
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
                        <Text>Create Post</Text>
                    </View>
                </Tabs>
            </View>
            <Modal animationType="slide" transparent maskClosable visible={showModalGenre} onClose={() => setShowModalGenre(false)}>
                <View style={{ gap: 20 }}>
                    {genreList.map((genre) => (
                        <TouchableOpacity key={genre.id} onPress={() => toggleGenre(genre.title)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                            <Text>{genre.title}</Text>
                            <View>{bookInfo.genres.includes(genre.title) ? <Icon name="check" /> : null}</View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </Page>
    )
}

const styles = StyleSheet.create({
    headText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        opacity: 0.5,
        color: "#000000",
    },
    input: {
        ...InputItemStyle,
        height: 42,
        width: "100%",
        borderWidth: 0.2,
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
        justifyContent: "center",
        alignItems: "center",
    },
    uploadIcon: {
        color: "#000",
    },
    uploadText: {
        marginTop: 5,
        fontSize: 9,
        fontWeight: "500",
        lineHeight: 9,
    },
    uploadBtn: {
        marginTop: 10,
        width: 122,
        height: 31,
        borderWidth: 0,
        borderRadius: 13,
        backgroundColor: "#005479",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
    },
    uploadBtnText: {
        fontSize: 10,
        fontWeight: "500",
        lineHeight: 10,
        color: "#F9FAF8",
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
        borderWidth: 0.2,
        borderColor: "#000",
        borderStyle: "solid",
        borderRadius: 14,
        paddingLeft: 14,
        paddingTop: 25,
    },
    createBtn: {
        width: "100%",
        borderRadius: 13,
        backgroundColor: "#005479",
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
