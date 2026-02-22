import { getEvents } from "@/lib/queries"
import { Search, MapPin, Clock } from "lucide-react"
import { CreateEventDialog } from "../components/create-event-dialog"
import { EditEventDialog } from "../components/edit-event-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteEvent } from "@/app/actions/admin"

export default async function AdminEvents() {
    const events = await getEvents()

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tight">EVENTS</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">{events.length} total events</p>
                </div>
                <CreateEventDialog />
            </div>

            {/* Search Bar */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-3 md:rounded-2xl md:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="text-xs text-muted-foreground">
                    {events.length} events
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-2">
                {events.map(event => (
                    <div key={event.id} className="bg-slate-900/40 border border-white/[0.06] rounded-xl p-3.5 space-y-2.5">
                        {/* Header: Title + Status */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-white leading-tight">{event.title}</div>
                                <div className="text-[10px] text-muted-foreground mt-0.5">{event.organizer}</div>
                            </div>
                            <span className={`shrink-0 text-[9px] font-bold uppercase px-2 py-0.5 rounded ${event.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                }`}>
                                {event.status}
                            </span>
                        </div>

                        {/* Details Row */}
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-400" />
                                <span>{event.date} · {event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-blue-400" />
                                <span className="truncate max-w-[180px]">{event.location}</span>
                            </div>
                        </div>

                        {/* Type + Actions */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/5">
                            <span className="text-[10px] font-bold uppercase py-0.5 px-2 rounded bg-blue-500/10 text-blue-400">
                                {event.type}
                            </span>
                            <div className="flex items-center gap-1">
                                <EditEventDialog event={event as any} />
                                <DeleteAction id={event.id} action={deleteEvent} title="Event" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-950/50 text-muted-foreground uppercase text-[10px] font-black tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Event</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {events.map(event => (
                                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{event.title}</div>
                                        <div className="text-[10px] text-muted-foreground uppercase">{event.organizer}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>{event.date}</div>
                                        <div className="text-[10px] text-muted-foreground">{event.time}</div>
                                    </td>
                                    <td className="px-6 py-4">{event.location}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold uppercase py-1 px-2 rounded bg-blue-500/10 text-blue-400">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-bold uppercase py-1 px-2 rounded ${event.status === 'Upcoming' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <EditEventDialog event={event as any} />
                                        <DeleteAction id={event.id} action={deleteEvent} title="Event" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
