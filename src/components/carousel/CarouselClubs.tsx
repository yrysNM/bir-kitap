import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { clubInfo } from "../../api/clubApi"
import { Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../CloudImage"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ClubDetail">>

export const CarouselClubs = ({ dataList }: { dataList: clubInfo[] }) => {
    const navigation = useNavigation<NavigateType>()

    return (
        <Carousel
            data={dataList}
            renderItem={({ item }: { item: clubInfo }) => (
                <TouchableOpacity delayPressIn={10} onPress={() => navigation.navigate("ClubDetail", { id: item.id || "" })} style={styles.clubWrapper}>
                    <CloudImage url={item.avatar} styleImg={styles.clubImg} />
                    <Text style={styles.clibTitleText} numberOfLines={2}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            )}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={120}
            layout={"default"}
            vertical={false}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeSlideAlignment={"start"}
        />
    )
}

const styles = StyleSheet.create({
    clubWrapper: {
        width: 110,
        flex: 1,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 6,
        elevation: 1,
        shadowOpacity: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    clubImg: {
        width: 100,
        height: 100,
        borderRadius: 12,
        objectFit: "cover",
    },
    clibTitleText: {
        textAlign: "center",
        fontSize: 16,
        lineHeight: 18,
        color: "#212121",
        fontWeight: "500",
    },
})
