import { View } from "react-native"
import { Page } from "../../layouts/Page"
import { Header } from "../../components/Header"
import FollowUserCard from "../../components/FollowUserCard"
import { IRecommendationUser } from "../../api/authApi"
import { useEffect, useMemo, useState } from "react"
import { RecommendationAPI } from "../../api/recommendationApi"
import { SearchInput } from "../../components/SearchInput"
import { FlatList } from "react-native-gesture-handler"

const ReadersUser = () => {
    const { fetchData } = RecommendationAPI("users")
    const [users, setUsers] = useState<IRecommendationUser[]>([])
    const [search, setSearch] = useState<string | null>(null)
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const res = await fetchData({})
        if (res.result_code === 0) {
            setUsers(JSON.parse(JSON.stringify(res.data)))
            setIsRefresh(false)
        }
    }

    const searchList = useMemo(() => {
        if (search && search.length > 0) {
            return users.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        }

        return users
    }, [search, users])

    return (
        <Page>
            <Header isGoBack={true} title="Readers" />
            <View style={{ paddingVertical: 10 }} />
            <SearchInput onEnterSearch={(e) => setSearch(e)} placeholder="Search users" />

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
        </Page>
    )
}

export default ReadersUser
