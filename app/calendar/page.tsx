import { getEvents } from "@/lib/queries"
import CalendarClient from "./calendar-client"
import { getSession } from "@/app/actions/auth"

export default async function CalendarPage() {
    const events = await getEvents()
    const session = await getSession()

    // Convert Prisma objects to plain serializable objects if needed
    // In Prisma 6 with SQLite, they are usually fine as is.

    return <CalendarClient initialEvents={events as any} session={session} />
}

