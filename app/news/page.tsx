import { getNews } from "@/lib/queries"
import NewsClient from "./news-client"

export default async function NewsPage() {
    const news = await getNews()

    // Process tags since they are stored as string in SQLite but expected as string[] in client
    const processedNews = news.map(article => ({
        ...article,
        tags: article.tags.split(',')
    }))

    return <NewsClient initialNews={processedNews as any} />
}
