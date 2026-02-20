import { getNewsArticleById } from "@/lib/queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const article = await getNewsArticleById(id)

    if (!article) {
        notFound()
    }

    const tags = article.tags.split(',')

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 pb-24 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full"></div>
            </div>

            <main className="container mx-auto px-4 pt-32 relative z-10 max-w-4xl">
                <Link href="/news" className="flex items-center gap-2 group mb-12 w-fit">
                    <div className="h-10 w-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                        <ChevronLeft className="w-5 h-5 text-slate-500 group-hover:text-white" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-white">News Archives</span>
                </Link>

                <div className="space-y-6 mb-12">
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">
                        {article.category} Update
                    </Badge>
                    <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Reporter</p>
                                <p className="text-sm font-black text-white uppercase">{article.author}</p>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-white/5 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Published</p>
                                <p className="text-sm font-black text-white uppercase">{article.date}</p>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-white/5 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Read Time</p>
                                <p className="text-sm font-black text-white uppercase">{article.readTime}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-[21/10] rounded-[2.5rem] overflow-hidden border border-white/10 mb-16 shadow-2xl">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                </div>

                <article className="max-w-none">
                    <p className="text-xl md:text-3xl font-medium leading-relaxed text-blue-400/90 mb-12 font-serif italic border-l-4 border-blue-500 pl-8">
                        {article.excerpt}
                    </p>
                    <div className="space-y-8 text-slate-300 text-lg md:text-xl font-medium leading-loose">
                        {article.content.split('\n').map((para: string, i: number) => (
                            para.trim() && <p key={i}>{para.trim()}</p>
                        ))}
                    </div>
                </article>

                <div className="mt-20 pt-12 border-t border-white/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block font-serif">Topic Markers</span>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="bg-slate-900 border-white/5 text-slate-400 hover:text-white transition-all rounded-lg font-bold uppercase text-[9px] tracking-widest px-3 py-1">
                                        #{tag.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="lg" className="rounded-xl border-white/5 bg-slate-900 h-12 hover:bg-slate-800 font-black text-[10px] uppercase tracking-widest">
                                <Bookmark className="w-4 h-4 mr-2" /> Save Story
                            </Button>
                            <Button size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-500 h-12 text-white font-black text-[10px] uppercase tracking-widest px-8">
                                <Share2 className="w-4 h-4 mr-2" /> Share Transmission
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
