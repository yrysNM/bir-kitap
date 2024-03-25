import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Page } from "../layouts/Page"
import { useNavigation } from "@react-navigation/native"

interface INavArr {
    id: number
    title: string
    slug: string
}

const navArr: INavArr[] = [
    {
        id: 1,
        title: "Edit Profile",
        slug: "EditProfile",
    },
    {
        id: 2,
        title: "Change Password",
        slug: "ChangePassword",
    },
    {
        id: 3,
        title: "Settings",
        slug: "settings",
    },
    {
        id: 4,
        title: "Information",
        slug: "information",
    },
    {
        id: 5,
        title: "Log out",
        slug: "logout",
    },
]

export const Profile = () => {
    const navigation = useNavigation()
    return (
        <Page  >
            <View>
                <View style={style.avatar} />
                <View style={style.homeContent}>
                    <Text style={[style.text, style.homeTitle]}>User User</Text>
                    <Text style={style.text}>Book Lover</Text>
                </View>
            </View>

            <View style={style.homeNav}>
                {navArr.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate(item.slug as never)}>
                        <Text style={style.homeNavLinks}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Page>
    )
}

const style = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#eee",
        marginLeft: "50%",
        transform: [{ translateX: -50 }],
    },

    text: {
        color: "white",
        textAlign: "center",
    },

    homeContent: {
        marginTop: 13.03,
        marginBottom: 26,
    },

    homeTitle: {
        fontSize: 30,
        fontWeight: "600",
    },

    homeNav: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingBottom: 31,
        paddingHorizontal: 36,
    },

    homeNavLinks: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 30,
    },
})

