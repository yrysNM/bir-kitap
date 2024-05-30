import { View, FlatList } from "react-native"
import { Page } from "../../layouts/Page"
import { Header } from "../../components/Header"
import FollowUserCard from "../../components/entities/FollowUserCard"
import { IRecommendationUser } from "../../api/authApi"
import { useEffect, useMemo, useState } from "react"
import { RecommendationAPI } from "../../api/recommendationApi"
import { SearchInput } from "../../components/SearchInput"
import { useAppSelector } from "../../hook/useStore"
import { useRoute, RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { UserAPI } from "../../api/userApi"

const ReadersUser = () => {
    const { id, userId } = useRoute<RouteProp<RootStackParamList, "ReadersUser">>().params
    const {
        isRefresh: isRefreshStore,
        userInfo: { id: userIdStore },
    } = useAppSelector((state) => state.mainSlice)
    const { fetchData: fetchRecommendationUserData } = RecommendationAPI("users")
    const { fetchData: fetchUserFollowingData } = UserAPI("my/following")
    const { fetchData: fetchUserFollowersData } = UserAPI("my/followers")

    const [users, setUsers] = useState<IRecommendationUser[]>([])
    const [search, setSearch] = useState<string | null>(null)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    useEffect(() => {
        setUsers([])
        if (!isRefreshStore) {
            fetchUsers()
        }
    }, [isRefreshStore, id])

    const fetchUsers = async () => {
        let res

        switch (id) {
            case "recommendation":
                res = await fetchRecommendationUserData({})
                break
            case "followers":
                res = await fetchUserFollowersData(userId ? { id: userId } : {})
                break
            case "following":
                res = await fetchUserFollowingData(userId ? { id: userId } : {})
                break
            default:
                res = {
                    result_code: -1,
                }
        }

        if (res.result_code === 0) {
            setUsers(JSON.parse(JSON.stringify(res.data)))
        }
        setIsRefresh(false)
    }

    const searchList = useMemo(() => {
        if (search && search.length > 0) {
            return users.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        }

        return users
    }, [search, users])

    const headerTitle = () => {
        let str = ""
        if (userId && userId === userIdStore) {
            str += "My"
        } else {
            str += "Readers"
        }

        if (id === "followers") {
            str += " followers"
        } else if (id === "following") {
            str += " following"
        }

        return str
    }

    return (
        <Page isFlatList>
            <Header isGoBack={true} title={headerTitle()} />
            <View style={{ paddingVertical: 10 }} />
            <SearchInput onEnterSearch={(e) => setSearch(e)} placeholder="Search users" />

            <View style={{ marginTop: 25 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={searchList}
                    refreshing={isRefresh}
                    onRefresh={() => {
                        fetchUsers()
                    }}
                    renderItem={({ item }) => (
                        <FollowUserCard
                            user={item}
                            onToggleFollow={(e) =>
                                setUsers(
                                    users.map((item) => {
                                        if (e.id === item.id) {
                                            return e
                                        }

                                        return item
                                    }),
                                )
                            }
                        />
                    )}
                />
            </View>
        </Page>
    )
}

export default ReadersUser
