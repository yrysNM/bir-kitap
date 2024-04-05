import { decode as atob} from "base-64"

export function base64toFiile(base64String: string, filename: string) {
    const base64Parts = base64String!.split(",")
    const mime = base64Parts[0]?.match(/:(.*?);/)![1]
    const bsrt = atob(base64Parts[1])
    let n = bsrt.length
    const u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bsrt.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
}
