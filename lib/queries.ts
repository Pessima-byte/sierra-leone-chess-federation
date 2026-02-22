import { cache } from "react"
import { unstable_cache } from "next/cache"
import db from "./db"

/**
 * Fetch basic member details for list views. 
 * Optimized to NOT include full game history to improve performance.
 */
export const getMembers = cache(async () => {
    return unstable_cache(
        async () => {
            const members = await db.member.findMany({
                orderBy: { rating: 'desc' },
            })
            return members.map(m => ({
                ...m,
                createdAt: m.createdAt.toISOString(),
                updatedAt: m.updatedAt.toISOString(),
            }))
        },
        ["members-list"],
        { revalidate: 60, tags: ["members"] }
    )()
})

/**
 * Fetch members with their full game history.
 */
export const getMembersWithGames = cache(async () => {
    return unstable_cache(
        async () => {
            const members = await db.member.findMany({
                orderBy: { rating: 'desc' },
                include: {
                    gamesWhite: { include: { white: true, black: true } },
                    gamesBlack: { include: { white: true, black: true } }
                }
            })

            return members.map(m => ({
                ...m,
                games: [...m.gamesWhite, ...m.gamesBlack].map(g => ({
                    ...g,
                    white: g.white.name,
                    black: g.black.name,
                    rating_change: g.ratingChange
                }))
            }))
        },
        ["members-with-games"],
        { revalidate: 60, tags: ["members"] }
    )()
})

export const getMemberById = cache(async (id: string) => {
    return unstable_cache(
        async () => {
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
        },
        [`member-${id}`],
        { revalidate: 60, tags: ["members"] }
    )()
})

export const getEvents = cache(async () => {
    return unstable_cache(
        async () => {
            const events = await db.calendarEvent.findMany({
                orderBy: { date: 'asc' }
            })
            return events.map(e => ({
                ...e,
            }))
        },
        ["events-list-v5"],
        { revalidate: 60, tags: ["events"] }
    )()
})

export const getNews = cache(async () => {
    return unstable_cache(
        async () => {
            const news = await db.newsArticle.findMany({
                orderBy: { date: 'desc' }
            })
            return news.map(article => ({
                ...article,
                tags: article.tags.split(',')
            }))
        },
        ["news-list-v3"],
        { revalidate: 60, tags: ["news"] }
    )()
})

export const getNewsArticleById = cache(async (id: string) => {
    return unstable_cache(
        async () => {
            const article = await db.newsArticle.findUnique({
                where: { id }
            })
            if (!article) return null
            return {
                ...article,
                tags: article.tags.split(',')
            }
        },
        [`news-${id}`],
        { revalidate: 60, tags: ["news"] }
    )()
})

export const getHomeStats = cache(async () => {
    return unstable_cache(
        async () => {
            const [memberCount, eventCount] = await Promise.all([
                db.member.count(),
                db.calendarEvent.count()
            ])
            return { memberCount, eventCount }
        },
        ["home-stats"],
        { revalidate: 3600, tags: ["members", "events"] }
    )()
})
