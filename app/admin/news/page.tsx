import { getNews } from "@/lib/queries"
import { Search, Newspaper } from "lucide-react"
import { CreateNewsDialog } from "../components/create-news-dialog"
import { EditNewsDialog } from "../components/edit-news-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteNews } from "@/app/actions/admin"

export default async function AdminNews() {
    const news = await getNews()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">News <span className="text-blue-500">Terminal</span></h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Dispatches in circulation: {news.length}</p>
                    </div>
                </div>
                <CreateNewsDialog />
            </div>

            {/* Search bar - Premium HUD Style */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-4 md:p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-colors"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="TERMINAL QUERY: SEARCH DISPATCHES..."
                            className="w-full h-14 pl-12 pr-6 bg-slate-950/50 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-4 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2">
                            <Newspaper className="w-4 h-4 text-blue-500/50" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">DISPATCH COUNT:</span>
                            <span className="text-[11px] font-bold text-blue-400 tabular-nums">{news.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {news.map(article => (
                    <div key={article.id} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 space-y-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3">
                            {article.featured ? (
                                <span className="bg-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.4)] text-white px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider">Promotion Active</span>
                            ) : (
                                <span className="bg-white/5 border border-white/10 text-slate-500 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider">Standard</span>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="text-[9px] font-black text-blue-500/50 uppercase tracking-[0.2em]">INTEL DISPATCH</div>
                            <h3 className="font-black text-lg text-white uppercase italic tracking-tighter leading-tight line-clamp-2">
                                {article.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{article.date}</span>
                                <div className="h-1 w-1 rounded-full bg-white/10"></div>
                                <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">{article.author}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-white/5 pt-4">
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">
                                CATEGORY: {article.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <EditNewsDialog article={article as any} />
                                <DeleteAction id={article.id} action={deleteNews} title="News" />
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
                                <th className="px-6 py-5 whitespace-nowrap italic">Priority</th>
                                <th className="px-6 py-5">Dispatch Headline</th>
                                <th className="px-6 py-5">Chronology</th>
                                <th className="px-6 py-5 text-center">Entity</th>
                                <th className="px-6 py-5">Tag</th>
                                <th className="px-6 py-5 text-right">Directives</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {news.map(article => (
                                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        {article.featured ? (
                                            <span className="bg-blue-600 shadow-lg text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">PROMOTED</span>
                                        ) : (
                                            <span className="bg-white/5 border border-white/10 text-slate-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">STANDARD</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 font-black text-xs text-white uppercase italic tracking-tight group-hover:text-blue-400 transition-colors max-w-[300px] truncate" title={article.title}>
                                        {article.title}
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-slate-400">{article.date}</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/50">{article.author}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="px-2 py-0.5 bg-white/5 border border-white/5 text-slate-500 text-[9px] font-black rounded uppercase tracking-widest">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right whitespace-nowrap">
                                        <div className="flex justify-end items-center gap-2">
                                            <EditNewsDialog article={article as any} />
                                            <DeleteAction id={article.id} action={deleteNews} title="News" />
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
