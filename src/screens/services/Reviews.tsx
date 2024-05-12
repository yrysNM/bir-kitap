import { View, StyleSheet, FlatList } from "react-native"
import { Header } from "../../components/Header"
import { Page } from "../../layouts/Page"
import { bookReviewInfo } from "../../api/reviewApi"
import { useEffect, useState } from "react"
import { NoData } from "../../components/NoData"
import { ReviewCard } from "../../components/ReviewCard"
import { useAppSelector } from "../../hook/useStore"
import Skeleton from "../../components/Skeleton"
import { RecommendationAPI } from "../../api/recommendationApi"

export const Reviews = () => {
    const { fetchData: fetchReviewData } = RecommendationAPI("reviews")
    const { isLoading } = useAppSelector((state) => state.mainSlice)
    const [dataList, setDataList] = useState<bookReviewInfo[]>([])
    const [isRefresh, setIsRefresh] = useState<boolean>(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        fetchReviewData({}).then((res) => {
            if (res.result_code === 0) {
                setDataList(JSON.parse(JSON.stringify(res.data)))
                setIsRefresh(false)
            }
        })
    }

    return (
        <Page isFlatList>
            <Header isCustomHeader={false} isGoBack title="Reviews" />

            <View style={styles.bookWrapper}>
                {dataList.length ? (
                    <FlatList showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} data={dataList} refreshing={isRefresh} onRefresh={() => loadData()} contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }} renderItem={({ item }) => <ReviewCard reviewInfo={item} />} />
                ) : isLoading ? (
                    <>
                        <View style={[styles.reviewWrapper, { marginTop: 30 }]}>
                            <View style={{ marginTop: 10 }}>
                                <Skeleton width={1} height={150} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                            </View>
                            <View>
                                <View style={[styles.headerReview, { justifyContent: "space-between", marginTop: 5 }]}>
                                    <View style={styles.headerReview}>
                                        <Skeleton width={30} height={30} varient="circle" />
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                    <View>
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                </View>

                                <View style={styles.reviewTitleBlock}>
                                    <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    <Skeleton width={100} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Skeleton width={1} height={100} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.reviewWrapper}>
                            <View style={{ marginTop: 10 }}>
                                <Skeleton width={1} height={150} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                            </View>
                            <View>
                                <View style={[styles.headerReview, { justifyContent: "space-between", marginTop: 5 }]}>
                                    <View style={styles.headerReview}>
                                        <Skeleton width={30} height={30} varient="circle" />
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                    <View>
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                </View>

                                <View style={styles.reviewTitleBlock}>
                                    <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    <Skeleton width={100} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Skeleton width={1} height={100} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.reviewWrapper}>
                            <View style={{ marginTop: 10 }}>
                                <Skeleton width={1} height={150} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                            </View>
                            <View>
                                <View style={[styles.headerReview, { justifyContent: "space-between", marginTop: 5 }]}>
                                    <View style={styles.headerReview}>
                                        <Skeleton width={30} height={30} varient="circle" />
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                    <View>
                                        <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    </View>
                                </View>

                                <View style={styles.reviewTitleBlock}>
                                    <Skeleton width={80} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                    <Skeleton width={100} height={20} varient="box" styleProps={{ borderRadius: 12 }} />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Skeleton width={1} height={100} varient="box" styleProps={{ borderRadius: 12, width: "100%" }} />
                                </View>
                            </View>
                        </View>
                    </>
                ) : null}
                {!dataList && !isLoading && <NoData />}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    headerReview: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    bookWrapper: {
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginVertical: 30,
    },
    reviewWrapper: {
        width: "100%",
        borderRadius: 9,
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 9,
        elevation: 1,
        shadowOpacity: 1,
        paddingVertical: 10,
        paddingHorizontal: 19,
    },
    reviewTitleBlock: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginTop: 15,
        marginBottom: 10,
    },
})
