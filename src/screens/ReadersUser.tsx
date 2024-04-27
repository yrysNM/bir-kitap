import { View } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import Follow from "../components/Follow"

const ReadersUser = () => {
    return (
        <Page>
            <Header isGoBack={true} title="Readers" />
            <View style={{ paddingVertical: 10 }} />

            <Follow />
        </Page>
    )
}

export default ReadersUser
