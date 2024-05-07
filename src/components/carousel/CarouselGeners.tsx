import Carousel from "react-native-snap-carousel"
import { bookInfo } from "../../api/bookApi"
import { View } from "@ant-design/react-native"
import { Dimensions, StyleSheet, Text } from "react-native"

type bookReviewInfo = {
    id?: string
    userId: string
    userName: string
    bookId: string
    title: string
    message: string
    rating: number
    createTime: number
    updatetime: number
    avatar: string
}
interface IBookInfo {
    book: bookInfo
    customInfo: {
        review: number
        finish: number
        selected: number
        rating: number
    }
    reviews: bookReviewInfo[]
}

interface IProps {
    bookInfo: IBookInfo | null
}

const CarouselGeners = ({ bookInfo }: IProps) => {
    const _renderItemMore = ({ item }: { item: string }) => {
        return (
            <View style={styles.borderSubtitle}>
                <Text style={[styles.bookAuthor, { color: "#212121", fontSize: 15 }]}>{item}</Text>
            </View>
        )
    }

    const _renderItem = () => {
        return (
            <View style={{ flexDirection: "row", gap: 10 }}>
                {bookInfo?.book.genres.map((item) => (
                    <View style={styles.borderSubtitle} key={item}>
                        <Text style={[styles.bookAuthor, { color: "#212121", fontSize: 15 }]}>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <>
            {bookInfo && bookInfo?.book?.genres?.length > 2 ? (
                <Carousel data={bookInfo.book.genres} renderItem={_renderItemMore} sliderWidth={Dimensions.get("window").width} itemWidth={200} layout={"default"} vertical={false} inactiveSlideOpacity={5} inactiveSlideScale={1} activeSlideAlignment={"start"} />
            ) : (
                _renderItem()
            )}
        </>
    )
}

const styles = StyleSheet.create({
    borderSubtitle: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        width: "auto",
        marginRight: 20,
    },
    bookAuthor: {
        fontSize: 13,
        fontWeight: "600",
        fontStyle: "normal",
        color: "#6D7885",
    },
})

export default CarouselGeners
