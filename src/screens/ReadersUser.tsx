import { Text, View } from "react-native"
import { Page } from "../layouts/Page"
import { Header } from "../components/Header"
import { SearchInput } from "../components/SearchInput"
import { useState } from "react"
import Follow from "../components/Follow"

const ReadersUser = () => {
    const [search, setSearch] = useState<string>("")

    return (
        <Page>
            <Header isGoBack={true} title="Readers" />
            <View style={{paddingVertical: 10}}/>
            <SearchInput onEnterSearch={(e) => setSearch(e)} placeholder="Search books" />

            <Follow />
        </Page>
    )
}

export default ReadersUser
