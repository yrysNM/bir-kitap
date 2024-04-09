import { Image, StyleSheet, Text, View } from "react-native"
import ReadersUserImg from "../../assets/images/user.png"
import Button from "@ant-design/react-native/lib/button"
import { useEffect, useState } from "react"
import { RecommendationAPI } from "../api/recommendationApi"

const Follow = () => {
    const [users, setUsers] = useState<any>()

    const { fetchData } = RecommendationAPI("users")

    useEffect(() => {
        fetchData({}).then((res) => {
            if (res && res.result_code) {
                setUsers(res.data)
                alert('1223')
            }
        }).catch((err) => {
            if (err) {
                alert(JSON.stringify(err))
            }
        })
    }, [])

    // useEffect(() => {
    //     alert(JSON.stringify(users))
    // })

    return (
        <View style={styles.followWrapper}>
            <View style={styles.followBlock}>
                <View style={styles.followContent}>
                    <View>
                        <Image source={ReadersUserImg} alt="Reader User Image" resizeMode="contain" />
                    </View>
                    <View>
                        <Text style={styles.followUser}>Nurdaulet Toregaliyev</Text>
                        <Text style={{ ...styles.followUser, color: "#7A7878" }}>Начинающий</Text>
                    </View>
                </View>

                <View style={styles.followBtnBlock}>
                    <Button style={styles.followBtn}>
                        <Text style={styles.followBtnText}>Follow</Text>
                    </Button>
                </View>
            </View>

            <View style={styles.followBlock}>
                <View style={styles.followContent}>
                    <View>
                        <Image source={ReadersUserImg} alt="Reader User Image" resizeMode="contain" />
                    </View>
                    <View>
                        <Text style={styles.followUser}>Ayala Nayashova</Text>
                        <Text style={{ ...styles.followUser, color: "#7A7878" }}>Начинающий</Text>
                    </View>
                </View>

                <View style={styles.followBtnBlock}>
                    <Button style={styles.unFollowBtn}>
                        <Text style={styles.unFollowBtnText}>Follow</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    followWrapper: {
        marginTop: 36,
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
