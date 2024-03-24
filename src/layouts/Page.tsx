import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Fuse } from "./Fuse"
import { useAppSelector } from "../hook/useStore";

export const Page = ({ children }: { children: React.ReactNode; }) => {
    const {bgColor} = useAppSelector(state => state.mainSlice);
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: bgColor }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 20, paddingHorizontal: 16 }}>
                <Fuse>{children}</Fuse>
            </ScrollView>
        </SafeAreaView>
    )
}
