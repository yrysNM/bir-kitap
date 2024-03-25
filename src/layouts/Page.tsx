import React from "react"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { Fuse } from "./Fuse"
import { useRoute } from "@react-navigation/native"

export const Page = ({ children }: { children: React.ReactNode }) => {
    const route = useRoute()
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: route.name === "Services" ? "#005479" : "#fff" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 20, paddingHorizontal: 16 }}>
                <Fuse>{children}</Fuse>
            </ScrollView>
        </SafeAreaView>
    )
}
