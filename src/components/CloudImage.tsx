import { Image, ImageStyle, StyleProp } from "react-native"
import { API_URL } from "@env"
import { useEffect, useState } from "react"

export const CloudImage = ({ url, styleImg }: { url?: string; styleImg?: StyleProp<ImageStyle>; height?: string | number; width?: string | number }) => {
    const [urlImg, setUrlImg] = useState<string>("")

    useEffect(() => {
        setUrlImg(`${API_URL}public/get_resource?name=${url}`)
    }, [url])

    return url?.length ? (
        <Image source={{ uri: urlImg }} style={styleImg} onError={() => setUrlImg("https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg")} />
    ) : (
        <Image source={{ uri: "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg" }} style={styleImg} />
    )
}
