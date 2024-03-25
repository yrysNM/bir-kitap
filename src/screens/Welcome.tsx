import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Button from "@ant-design/react-native/lib/button"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"

import { RootStackParamList } from "../navigation/MainNavigation"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type NavigateType = CompositeNavigationProp<BottomTabNavigationProp<RootStackParamList, "Root">, NativeStackNavigationProp<RootStackParamList, "Login">>

export const Welcome = () => {
    const navigation = useNavigation<NavigateType>()

    return (
        <View style={styles.welcomeBlock}>
            <Text style={styles.titleWelcome}>Feel the rhytm</Text>
            <Text style={styles.descrWelcome}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

            <Button style={styles.welcomeBtn} onPress={() => navigation.navigate("CreateAccount")}>
                <Text style={styles.btnText}>Get started!</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeBlock: {
        marginTop: 106,
        paddingHorizontal: 16,
        position: "relative",
        flex: 1,
    },
    titleWelcome: {
        fontSize: 64,
        fontWeight: "700",
        lineHeight: 78,
        color: "#1E1E1E",
    },
    descrWelcome: {
        marginTop: 5,
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 17,
    },
    welcomeBtn: {
        position: "absolute",
        bottom: 102,
        left: 16,
        width: "100%",
        backgroundColor: "#0C1E34",
        borderRadius: 19,
    },
    btnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 22,
    },
})
