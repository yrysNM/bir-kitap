import { StyleSheet, Text, View } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { useEffect, useState } from "react"
import { RecommendationAPI } from "../api/recommendationApi"
import { CloudImage } from "./CloudImage"
import { UserAPI } from "../api/userApi"

const Follow = () => {
    const [users, setUsers] = useState<any[]>()

    const { fetchData } = RecommendationAPI("users")
    const { fetchData: fetchDataUserFollow } = UserAPI("follow")
    const { fetchData: fetchDataUserOnFollow } = UserAPI("unfollow")

    const onFollow = async (id: string, followed: boolean) => {
        const action = !followed ? fetchDataUserFollow : fetchDataUserOnFollow
        try {
            await action({ toUserId: id })
            const updatedUsers = users?.map((user) => {
                if (user.id === id) {
                    return { ...user, followed: !followed }
                }
                return user
            })
            setUsers(updatedUsers)
        } catch (error) {
            alert(JSON.stringify(error))
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetchData({})
                if (res.result_code === 0) {
                    setUsers(res.data)
                }
            } catch (error) {
                alert(JSON.stringify(error))
            }
        }
        fetchUsers()
    }, [])

    return (
        <View style={styles.followWrapper}>
            {users &&
                users.map((item) => (
                    <View style={styles.followBlock} key={item.id}>
                        <View style={styles.followContent}>
                            <View>
                                <CloudImage url={item.avatar} styleImg={styles.followImage} />
                            </View>
                            <View>
                                <Text style={styles.followUser}>{item.fullName}</Text>
                                <Text style={{ ...styles.followUser, color: "#7A7878" }}>{item.email}</Text>
                            </View>
                        </View>

                        <View style={styles.followBtnBlock}>
                            <Button style={!item.followed ? styles.followBtn : styles.unFollowBtn} onPress={() => onFollow(item.id, item.followed)}>
                                <Text style={!item.followed ? styles.followBtnText : styles.unFollowBtnText}>{!item.followed ? "Follow" : "Unfollow"}</Text>
                            </Button>
                        </View>
                    </View>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    followWrapper: {
        marginTop: 36,
    },

    followImage: {
        width: 55,
        height: 55,
    },

    followBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 17,
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
        flex: 2,
    },

    followBtn: {
        borderRadius: 20,
        width: "100%",
        height: 54,
        backgroundColor: "#005479",
        paddingVertical: 8,
    },
    followBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    unFollowBtn: {
        borderRadius: 20,
        width: "100%",
        height: 54,
        backgroundColor: "transparent",
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#000",
    },
    unFollowBtnText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
})

export default Follow
