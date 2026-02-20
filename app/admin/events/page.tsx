import { getEvents } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Search, MoreHorizontal } from "lucide-react"
import { CreateEventDialog } from "../components/create-event-dialog"
import { EditEventDialog } from "../components/edit-event-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteEvent } from "@/app/actions/admin"

export default async function AdminEvents() {
    const events = await getEvents()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic tracking-tight">EVENTS MANAGER</h1>
                <CreateEventDialog />
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="relative w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing {events.length} events
                    </div>
                </div>
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
                                        <DeleteAction
                                            id={event.id}
                                            action={deleteEvent}
                                            title="Event"
                                        />
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
