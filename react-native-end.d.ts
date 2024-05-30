declare module "*.png"
declare module "*.svg"
declare module "*.jpeg"
declare module "*.jpg"
declare module "@env"
declare module "react-native-snap-carousel"

interface IResponse {
    result_code: number
    result_msg: string
}

type navigationDetail = "BookMore" | "BookDetail" | "ReadersUser"
