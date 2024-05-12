import { View } from "react-native"
import { Page } from "../../layouts/Page"
import { Header } from "../../components/Header"
import Follow from "../../components/Follow"
import { IRecommendationUser } from "../../api/authApi"
import { useEffect, useState } from "react"
import { RecommendationAPI } from "../../api/recommendationApi"

const ReadersUser = () => {
    const { fetchData } = RecommendationAPI("users")
    const [users, setUsers] = useState<IRecommendationUser[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetchData({})
            if (res.result_code === 0) {
                setUsers(JSON.parse(JSON.stringify(res.data)))
            }
        }
        fetchUsers()
    }, [])

    return (
        <Page>
            <Header isGoBack={true} title="Readers" />
            <View style={{ paddingVertical: 10 }} />

            <Follow users={users} onToggleFollow={(e) => setUsers(e)} />
        </Page>
    )
}

export default ReadersUser
