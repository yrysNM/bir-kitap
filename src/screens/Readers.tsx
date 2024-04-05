import { Page } from "../layouts/Page"
import { View } from "react-native"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { NewsApi, newsInfo } from "../api/newsApi"
import { NoData } from "../components/NoData"
import NewsBlock from "../components/NewsBlock"

const Readers = () => {
    const { fetchData } = NewsApi("list")
    const [readerData, setReaderData] = useState<newsInfo[]>([])

    useEffect(() => {
        const news = async () => {
            await fetchData({})
                .then((res) => {
                    if (res.result_code === 0) {
                        setReaderData(res.data)
                    }
                })
                .catch((err: any) => {
                    if (err) {
                        alert(JSON.stringify(err))
                    }
                })
        }

        news()
    }, [])

    return (
        <Page>
            <Header isCustomHeader={false} isGoBack={true} title="Announcement" />
            <View style={{ marginTop: 45 }}>
                {readerData.length === 1 ? (
                    <NoData />
                ) : (
                    <>
                        <NewsBlock readerData={readerData}/>
                    </>
                )}
            </View>
        </Page>
    )
}
export default Readers
