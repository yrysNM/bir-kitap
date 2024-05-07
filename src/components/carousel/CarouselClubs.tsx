import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../navigation/MainNavigation"
import { clubInfo } from "../../api/clubApi"
import { Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { CloudImage } from "../CloudImage"
import { SplitText } from "../../helpers/splitText"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "ClubDetail">>

export const CarouselClubs = ({ dataList }: { dataList: clubInfo[] }) => {
    const navigation = useNavigation<NavigateType>()

    return (
        <Carousel
            data={dataList}
            renderItem={({ item }: { item: clubInfo }) => (
                <TouchableOpacity delayPressIn={10} onPress={() => navigation.navigate("ClubDetail", { id: item.id || "" })} style={{ marginBottom: 10 }}>
                    <CloudImage url={item.avatar} styleImg={styles.clubImg} />
                    <Text style={styles.clibTitleText}>{SplitText(item.title, 20)}</Text>
                </TouchableOpacity>
            )}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={100}
            layout={"default"}
            vertical={false}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeSlideAlignment={"start"}
        />
    )
}

const styles = StyleSheet.create({
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
