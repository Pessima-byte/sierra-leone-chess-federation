import { getNewsArticleById } from "@/lib/queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsDetailClient } from "./news-detail-client"

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const article = await getNewsArticleById(id)

    if (!article) {
        notFound()
    }

    const tags = article.tags.split(',')

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white pb-24 overflow-x-hidden uppercase">
            {/* Nav */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl italic">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/news" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white">Back to Terminal</span>
                    </Link>
                    <NewsDetailClient title={article.title} />
                </div>
            </header>

            <main className="container mx-auto px-4 pt-32 relative z-10 max-w-4xl">
                <Badge className="bg-blue-600 mb-6 text-white font-black uppercase tracking-widest px-4 py-1.5 rounded-full italic">
                    {article.category} Transmission
                </Badge>
                <h1 className="text-4xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter italic uppercase">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-8 mb-12 py-8 border-y border-white/10 italic">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                            <User className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Dispatcher</span>
                            <span className="text-sm font-black text-white">{article.author}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Timestamp</span>
                            <span className="text-sm font-black text-white">{article.date}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest leading-none">Transfer Time</span>
                            <span className="text-sm font-black text-white">{article.readTime}</span>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 mb-16">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                </div>

                <div className="prose prose-invert prose-blue max-w-none">
                    <p className="text-xl md:text-2xl font-bold leading-relaxed text-blue-400 italic mb-10 normal-case">
                        {article.excerpt}
                    </p>
                    <div className="space-y-6 text-white/80 normal-case text-lg font-medium leading-loose">
                        {article.content.split('\n').map((para: string, i: number) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-12 border-t border-white/10 italic">
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-4 block">Key Intel Tags:</span>
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-all rounded-xl font-black uppercase text-[10px] tracking-widest px-4 py-1.5">
                                #{tag.trim()}
                            </Badge>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
