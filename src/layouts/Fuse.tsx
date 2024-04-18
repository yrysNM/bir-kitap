import { ReactNode } from "react"
// import { useAppSelector } from "../hook/useStore"
// import { Loading } from "../components/Loading"

export const Fuse = ({ children }: { children: ReactNode }) => {
    // const {  isLoading } = useAppSelector((state) => state.mainSlice)

    return (
        <>
            {/* {isLoading && (
               <Loading />
            )} */}
            {children}
        </>
    )
}
