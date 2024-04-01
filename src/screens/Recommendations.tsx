import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { Page } from "../layouts/Page"
import { useState } from "react"
import Tabs from "@ant-design/react-native/lib/tabs"
import { TabBarPropsType } from "@ant-design/react-native/lib/tabs/PropsType"
import Carousel from "react-native-snap-carousel"
import { Header } from "../components/Header"
import View from "@ant-design/react-native/lib/view"

export const Recommendations = () => {
    const [recommendationType, setRecommendationType] = useState<string>("")
    const [tabs] = useState<{ title: string }[]>([
        {
            title: "Books",
        },
        {
            title: "Reviews",
        },
        {
            title: "Posts",
        },
        {
            title: "Users",
        },
    ])

    const isSelectRecommendationType = (type: string) => {
        return recommendationType === type
    }

    const tabHeader = (tabProps: TabBarPropsType) => {
        const { goToTab, onTabClick } = tabProps

        const _renderRecommendationTypes = ({ item, index }: { item: { title: string }; index: number }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        onTabClick && onTabClick(tabs[index], index)
                        goToTab && goToTab(index)
                        // onChangeTab()
                        setRecommendationType(item.title)
                    }}
                    style={[styles.bookBlock, isSelectRecommendationType(item.title) ? styles.bookTypeBlockActive : styles.bookTypeBlock]}>
                    <Text style={{ ...styles.bookTypeText, color: isSelectRecommendationType(item.title) ? "#fff" : "#000" }}>{item.title}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.tabHeadBlock}>
                <Carousel data={tabs} renderItem={_renderRecommendationTypes} sliderWidth={Dimensions.get("window").width} itemWidth={120} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
            </View>
        )
    }

    return (
        <Page>
            <Header isCustomHeader={false} title="Recommendations" isGoBack />
            <View style={{ marginTop: 20 }}>
                <Tabs tabs={tabs} swipeable={false} renderTabBar={(tabProps) => tabHeader(tabProps)}></Tabs>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    tabHeadBlock: {
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 10,
        position: "absolute",
        top: -10,
        left: 0,
        backgroundColor: "#fff",
    },
    bookBlock: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    bookTypeBlock: {
        backgroundColor: "#FFFFFF",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 1.0)",
    },
    bookTypeBlockActive: {
        backgroundColor: "#005479",
        borderWidth: 0,
    },
    bookTypeText: {
        textAlign: "center",
        fontSize: 10,
        fontWeight: "500",
        lineHeight: 15,
        color: "#FFFFFF",
    },
})
