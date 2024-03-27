import Icon from "@ant-design/react-native/lib/icon"
import { useState } from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"

export const StarRate = ({ rateNumber = 0, onChangeRate }: { rateNumber: number; onChangeRate?: (rateNumber: number) => void }) => {
    const [starRating, setStarRating] = useState<number>(rateNumber)
    const onClickStar = (rate: number) => {
        setStarRating(rate)
        if (onChangeRate) {
            onChangeRate(rate)
        }
    }

    return (
        <View style={styles.stars}>
            <TouchableOpacity onPress={() => onClickStar(1)}>
                <Icon name="star" style={starRating >= 1 ? styles.starSelected : styles.starUnselected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(2)}>
                <Icon name="star" style={starRating >= 2 ? styles.starSelected : styles.starUnselected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(3)}>
                <Icon name="star" style={starRating >= 3 ? styles.starSelected : styles.starUnselected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(4)}>
                <Icon name="star" style={starRating >= 4 ? styles.starSelected : styles.starUnselected} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickStar(5)}>
                <Icon name="star" style={starRating >= 5 ? styles.starSelected : styles.starUnselected} />
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
