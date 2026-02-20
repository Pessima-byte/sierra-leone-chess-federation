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
    const [activeCategory, setActiveCategory] = useState<'all' | 'Tournament' | 'Federation' | 'International' | 'Training'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const filteredArticles = useMemo(() => {
        return initialNews.filter(article => {
            const matchesCategory = activeCategory === 'all' || article.category === activeCategory
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesCategory && matchesSearch
        })
    }, [activeCategory, searchQuery, initialNews])

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const featuredArticle = initialNews.find(a => a.featured) || initialNews[0]

    const handleSubscribe = () => {
        toast.success("Broadcast Scheduled", {
            description: "You are now subscribed to the SLCF News Terminal.",
            className: "bg-slate-900 border-white/10 text-white",
        })
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white pb-24 overflow-x-hidden uppercase">
            {/* Futuristic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow animation-delay-2000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl italic">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors hidden sm:block">Back to Home</span>
                        </Link>

                        <Link href="/" className="flex items-center gap-3 group border-l border-white/10 pl-6">
                            <div className="relative w-10 h-10">
                                <div className="absolute inset-0 bg-blue-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative w-full h-full bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/images/logo.png"
                                        alt="SLCF Logo"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-xl leading-none not-italic">SLCF</span>
                                <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] not-italic">News Terminal</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
                            <Input
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="pl-10 h-10 w-48 lg:w-64 bg-white/5 border-white/10 rounded-xl focus:ring-blue-500/50 transition-all focus:w-80 font-bold placeholder:italic"
                            />
                        </div>
                        <Button
                            onClick={handleSubscribe}
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hidden sm:flex font-black uppercase text-[10px] tracking-widest italic"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 pt-32 relative z-10">
                {/* Hero Featured News */}
                {!searchQuery && activeCategory === 'all' && currentPage === 1 && (
                    <section className="mb-20">
                        <div className="relative group cursor-pointer overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900/40 backdrop-blur-3xl aspect-[21/9]">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <Badge className="bg-blue-600 hover:bg-blue-600 text-white font-black uppercase tracking-widest px-4 py-1 rounded-full italic">
                                        Featured Story
                                    </Badge>
                                    <span className="text-xs font-black text-white/60 flex items-center gap-2 italic">
                                        <Clock className="w-4 h-4" /> {featuredArticle.readTime}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter italic uppercase group-hover:text-blue-400 transition-colors">
                                    {featuredArticle.title}
                                </h1>
                                <p className="text-lg text-white/70 line-clamp-2 mb-8 max-w-2xl normal-case font-medium">
                                    {featuredArticle.excerpt}
                                </p>
                                <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-slate-950 font-black hover:bg-blue-500 hover:text-white transition-all uppercase italic tracking-widest">
                                    Read Full Transmission <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* News Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 italic">
                    <div className="flex flex-wrap items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                        {['all', 'Tournament', 'Federation', 'International', 'Training'].map((cat) => (
                            <Button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat as any)
                                    setCurrentPage(1)
                                }}
                                variant={activeCategory === cat ? 'default' : 'ghost'}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest h-10 transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : 'text-muted-foreground'}`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => toast.info("Displaying Trending Transmissions", { className: "bg-slate-900 border-white/10 text-white" })}
                            variant="outline"
                            className="h-12 px-6 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest"
                        >
                            <TrendingUp className="w-4 h-4 mr-2 text-blue-400" /> Viral
                        </Button>
                        <Button
                            onClick={() => toast.info("Accessing Saved Encrypts", { className: "bg-slate-900 border-white/10 text-white" })}
                            variant="outline"
                            className="h-12 px-6 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest"
                        >
                            <Bookmark className="w-4 h-4 mr-2 text-purple-400" /> Saved
                        </Button>
                    </div>
                </div>

                {/* News Grid */}
                {paginatedArticles.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedArticles.map((article) => (
                                <NewsCard key={article.id} article={article} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-20 p-8 bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-[3rem] flex items-center justify-between shadow-2xl italic">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                Transmission Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="h-11 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest disabled:opacity-30"
                                >
                                    Previous
                                </Button>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <Button
                                            key={i + 1}
                                            onClick={() => setCurrentPage(i + 1)}
                                            variant="ghost"
                                            className={`h-11 w-11 rounded-xl font-black text-[10px] transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-2 ring-blue-500/20' : 'text-muted-foreground hover:bg-white/5'}`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="h-11 rounded-xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest disabled:opacity-30"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/5 italic">
                        <Newspaper className="w-16 h-16 text-white/10 mx-auto mb-6" />
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">No transmissions found</h3>
                        <p className="text-muted-foreground normal-case font-medium">Adjust your filters or search query to find more news.</p>
                        <Button
                            variant="link"
                            className="text-blue-400 font-black mt-4 uppercase tracking-[0.2em] text-[10px]"
                            onClick={() => { setActiveCategory('all'); setSearchQuery(""); setCurrentPage(1); }}
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
        <Link href={`/news/${article.id}`}>
            <Card className="group relative bg-slate-900/40 border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] backdrop-blur-xl cursor-pointer h-full">
                <div className="relative h-60 overflow-hidden">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    <div className="absolute top-6 left-6">
                        <Badge className="bg-white/10 backdrop-blur-md border-white/10 text-[10px] font-black uppercase tracking-widest rounded-full py-1.5 px-3 italic">
                            {article.category}
                        </Badge>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase italic">
                            <Calendar className="w-3 h-3 text-blue-400" />
                            {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase italic">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {article.readTime}
                        </div>
                    </div>
                </div>

                <CardContent className="p-8">
                    <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2 italic">
                        {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-8 normal-case font-medium opacity-70">
                        {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {article.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-blue-400/60 transition-colors group-hover:text-blue-400 italic">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5 italic">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                <User className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{article.author}</span>
                        </div>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                toast.success("Broadcast Shared", { description: "Link copied to clipboard.", className: "bg-slate-900 border-white/10 text-white" })
                            }}
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-blue-600/20 text-muted-foreground hover:text-blue-400 transition-all"
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
