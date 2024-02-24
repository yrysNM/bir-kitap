import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"

export const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
            <ScrollView style={{ flexGrow: 1, paddingHorizontal: 16 }}>{children}</ScrollView>
        </SafeAreaView>
    )
}