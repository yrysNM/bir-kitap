import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { bookInfo } from "../api/bookApi"
import { CloudImage } from "./CloudImage"
import { StarRate } from "./StarRate"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../navigation/MainNavigation"

type propsInfo = {
    bookInfo: bookInfo
}

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "BookDetail">>

export const BookCard = ({ bookInfo }: propsInfo) => {
    const navigation = useNavigation<NavigateType>()

    const genreText = () => {
        const genreText = bookInfo.genres.join(", ")
        if (genreText.length > 35) {
            return `${genreText.slice(0, 35)}...`
        } else {
            return genreText
        }
    }

    return (
        <TouchableOpacity style={styles.bookCard} onPressIn={() => navigation.navigate("BookDetail", { id: bookInfo.id || "" })}>
            <CloudImage url={bookInfo.imageLink} styleImg={styles.bookImg} />

            <View style={styles.bookInfo}>
                <View>
                    <Text style={styles.bookTitle}>{bookInfo.title}</Text>
                    <Text style={styles.bookGenre}>{genreText()}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <StarRate rateNumber={bookInfo.rating || 0} size={12} />
                    <Text style={styles.bookGenre}>{bookInfo?.rating || 0}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bookCard: {
        paddingTop: 6,
        paddingHorizontal: 10,
        paddingBottom: 14,
        width: 153,
        zIndex: 100,
        // height: ,
        borderRadius: 9,
        backgroundColor: "#f9faf8",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 6,
        elevation: 6,
        shadowOpacity: 1,
        flexDirection: "column",
        gap: 7,
    },
    bookImg: {
        height: 179,
        borderRadius: 9,
        objectFit: "cover",
    },
    bookInfo: {
        gap: 5,
    },
    bookTitle: {
        fontSize: 9,
        fontWeight: "600",
        lineHeight: 9,
        color: "#000000",
    },
    bookGenre: {
        fontSize: 7,
        fontWeight: "600",
        lineHeight: 9,
        color: "#7A7878",
    },
})
