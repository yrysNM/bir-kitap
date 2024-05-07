import { clubInfo } from "../api/clubApi"
import { TouchableOpacity, StyleSheet, View, Text, Image } from "react-native"
import { CloudImage } from "./CloudImage"
import dayjs from "dayjs"
import ClubImg from "../../assets/images/category/club.png"

type propsInfo = {
    isClubsPage: boolean
    children: React.ReactNode
    clubInfo: clubInfo
    onClickClubBlock: () => void
}

export const ClubCard = ({ isClubsPage, children, clubInfo, onClickClubBlock }: propsInfo) => {
    return (
        <TouchableOpacity delayPressIn={10} onPress={() => onClickClubBlock()} style={styles.clubBlock}>
            <CloudImage url={clubInfo.avatar} styleImg={styles.clubImg} />
            <View style={styles.clubInfo}>
                <Text style={styles.clubTitleText}>{clubInfo.title}</Text>

                <View>
                    {clubInfo.lastPostTime !== 0 && (
                        <Text style={styles.clubAdminText}>
                            <Text>Last Post: </Text>
                            <Text style={{ color: "#212121", fontWeight: "500" }}>{dayjs().to(dayjs(clubInfo.lastPostTime))}</Text>
                        </Text>
                    )}
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={styles.clubBottomEditBlock}>
                            <Image source={ClubImg} tintColor="#6D7885" style={{ width: 15, height: 25, objectFit: "contain" }} />
                            <Text style={styles.clubUsersText}>{clubInfo.followersCount}</Text>
                        </View>
                        {isClubsPage && children}
                    </View>
                </View>
            </View>
            {!isClubsPage && children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    clubUsersText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 15,
        color: "#6D7885",
    },
    clubBottomEditBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    clubAdminText: {
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 16,
        color: "#6D7885",
    },
    clubTitleText: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 20,
    },
    clubBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    clubImg: {
        width: 110,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    clubInfo: {
        gap: 5,
        flex: 1,
    },
})
