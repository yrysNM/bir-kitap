import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { postInfo } from "../api/postApi"
import { CloudImage } from "./CloudImage"
import Skeleton from "./Skeleton"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "PostDetail">>

export const PostCard = ({ postInfo }: { postInfo: postInfo }) => {
    const navigation = useNavigation<NavigateType>()

    return postInfo ? (
        <TouchableOpacity style={styles.postBlock} onPress={() => navigation.navigate("PostDetail", { id: postInfo.id || "" })} delayPressIn={10}>
            <CloudImage url={postInfo.attachments[0]} styleImg={styles.image} />
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <View style={styles.readerTitle}>
                    <View style={styles.readerTitleBlock}>
                        <Text style={{ color: "white", fontSize: 8 }}>{postInfo.title || "-"}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.readerText}>{postInfo.content || "-"}</Text>
            </View>
        </TouchableOpacity>
    ) : (
        <View style={{ justifyContent: "center", alignItems: "center", marginRight: 20 }}>
            <Skeleton width={1} height={250} varient="box" styleProps={{ width: "100%", borderRadius: 8 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    postBlock: {
        backgroundColor: "#fff",
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 9.5,
        marginBottom: 16,

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 1,
    },
    image: {
        width: "100%",
        marginBottom: 14,
        height: 200,
        borderRadius: 12,
    },
    readerContent: {
        width: "100%",
        position: "relative",
    },

    readerTitle: {
        flexDirection: "row",
    },

    readerTitleBlock: {
        backgroundColor: "#0A78D6",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    readerText: {
        fontSize: 8,
        fontWeight: "600",
        marginTop: 7,
        marginBottom: 10,
    },
})
