import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import { bookInfo } from "../api/bookApi"
import { RootStackParamList } from "../navigation/MainNavigation"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Page } from "../layouts/Page"
import { CloudImage } from "../components/CloudImage"

interface IReviewDetail extends bookReviewInfo {
    book: bookInfo
}

export const ReviewDetail = () => {
    const { fetchData: fetchReviewDetailData } = ReviewApi("list")
    const [reviewInfo, setReviewInfo] = useState<IReviewDetail | null>(null)
    const { id } = useRoute<RouteProp<RootStackParamList, "ReviewDetail">>().params

    useEffect(() => {
        fetchReviewDetailData({
            id,
        }).then((res) => {
            if (res.result_code === 0) {
                setReviewInfo(JSON.parse(JSON.stringify(res.data)))
            }
        })
    }, [])

    return (
        <Page>
            <View>
                <CloudImage url={reviewInfo?.avatar} />
                <Text>Review detail</Text>
            </View>
        </Page>
    )
}
