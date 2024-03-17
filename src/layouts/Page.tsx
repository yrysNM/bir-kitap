import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Fuse } from "./Fuse"

export const Page = ({ children, backColor }: { children: React.ReactNode; backColor?: string }) => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 20, paddingHorizontal: 16, backgroundColor: backColor }}>
                <Fuse>{children}</Fuse>
            </ScrollView>
        </SafeAreaView>
    )
}
