import { getNews } from "@/lib/queries"
import NewsClient from "./news-client"

export const revalidate = 60

export default async function NewsPage() {
    const news = await getNews()
    return <NewsClient initialNews={news as any} />
}
