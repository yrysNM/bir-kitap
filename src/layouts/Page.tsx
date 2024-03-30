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
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: route.name === "Services" ? "#005479" : "#fff" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 20, paddingHorizontal: 16 }} refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}>
                <Fuse>{children}</Fuse>
            </ScrollView>
        </SafeAreaView>
    )
}
