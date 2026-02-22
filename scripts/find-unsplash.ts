import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const news = await prisma.newsArticle.findMany({
        where: {
            image: {
                contains: 'unsplash'
            }
        }
    })
    const events = await prisma.calendarEvent.findMany({
        where: {
            image: {
                contains: 'unsplash'
            }
        }
    })
    const members = await prisma.member.findMany({
        where: {
            image: {
                contains: 'unsplash'
            }
        }
    })

    console.log('News with unsplash:', news.length)
    console.log('Events with unsplash:', events.length)
    console.log('Members with unsplash:', members.length)

    if (news.length > 0) console.log('News:', news.map(n => n.image))
    if (events.length > 0) console.log('Events:', events.map(e => e.image))
    if (members.length > 0) console.log('Members:', members.map(m => m.image))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
