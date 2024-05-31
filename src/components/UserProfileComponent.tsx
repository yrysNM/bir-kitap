import { IUserInfo } from "../api/authApi"
import { bookInfo } from "../api/bookApi"
import { postInfo } from "../api/postApi"
import { bookReviewInfo } from "../api/reviewApi"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { UserAPI } from "../api/userApi"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { BookShowBlock } from "./BookShowBlock"
import { CarouselBookList } from "./carousel/CarouselBookList"
import { CloudImage } from "./CloudImage"
import { CustomTabs } from "./customs/CustomTabs"
import { NoData } from "./NoData"
import { PostCard } from "./entities/PostCard"
import { ReviewCard } from "./entities/ReviewCard"
import Button from "@ant-design/react-native/lib/button"
import { setRefresh } from "../redux/features/mainSlice"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type propsInfo = {
    id: string
    isFollowUser?: boolean
}

interface IProfile {
    readBooksCount: number
    reviewsCount: number
    followersCount: number
    followingCount: number
    reviews: bookReviewInfo[]
    books: {
        [key: string]: bookInfo[]
    }
    posts: postInfo[]
    userVO: IUserInfo
}

const _infoTemp = {
    books: {
        selected: [],
    },
    readBooksCount: 0,
    reviewsCount: 0,
    followersCount: 0,
    followingCount: 0,
    reviews: [],
    posts: [],
    userVO: {
        phone: "",
        fullName: "",
        email: "",
        password: "",
        birth: 0,
        gender: "",
    },
}

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ReadersUser">>

export const UserProfileComponent = ({ id, isFollowUser = false }: propsInfo) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<NavigateType>()
    const {
        userInfo: { fullName, avatar, id: userId },
        isLoading,
        isRefresh,
    } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchUserProfileData } = UserAPI("profile")
    const { fetchData: fetchDataUserFollow } = UserAPI("follow")
    const { fetchData: fetchDataUserOnFollow } = UserAPI("unfollow")
    const [info, setInfo] = useState<IProfile>(_infoTemp)
    const [userFollow, setUserFollow] = useState<boolean>(isFollowUser)
    const [tab, setTab] = useState<string>("survey")
    const statusList = [
        { value: "reading", label: "Reading" },
        { value: "selected", label: "Read Later" },
        { value: "finish", label: "Read" },
    ]
    const tabList = [
        { value: "survey", label: "Survey" },
        { value: "reviews", label: "Reviews" },
        { value: "posts", label: "Posts" },
    ]

    useEffect(() => {
        if (!isRefresh) {
            fetchUserProfileData(isOwnUser() ? {} : { id }).then((res) => {
                if (res.result_code === 0) {
                    setInfo(JSON.parse(JSON.stringify(res.data)))
                }
            })
        }
    }, [isRefresh, id])

    useEffect(() => {
        setUserFollow(isFollowUser)
    }, [isFollowUser])

    const onChangeTab = (type: string) => {
        setTab(type)
    }

    const bookType = Object.keys(info.books)

    const isOwnUser = () => {
        return id === "add"
    }

    const onFollow = async (id: string, followed: boolean) => {
        dispatch(setRefresh(true))
        setUserFollow(!followed)

        const action = !followed ? fetchDataUserFollow : fetchDataUserOnFollow

        action({ toUserId: id }).then(() => {
            dispatch(setRefresh(false))
        })
    }

    return (
        <View style={[styles.profileInfoWrapper, { marginTop: isOwnUser() ? 70 : 30 }]}>
            <CloudImage url={isOwnUser() ? avatar : info.userVO.avatar} styleImg={styles.userProfileImg} />

            <Text style={styles.fullName}>{id === "add" ? fullName : info.userVO.fullName}</Text>

            <View style={styles.userStatistic}>
                <View>
                    <Text style={styles.statisticNumber}>{info?.readBooksCount}</Text>
                    <Text style={styles.statisticDescr}>Read</Text>
                </View>
                <View>
                    <Text style={styles.statisticNumber}>{info?.reviewsCount}</Text>
                    <Text style={styles.statisticDescr}>Reviews</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("ReadersUser", { id: "followers", userId: isOwnUser() ? userId : info.userVO.id })}>
                    <Text style={[styles.statisticNumber, { textDecorationLine: "underline" }]}>{info?.followersCount}</Text>
                    <Text style={styles.statisticDescr}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ReadersUser", { id: "following", userId: isOwnUser() ? userId : info.userVO.id })}>
                    <Text style={[styles.statisticNumber, { textDecorationLine: "underline" }]}>{info?.followingCount}</Text>
                    <Text style={styles.statisticDescr}>Following</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.profileInfoWrapper, { gap: 10, marginTop: -5 }]}>
                {!isOwnUser() && userId !== info.userVO.id && (
                    <View style={{ width: 150 }}>
                        <Button type="primary" style={!userFollow ? styles.followBtn : styles.unFollowBtn} onPress={() => onFollow(id, userFollow)}>
                            <Text style={!userFollow ? styles.followBtnText : styles.unFollowBtnText}>{!userFollow ? "Follow" : "Unfollow"}</Text>
                        </Button>
                    </View>
                )}

                <CustomTabs valueList={tabList} onClickTab={onChangeTab} />
            </View>

            <View style={styles.contentWrapper}>
                {tab === "survey" ? (
                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                        {bookType.length && !isLoading ? (
                            bookType.map((item) => (
                                <BookShowBlock key={item} bookType={statusList.find((status) => status.value === item)?.label || ""}>
                                    <View style={{ marginHorizontal: info.books[item].length <= 1 ? 0 : -16 }}>{info.books[item].length ? <CarouselBookList dataList={info.books[item]} /> : <NoData />}</View>
                                </BookShowBlock>
                            ))
                        ) : (
                            <NoData />
                        )}
                    </View>
                ) : tab === "reviews" ? (
                    <View style={styles.bookWrapper}>{info.reviews.length ? info.reviews.map((item) => <ReviewCard key={item.id} reviewInfo={item} />) : <NoData />}</View>
                ) : tab === "posts" ? (
                    <View style={{ marginTop: 10 }}>{info.posts.length ? info.posts.map((post) => <PostCard postInfo={post} key={post.id} isUpdatePost={isOwnUser()} />) : <NoData />}</View>
                ) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    followBtn: {
        borderWidth: 0,
        borderRadius: 8,
        width: "100%",
        height: 34,
        backgroundColor: "#0A78D6",
        paddingVertical: 5,
        shadowColor: "rgba(10, 120, 214, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
    },
    followBtnText: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "600",
        color: "#fff",
    },
    unFollowBtn: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#6D7885",
        width: "100%",
        height: 34,
        paddingVertical: 5,
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
    unFollowBtnText: {
        fontSize: 14,
        lineHeight: 16,

        fontWeight: "600",
        color: "#212121",
    },
    bookWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 10,
    },
    contentWrapper: {
        // marginTop: 21,
        width: "100%",
    },
    profileInfoWrapper: {
        marginTop: 70,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
    },
    userProfileImg: {
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: 1000,
    },
    fullName: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "600",
        lineHeight: 27,
        color: "#212121",
    },
    userStatistic: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
    statisticNumber: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
        color: "#212121",
    },
    statisticDescr: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "600",
        lineHeight: 15,
        color: "#808080",
    },
})
