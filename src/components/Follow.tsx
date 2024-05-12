import { StyleSheet, Text, View } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { useMemo, useState } from "react"
import { CloudImage } from "./CloudImage"
import { UserAPI } from "../api/userApi"
import { IRecommendationUser } from "../api/authApi"
import { SearchInput } from "../components/SearchInput"
import { NoData } from "./NoData"

type propsInfo = {
    users: IRecommendationUser[]
    onToggleFollow: (users: IRecommendationUser[]) => void
}

const Follow = ({ users, onToggleFollow }: propsInfo) => {
    const [search, setSearch] = useState<string | null>(null)

    const { fetchData: fetchDataUserFollow } = UserAPI("follow")
    const { fetchData: fetchDataUserOnFollow } = UserAPI("unfollow")

    const onFollow = async (id: string, followed: boolean) => {
        const action = !followed ? fetchDataUserFollow : fetchDataUserOnFollow
        await action({ toUserId: id })
        const updatedUsers = users?.map((user) => {
            if (user.id === id) {
                return { ...user, followed: !followed }
            }
            return user
        })
        onToggleFollow(updatedUsers)
    }

    const searchList = useMemo(() => {
        if (search && search.length > 0) {
            return users.filter((user) => user.fullName.toLowerCase().includes(search.toLowerCase()))
        }

        return users
    }, [search, users])

    return (
        <>
            <SearchInput onEnterSearch={(e) => setSearch(e)} placeholder="Search books" />

            <View style={styles.followWrapper}>
                {searchList.length ? (
                    searchList.map((item) => (
                        <View style={styles.followBlock} key={item.id}>
                            <View style={styles.followContent}>
                                <View>
                                    <CloudImage url={item.avatar} styleImg={styles.followImage} />
                                </View>
                                <View>
                                    <Text style={styles.followUser}>{item.fullName}</Text>
                                    <Text style={{ ...styles.followUser, color: "#6D7885" }}>{item.email}</Text>
                                </View>
                            </View>

                            <View style={styles.followBtnBlock}>
                                <Button style={!item.followed ? styles.followBtn : styles.unFollowBtn} onPress={() => onFollow(item.id, item.followed)}>
                                    <Text style={!item.followed ? styles.followBtnText : styles.unFollowBtnText}>{!item.followed ? "Follow" : "Unfollow"}</Text>
                                </Button>
                            </View>
                        </View>
                    ))
                ) : (
                    <NoData />
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    followWrapper: {
        marginTop: 36,
    },

    followImage: {
        width: 55,
        height: 55,
        borderRadius: 1000,
    },

    followBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 17,
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
    },

    followUser: {
        fontWeight: "600",
        fontSize: 13.53,
    },

    followContent: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    followBtnBlock: {
        flex: 1,
    },

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
        fontSize: 13,
        fontWeight: "600",
        color: "#212121",
    },
})

export default Follow
