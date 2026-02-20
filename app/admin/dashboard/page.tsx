import { getMembers, getEvents, getNews, getSystemSettings } from "@/lib/queries"
import { Users, Calendar, Newspaper, Trophy } from "lucide-react"
import { RecordGameDialog } from "../components/record-game-dialog"
import { LockdownToggle } from "../components/lockdown-toggle"

export default async function AdminDashboard() {
    const members = await getMembers()
    const events = await getEvents()
    const news = await getNews()
    const settings = await getSystemSettings()

    const stats = [
        {
            title: "Total Members",
            value: members.length,
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Active Events",
            value: events.filter(e => e.status !== "Completed").length,
            icon: Calendar,
            color: "text-green-400",
            bg: "bg-green-500/10",
        },
        {
            title: "News Articles",
            value: news.length,
            icon: Newspaper,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            title: "Total Prize Pools",
            value: "$12.5k", // Mock for now
            icon: Trophy,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic tracking-tight">OVERVIEW</h1>
                <div className="flex items-center gap-3">
                    <LockdownToggle initialStatus={settings.lockdownActive} />
                    <RecordGameDialog members={members} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.title}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold mb-4">Recent Members</h2>
                    <div className="space-y-4">
                        {members.slice(0, 5).map(member => (
                            <div key={member.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">{member.name}</span>
                                    <span className="text-xs text-muted-foreground">{member.club}</span>
                                </div>
                                <span className="text-sm font-bold text-blue-400">{member.rating}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        {events.slice(0, 5).map(event => (
                            <div key={event.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">{event.title}</span>
                                    <span className="text-xs text-muted-foreground">{event.date}</span>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-white font-medium uppercase">{event.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
