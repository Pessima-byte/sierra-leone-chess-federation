import { PrismaClient } from '@prisma/client'
import { newsArticles } from '../lib/news-data'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding news articles...')

    for (const article of newsArticles) {
        await prisma.newsArticle.upsert({
            where: { id: article.id },
            update: {
                title: article.title,
                excerpt: article.excerpt,
                content: article.content,
                date: article.date,
                author: article.author,
                category: article.category,
                image: article.image,
                readTime: article.readTime,
                tags: article.tags.join(', '),
                featured: article.featured || false,
            },
            create: {
                id: article.id,
                title: article.title,
                excerpt: article.excerpt,
                content: article.content,
                date: article.date,
                author: article.author,
                category: article.category,
                image: article.image,
                readTime: article.readTime,
                tags: article.tags.join(', '),
                featured: article.featured || false,
            },
        })
    }

    console.log('News articles seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
