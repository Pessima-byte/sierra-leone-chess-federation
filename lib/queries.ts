import db from "./db"

export async function getMembers() {
    const members = await db.member.findMany({
        orderBy: { rating: 'desc' },
        include: {
            gamesWhite: { include: { white: true, black: true } },
            gamesBlack: { include: { white: true, black: true } }
        }
    })

    // Transmute to match the expected interface if necessary,
    // or just return and handle in component.
    return members.map(m => ({
        ...m,
        games: [...m.gamesWhite, ...m.gamesBlack].map(g => ({
            ...g,
            white: g.white.name,
            black: g.black.name,
            rating_change: g.ratingChange
        }))
    }))
}

export async function getMemberById(id: string) {
    const member = await db.member.findUnique({
        where: { id },
        include: {
            gamesWhite: { include: { white: true, black: true } },
            gamesBlack: { include: { white: true, black: true } }
        }
    })

    if (!member) return null

    return {
        ...member,
        games: [...member.gamesWhite, ...member.gamesBlack].map(g => ({
            ...g,
            white: g.white.name,
            black: g.black.name,
            rating_change: g.ratingChange
        }))
    }
}

export async function getEvents() {
    return await db.calendarEvent.findMany({
        orderBy: { date: 'asc' }
    })
}

export async function getNews() {
    return await db.newsArticle.findMany({
        orderBy: { date: 'desc' }
    })
}
