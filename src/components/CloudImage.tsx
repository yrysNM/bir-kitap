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
    const [isImgError, setIsImgError] = useState<boolean>(false)

    const isValidImg = (imgUrl: string) => {
        return imgUrl.indexOf("https://") !== -1
    }

    const urlImg = useMemo(() => {
        if (url && url.length) {
            if (!isValidImg(url)) {
                return `${API_URL}public/get_resource?name=${url}`
            } else {
                return url
            }
        } else {
            return ""
        }
    }, [url])

    return !isImgError && urlImg.length ? <Image source={{ uri: urlImg }} style={styleImg} onError={() => setIsImgError(true)} /> : <Image source={{ uri: "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg" }} style={styleImg} />
}
