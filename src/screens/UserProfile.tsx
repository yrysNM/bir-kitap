import { useRoute, RouteProp } from "@react-navigation/native"
import { Header } from "../components/Header"
import { UserProfileComponent } from "../components/UserProfileComponent"
import { Page } from "../layouts/Page"
import { RootStackParamList } from "../navigation/MainNavigation"

export const UserProfile = () => {
    const { id, isFollow } = useRoute<RouteProp<RootStackParamList, "UserProfile">>().params

    return (
        <Page>
            <Header isGoBack title="" />

            <UserProfileComponent id={id || ""} isFollowUser={isFollow} />
        </Page>
    )
}
