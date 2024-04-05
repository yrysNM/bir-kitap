import { Image, ImageStyle, StyleProp } from "react-native"
import { API_URL } from "@env"
import { useMemo, useState } from "react"

type propsInfo = {
    url?: string
    styleImg?: StyleProp<ImageStyle>
    height?: string | number
    width?: string | number
}

export const CloudImage = ({ url, styleImg }: propsInfo) => {
    const [isError, setIsError] = useState<boolean>(false)
    const urlImg = useMemo(() => {
        if (url && url.length) {
            setIsError(false)
            if (url.indexOf("http") === -1) {
                return `${API_URL}public/get_resource?name=${url}`
            } else {
                return url
            }
        } else {
            setIsError(true)
        }
    }, [url])

    return !isError && urlImg?.length ? <Image source={{ uri: urlImg }} style={styleImg} onError={() => setIsError(true)} /> : <Image source={{ uri: "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg" }} style={styleImg} />
}
