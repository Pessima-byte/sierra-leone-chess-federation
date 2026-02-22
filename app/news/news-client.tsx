"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    Search,
    Calendar,
    User,
    Clock,
    ArrowRight,
    Share2,
    Sparkles,
    Bookmark,
    TrendingUp,
    Filter,
    Newspaper
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { type NewsArticle } from "@/lib/news-data"
import { toast } from "sonner"
export default function NewsClient({ initialNews }: { initialNews: NewsArticle[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filteredArticles = useMemo(() => {
        return initialNews.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesSearch
        })
    }, [searchQuery, initialNews])

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const featuredArticle = initialNews.find(a => a.featured) || initialNews[0]

    const handleSubscribe = () => {
        toast.success("Subscribed to the News Feed", {
            description: "You'll receive the latest federation updates.",
        })
    }

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 pb-24 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
            </div>

            <main className="container mx-auto px-4 pt-20 relative z-10">
                {/* Impressive Centralized News Header */}
                <div className="relative flex flex-col items-center justify-center text-center space-y-4 mb-16">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

                    <div className="relative space-y-3">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1 text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md">
                                Federation Newsroom
                            </Badge>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-emerald-400 to-emerald-600 font-serif italic pr-2">Transmissions</span>
                        </h1>

                        <div className="flex items-center justify-center gap-3 text-slate-500 text-[9px] font-bold uppercase tracking-widest pt-2">
                            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                            <span>Broadcasting Live from Freetown Command</span>
                            <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-6"></div>
                </div>

                {/* Hero Featured News - Compressed Split Layout */}
                {!searchQuery && currentPage === 1 && (
                    <section className="mb-16 group">
                        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-700 hover:border-blue-500/30">
                            <div className="grid lg:grid-cols-2">
                                <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent lg:hidden"></div>
                                </div>
                                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                                    <div className="flex items-center gap-4">
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest">
                                            Priority Story
                                        </Badge>
                                        <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" /> {featuredArticle.readTime}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="text-base text-slate-400 font-medium leading-relaxed line-clamp-2 md:line-clamp-3">
                                        {featuredArticle.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                                <User className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Author</p>
                                                <p className="text-xs font-black text-white uppercase">{featuredArticle.author}</p>
                                            </div>
                                        </div>
                                        <Link href={`/news/${featuredArticle.id}`}>
                                            <Button className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest h-11 px-6 shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                                                Read More <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* News Grid */}
                {paginatedArticles.length > 0 ? (
                    <div className="space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {paginatedArticles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                Page <span className="text-white">{currentPage}</span> / <span className="text-white">{totalPages}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="h-10 px-4 rounded-lg font-bold text-[11px] uppercase tracking-widest disabled:opacity-30 hover:bg-white/5"
                                >
                                    Previous
                                </Button>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`h-10 w-10 rounded-lg font-black text-[11px] transition-all ${currentPage === i + 1 ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="h-10 px-4 rounded-lg font-bold text-[11px] uppercase tracking-widest disabled:opacity-30 hover:bg-white/5"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-32 text-center rounded-[2.5rem] bg-slate-900/20 border border-dashed border-white/10">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Newspaper className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase">No articles matched your search</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your search criteria or reset the terminal.</p>
                        <Button
                            variant="link"
                            className="text-blue-400 font-black mt-4 uppercase tracking-widest text-[11px]"
                            onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                        >
                            Reset Terminal
                        </Button>
                    </div>
                )}
            </main>
        </div>
    )
}

function NewsCard({ article }: { article: NewsArticle }) {
    return (
        <Link href={`/news/${article.id}`} className="group block h-full">
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] flex flex-col h-full backdrop-blur-xl">
                <div className="relative h-56 overflow-hidden">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-950/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-full py-1.5 px-3">
                            {article.category}
                        </Badge>
                    </div>
                </div>

                <div className="p-8 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2" suppressHydrationWarning>
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            {article.readTime}
                        </div>
                    </div>

                    <h3 className="text-xl font-black leading-tight uppercase tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-3">
                        {article.excerpt}
                    </p>

                    <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{article.author}</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
