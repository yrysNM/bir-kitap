import { useEffect, useState } from "react"
import { Dimensions, Text, TouchableOpacity, StyleSheet } from "react-native"
import Carousel from "react-native-snap-carousel"
import { useAppSelector } from "../../hook/useStore"

type info = {
    title: string
}

type propsInfo = {
    dataList: info[]
    handleBookType: (dataList: string[] | string) => void
    isMultiple: boolean
    type?: string
}

export const CarouselBookTypeFilter = ({ dataList, handleBookType, isMultiple, type }: propsInfo) => {
    const [bookTypeList, setBookTypeList] = useState<string[]>([])
    const { isRefresh } = useAppSelector((state) => state.mainSlice)

    useEffect(() => {
        if (!isRefresh) {
            setBookTypeList([])
            handleBookType([])
        }
    }, [isRefresh, type])

    const onMultipleSelectBookType = (bookType: string) => {
        if (isSelectBookType(bookType)) {
            const handleTypeList = bookTypeList.filter((type) => type !== bookType)

            handleBookType(handleTypeList)
            setBookTypeList(handleTypeList)
        } else {
            const handleBooklist = [...bookTypeList, bookType]

            handleBookType(handleBooklist)
            setBookTypeList(handleBooklist)
        }
    }

    const onSingleSelectBookType = (bookType: string) => {
        if (bookType !== bookTypeList[0]) {
            setBookTypeList([bookType])
            handleBookType(bookType)
        }
    }

    const isSelectBookType = (bookType: string) => {
        if (bookTypeList.length) {
            return bookTypeList.includes(bookType)
        } else {
            return bookType === type
        }
    }

    const _renderItem = ({ item }: { item: info }) => {
        return (
            <TouchableOpacity onPress={() => (isMultiple ? onMultipleSelectBookType(item.title) : onSingleSelectBookType(item.title))} style={[styles.bookBlock, isSelectBookType(item.title) ? styles.bookTypeBlockActive : styles.bookTypeBlock]}>
                <Text style={{ ...styles.bookTypeText, color: isSelectBookType(item.title) ? "#fff" : "#212121" }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return <Carousel data={dataList} renderItem={_renderItem} sliderWidth={Dimensions.get("window").width} itemWidth={120} layout={"default"} vertical={false} inactiveSlideOpacity={1} inactiveSlideScale={1} activeSlideAlignment={"start"} />
}

const styles = StyleSheet.create({
    bookBlock: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
        shadowRadius: 1,
        shadowColor: "rgba(19, 12, 12, 0.3)",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 1,
        marginHorizontal: 3,
        shadowOpacity: 0.3,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#6D7885",
    },
    bookTypeBlock: {
        backgroundColor: "#FFFFFF",
    },
    bookTypeBlockActive: {
        backgroundColor: "#0A78D6",
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
