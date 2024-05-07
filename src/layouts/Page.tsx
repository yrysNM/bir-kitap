import React, { useCallback } from "react"
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useAppDispatch, useAppSelector } from "../hook/useStore"
import { setRefresh } from "../redux/features/mainSlice"
import { Loading } from "../components/Loading"

export const Page = ({ isFlatList = false, children }: { isFlatList?: boolean; children: React.ReactNode }) => {
    const route = useRoute()
    const { isRefresh, isLoading } = useAppSelector((state) => state.mainSlice)
    const dispatch = useAppDispatch()

    const onRefresh = useCallback(() => {
        dispatch(setRefresh(true))

        setTimeout(() => {
            dispatch(setRefresh(false))
        }, 100)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F9F6" }}>
            {isFlatList ? (
                <View style={{ flexGrow: 1, paddingHorizontal: route.name === "ReaderNews" ? 0 : 16 }}>{children}</View>
            ) : (
                <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: route.name === "ReaderNews" ? 0 : 16 }} refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}>
                    {children}
                </ScrollView>
            )}
            {isLoading && <Loading />}
        </SafeAreaView>
    )
}
