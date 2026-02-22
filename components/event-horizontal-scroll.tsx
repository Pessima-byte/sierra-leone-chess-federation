'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

interface Event {
    title: string
    image: string
    date: string
    location: string
}

export default function EventHorizontalScroll({ events }: { events: Event[] }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide snap-x">
            {events.map((event, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="min-w-[280px] snap-start group/card relative"
                >
                    <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-slate-950/40 backdrop-blur-md transition-all duration-500 group-hover/card:border-blue-500/30">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                        </div>
                        <div className="p-5 space-y-3">
                            <h4 className="text-sm font-bold text-white line-clamp-1 group-hover/card:text-blue-400 transition-colors uppercase tracking-tight">
                                {event.title}
                            </h4>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[10px] text-white/40 font-medium flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {event.date}
                                    </p>
                                    <p className="text-[10px] text-white/40 font-medium flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {event.location}
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/card:bg-blue-500 group-hover/card:border-blue-400 group-hover/card:text-slate-950 transition-all">
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
