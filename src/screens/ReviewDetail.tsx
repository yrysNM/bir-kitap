import { useEffect, useState } from "react"
import { bookReviewInfo, ReviewApi } from "../api/reviewApi"
import { bookInfo } from "../api/bookApi"
import { RootStackParamList } from "../navigation/MainNavigation"
import { useRoute, RouteProp } from "@react-navigation/native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { ReviewCard } from "../components/ReviewCard"

interface IReviewDetail extends bookReviewInfo {
    book: bookInfo
}

export const ReviewDetail = () => {
    const { fetchData: fetchReviewDetailData } = ReviewApi("get")
    const [reviewInfo, setReviewInfo] = useState<IReviewDetail | undefined>(undefined)
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
            <Header isGoBack title="" />
            <ReviewCard isReviewCard={false} reviewInfo={reviewInfo} />
        </Page>
    )
}
