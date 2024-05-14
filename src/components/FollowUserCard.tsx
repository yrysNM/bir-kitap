import { StyleSheet, Text, View } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { CloudImage } from "./CloudImage"
import { UserAPI } from "../api/userApi"
import { IRecommendationUser } from "../api/authApi"

type propsInfo = {
    user: IRecommendationUser
    onToggleFollow: (user: IRecommendationUser) => void
}

const FollowUserCard = ({ user, onToggleFollow }: propsInfo) => {
    const { fetchData: fetchDataUserFollow } = UserAPI("follow")
    const { fetchData: fetchDataUserOnFollow } = UserAPI("unfollow")

    const onFollow = async (id: string, followed: boolean) => {
        const updatedUser = { ...user, followed: !followed }
        onToggleFollow(updatedUser)
        const action = !followed ? fetchDataUserFollow : fetchDataUserOnFollow
        action({ toUserId: id })
    }
    return (
        <View style={styles.followBlock}>
            <View style={styles.followContent}>
                <View>
                    <CloudImage url={user.avatar} styleImg={styles.followImage} />
                </View>
                <View>
                    <Text style={styles.followUser}>{user.fullName}</Text>
                    <Text style={{ ...styles.followUser, color: "#6D7885" }}>{user.email}</Text>
                </View>
            </View>

            <View style={styles.followBtnBlock}>
                <Button style={!user.followed ? styles.followBtn : styles.unFollowBtn} onPress={() => onFollow(user.id, user.followed)}>
                    <Text style={!user.followed ? styles.followBtnText : styles.unFollowBtnText}>{!user.followed ? "Follow" : "Unfollow"}</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default FollowUserCard
