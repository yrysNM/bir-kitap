import React, { useCallback } from "react"
import { RefreshControl, SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Fuse } from "./Fuse"
import { useRoute } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { setRefresh } from "../redux/features/mainSlice"

export const Page = ({ children }: { children: React.ReactNode }) => {
    const route = useRoute()
    const { isRefresh } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()

    const onRefresh = useCallback(() => {
        dispatch(setRefresh(true))

        setTimeout(() => {
            dispatch(setRefresh(false))
        }, 100)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: route.name === "EditProfile" ? "#005479" : "#F7F9F6", marginTop: (StatusBar.currentHeight || 0) + 10 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 20, paddingHorizontal: route.name === "ReaderNews" ? 0 : 16 }} refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}>
                <Fuse>{children}</Fuse>
            </ScrollView>
        </SafeAreaView>
    )
}
