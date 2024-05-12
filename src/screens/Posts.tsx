import { useEffect, useState } from "react"
import { postInfo } from "../api/postApi"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { View, FlatList, StyleSheet } from "react-native"
import { PostCard } from "../components/PostCard"
import { NoData } from "../components/NoData"
import { RecommendationAPI } from "../api/recommendationApi"

export const Posts = () => {
    const { fetchData } = RecommendationAPI("posts")
    const [dataList, setDataList] = useState<postInfo[]>([])
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        fetchData({}).then((res) => {
            if (res.result_code === 0) {
                setDataList(JSON.parse(JSON.stringify(res.data)))
                setIsRefresh(false)
            }
        })
    }

    return (
        <Page isFlatList>
            <Header isGoBack title="Posts" />

            <View style={styles.postWrapper}>
                {dataList.length ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={dataList}
                        refreshing={isRefresh}
                        onRefresh={() => loadData()}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
                        renderItem={({ item }) => (
                            <View>
                                <PostCard postInfo={item} />
                            </View>
                        )}
                    />
                ) : (
                    <NoData />
                )}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    postWrapper: {
        flex: 1,
        width: "100%",
        gap: 25,
        marginVertical: 30,
    },
})
