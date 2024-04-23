import { FC, useEffect, useRef } from "react"
import { Animated, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native"

interface ISkeletonProps {
    width: number
    height: number
    varient?: "box" | "circle"
    styleProps?: StyleProp<ViewStyle>
    stylePropsText?: StyleProp<TextStyle>
}

const Skeleton: FC<ISkeletonProps> = ({ width, height, varient, styleProps, stylePropsText }) => {
    const opacity = useRef(new Animated.Value(0.3))

    let borderRadius = 0

    if (varient === "circle") {
        borderRadius = typeof height === "string" ? parseInt(height, 10) / 2 : height / 2
    }

    useEffect(() => {
        const anim = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity.current, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity.current, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                }),
            ]),
        )

        anim.start()

        return () => anim.stop()
    }, [])

    return <Animated.View style={[styles.skeleton, { opacity: opacity.current, height, width, borderRadius }, styleProps, stylePropsText]} />
}

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "#E1E9FF",
    },
})

export default Skeleton
