import { getEvents } from "@/lib/queries"
import CalendarClient from "./calendar-client"
import { getSession } from "@/app/actions/auth"

export const revalidate = 60

export default async function CalendarPage() {
    const [events, session] = await Promise.all([
        getEvents(),
        getSession()
    ])

    return <CalendarClient initialEvents={events as any} session={session} />
}

