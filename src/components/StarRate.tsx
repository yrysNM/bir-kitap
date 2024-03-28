import Icon from "@ant-design/react-native/lib/icon"
import { useEffect, useState } from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

type propsInfo = {
    rateNumber: number
    onChangeRate?: (rateNumber: number) => void
    size?: number
}

export const StarRate = ({ rateNumber = 0, onChangeRate, size = 13 }: propsInfo) => {
    const [starRating, setStarRating] = useState<number>(rateNumber)
    const onClickStar = (rate: number) => {
        if (onChangeRate) {
            setStarRating(rate)
            onChangeRate(rate)
        }
    }

    useEffect(() => {
        setStarRating(rateNumber)
    }, [rateNumber])

    return (
        <View style={styles.stars}>
            <TouchableOpacity onPress={() => onClickStar(1)}>
                <Icon name="star" style={starRating >= 1 ? { ...styles.starSelected, fontSize: size } : { ...styles.starUnselected, fontSize: size }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(2)}>
                <Icon name="star" style={starRating >= 2 ? { ...styles.starSelected, fontSize: size } : { ...styles.starUnselected, fontSize: size }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(3)}>
                <Icon name="star" style={starRating >= 3 ? { ...styles.starSelected, fontSize: size } : { ...styles.starUnselected, fontSize: size }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(4)}>
                <Icon name="star" style={starRating >= 4 ? { ...styles.starSelected, fontSize: size } : { ...styles.starUnselected, fontSize: size }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(5)}>
                <Icon name="star" style={starRating >= 5 ? { ...styles.starSelected, fontSize: size } : { ...styles.starUnselected, fontSize: size }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    starUnselected: {
        color: "#aaa",
    },
    starSelected: {
        color: "#ffb300",
    },
})
