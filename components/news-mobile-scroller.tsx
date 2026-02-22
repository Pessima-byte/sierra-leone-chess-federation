'use client'

import React from 'react'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

interface NewsArticle {
    id: string
    title: string
    date: string
    category: string
    image: string
    excerpt: string
}

export default function NewsMobileScroller({ articles }: { articles: NewsArticle[] }) {
    return (
        <div className="relative -mx-5 px-5 overflow-x-auto scrollbar-hide flex gap-4 snap-x snap-mandatory pb-4">
            {articles.map((article, i) => (
                <div
                    key={article.id}
                    className="min-w-[85vw] snap-center animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                >
                    <div className="relative bg-slate-900/40 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md">
                        <div className="relative h-48">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 rounded-full bg-blue-600/90 text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400/80 uppercase tracking-wider">
                                <Calendar className="w-3 h-3" />
                                {article.date}
                            </div>

                            <h3 className="text-xl font-black text-white leading-tight italic uppercase tracking-tight line-clamp-2">
                                {article.title}
                            </h3>

                            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                {article.excerpt}
                            </p>

                            <div className="pt-2">
                                <div className="w-full h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group active:bg-blue-600 transition-colors">
                                    Read Full Story <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
