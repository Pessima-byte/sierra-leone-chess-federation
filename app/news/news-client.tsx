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

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 pb-24 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
            </div>

            {/* Mobile-Only Sticky Header Sub-Bar */}
            <div className="md:hidden sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 h-14 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Newspaper className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tighter">Intel Hub</span>
                </div>
                <div className="relative w-40">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 underline decoration-blue-500/50" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Intel..."
                        className="h-8 pl-8 bg-white/5 border-white/10 rounded-full text-[10px] font-bold focus:ring-blue-500/20"
                    />
                </div>
            </div>

            <main className="container mx-auto px-4 pt-10 md:pt-20 relative z-10">
                {/* Header (Preserved Desktop, Adjusted Mobile Styling) */}
                <div className="relative flex flex-col items-center justify-center text-center space-y-4 mb-12 md:mb-16">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

                    <div className="relative space-y-3">
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-md">
                                Federation Newsroom
                            </Badge>
                            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
                        </div>

                        <h1 className="text-[32px] md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight md:leading-none">
                            Latest <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-emerald-400 to-emerald-600 font-serif italic pr-2">Transmissions</span>
                        </h1>

                        <div className="flex items-center justify-center gap-3 text-slate-500 text-[8px] md:text-[9px] font-bold uppercase tracking-widest pt-1 md:pt-2">
                            <Sparkles className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                            <span>Broadcasting Live from Command Center</span>
                            <Sparkles className="w-2.5 h-2.5 text-blue-400 animate-pulse" />
                        </div>
                    </div>

                    <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-5 md:mt-6"></div>
                </div>

                {/* Hero Featured News - Responsive Toggles */}
                {!searchQuery && currentPage === 1 && (
                    <section className="mb-12 md:mb-16 group">
                        {/* Desktop Implementation (Original) */}
                        <div className="hidden md:block relative overflow-hidden rounded-[2rem] bg-slate-900/40 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-700 hover:border-blue-500/30">
                            <div className="grid lg:grid-cols-2">
                                <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent"></div>
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

                        {/* Mobile Implementation (Compressed Cinematic Style) */}
                        <div className="md:hidden">
                            <Link href={`/news/${featuredArticle.id}`} className="block group">
                                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900/60 border border-white/10 backdrop-blur-3xl shadow-2xl active:scale-[0.98] transition-all">
                                    {/* Image Section - Wide Cinematic */}
                                    <div className="relative aspect-[21/9] w-full overflow-hidden">
                                        <Image
                                            src={featuredArticle.image}
                                            alt="Featured"
                                            fill
                                            priority
                                            className="object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                                        <div className="absolute top-3 left-4">
                                            <Badge className="bg-blue-600/90 text-white border-none py-1 px-3 rounded-full text-[7px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md">Featured Intel</Badge>
                                        </div>
                                    </div>

                                    {/* Content Section - Compact & Sharp */}
                                    <div className="p-6 space-y-3.5">
                                        <div className="flex items-center gap-3 text-[9px] font-black text-blue-400/80 uppercase tracking-[0.15em]">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />
                                                <span>{featuredArticle.readTime}</span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-white/10"></div>
                                            <span>{featuredArticle.date}</span>
                                        </div>

                                        <h2 className="text-xl font-black tracking-tight leading-tight uppercase italic text-white line-clamp-2">
                                            {featuredArticle.title}
                                        </h2>

                                        <p className="text-[12px] text-slate-400 font-medium leading-relaxed line-clamp-2 opacity-80">
                                            {featuredArticle.excerpt}
                                        </p>

                                        <div className="pt-4 flex items-center justify-between border-t border-white/5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
                                                    <User className="w-3.5 h-3.5 text-slate-500" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">Reporter</span>
                                                    <span className="text-[9px] font-black text-white uppercase tracking-tight">{featuredArticle.author}</span>
                                                </div>
                                            </div>
                                            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-3 transition-transform">
                                                <ArrowRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* News Grid */}
                {paginatedArticles.length > 0 ? (
                    <div className="space-y-12 md:space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                            {paginatedArticles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* Pagination (Responsive) */}
                        <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                            <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                Page <span className="text-white">{currentPage}</span> / <span className="text-white">{totalPages}</span>
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="h-10 px-4 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest disabled:opacity-30 hover:bg-white/5"
                                >
                                    Previous
                                </Button>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => {
                                        // Mobile: Show only current and +/- 1 if many pages
                                        const isVisible = totalPages <= 5 || Math.abs(currentPage - (i + 1)) <= 1 || i === 0 || i === totalPages - 1;
                                        if (!isVisible) return <span key={i} className="px-1 text-slate-600 hidden md:block">.</span>;

                                        return (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`h-10 w-10 rounded-xl font-black text-[10px] md:text-[11px] transition-all ${currentPage === i + 1 ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        )
                                    })}
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="h-10 px-4 rounded-xl font-bold text-[10px] md:text-[11px] uppercase tracking-widest disabled:opacity-30 hover:bg-white/5"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-24 md:py-32 text-center rounded-[2.5rem] bg-slate-900/20 border border-dashed border-white/10">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Newspaper className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black mb-2 uppercase">No intelligence found</h3>
                        <p className="text-xs md:text-sm text-slate-500 font-medium">Reset the terminal or broaden your search parameters.</p>
                        <Button
                            variant="link"
                            className="text-blue-400 font-black mt-4 uppercase tracking-widest text-[10px]"
                            onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                        >
                            Refill Feed
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
            <div className="bg-slate-900/40 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] flex flex-col h-full backdrop-blur-xl group active:scale-[0.98] md:active:scale-100">
                <div className="relative aspect-[16/9] md:h-56 overflow-hidden">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-950/70 backdrop-blur-md border border-white/10 text-[7px] md:text-[9px] font-black uppercase tracking-widest rounded-full py-1 px-2.5">
                            {article.category}
                        </Badge>
                    </div>
                </div>

                <div className="p-5 md:p-8 flex flex-col flex-1 space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2" suppressHydrationWarning>
                            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-400" />
                            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
                            {article.readTime}
                        </div>
                    </div>

                    <h3 className="text-lg md:text-2xl font-black leading-tight uppercase tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2 md:italic">
                        {article.title}
                    </h3>

                    <p className="text-[12px] md:text-[13px] text-slate-400 font-medium leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">
                        {article.excerpt}
                    </p>

                    <div className="pt-4 md:pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center">
                                <User className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-400" />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{article.author}</span>
                        </div>
                        <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
