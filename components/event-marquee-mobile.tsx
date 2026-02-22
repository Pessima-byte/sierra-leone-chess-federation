'use client'

import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

interface Event {
    title: string
    image: string
    date: string
    location: string
}

export default function EventMarqueeMobile({ events }: { events: Event[] }) {
    // Duplicate events for infinite loop
    const duplicatedEvents = [...events, ...events, ...events]

    return (
        <div className="relative w-full overflow-hidden py-2">
            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

            <div className="flex w-max animate-marquee-slow">
                {duplicatedEvents.map((event, i) => (
                    <div key={i} className="w-[200px] shrink-0 px-2">
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                <div className="absolute bottom-2 left-3 right-3">
                                    <h4 className="text-[10px] font-bold text-white line-clamp-1">{event.title}</h4>
                                </div>
                            </div>
                            <div className="p-2 space-y-1">
                                <div className="flex items-center gap-1 text-[8px] text-white/40">
                                    <Calendar className="w-2.5 h-2.5" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[8px] text-white/40">
                                    <MapPin className="w-2.5 h-2.5" />
                                    <span className="line-clamp-1">{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
