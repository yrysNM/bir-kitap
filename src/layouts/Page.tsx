import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"

export const Page = ({ children, backColor }: { children: React.ReactNode; backColor?: string }) => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: backColor }}>
            <ScrollView style={{ flexGrow: 1, paddingHorizontal: 16 }}>{children}</ScrollView>
        </SafeAreaView>
    )
}
