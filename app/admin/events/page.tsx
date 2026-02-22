import { getEvents } from "@/lib/queries"
import { Search, MapPin, Clock, Calendar } from "lucide-react"
import { CreateEventDialog } from "../components/create-event-dialog"
import { EditEventDialog } from "../components/edit-event-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteEvent } from "@/app/actions/admin"

export default async function AdminEvents() {
    const events = await getEvents()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">Campaigns & <span className="text-blue-500">Events</span></h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sectors currently in operation: {events.length}</p>
                    </div>
                </div>
                <CreateEventDialog />
            </div>

            {/* Search bar - Premium HUD Style */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 md:p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="OPERATIONAL OVERRIDE: SEARCH MISSIONS..."
                            className="w-full h-14 pl-12 pr-6 bg-slate-950/50 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500/50" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ACTIVE MISSIONS:</span>
                            <span className="text-[11px] font-bold text-blue-400 tabular-nums">{events.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {events.map(event => (
                    <div key={event.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider ${event.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-white/10'}`}>
                                {event.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div className="text-[9px] font-black text-blue-500/50 uppercase tracking-[0.2em]">MISSION IDENTITY</div>
                            <h3 className="font-black text-lg text-white uppercase italic tracking-tighter leading-tight truncate">
                                {event.title}
                            </h3>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/5">{event.organizer}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 font-bold uppercase tracking-widest text-[9px]">
                            <div className="space-y-1">
                                <span className="text-blue-500/50 block">CHRONOLOGY</span>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock className="w-3 h-3" />
                                    <span>{event.date}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-blue-500/50 block">COORDINATES</span>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin className="w-3 h-3 text-red-500/50" />
                                    <span className="truncate">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none">
                                {event.type}
                            </span>
                            <div className="flex items-center gap-2">
                                <EditEventDialog event={event as any} />
                                <DeleteAction id={event.id} action={deleteEvent} title="Event" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950/50 text-slate-500 uppercase text-[9px] font-black tracking-[0.2em] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-5 whitespace-nowrap italic">Mission Code</th>
                                <th className="px-6 py-5">Chronology</th>
                                <th className="px-6 py-5">Coordinates</th>
                                <th className="px-6 py-5 text-center">Protocol</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {events.map(event => (
                                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-black text-xs text-white uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">{event.title}</div>
                                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{event.organizer}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-xs font-bold text-slate-300">{event.date}</div>
                                        <div className="text-[10px] text-slate-600 font-medium uppercase tracking-tighter mt-0.5">{event.time}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 truncate max-w-[200px]">
                                            <MapPin className="w-3 h-3 text-red-500/30" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black rounded uppercase tracking-widest">
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${event.status === 'Upcoming' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border border-white/5'}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right whitespace-nowrap">
                                        <div className="flex justify-end items-center gap-2">
                                            <EditEventDialog event={event as any} />
                                            <DeleteAction id={event.id} action={deleteEvent} title="Event" />
                                        </div>
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
