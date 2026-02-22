import { getNews } from "@/lib/queries"
import { Search } from "lucide-react"
import { CreateNewsDialog } from "../components/create-news-dialog"
import { EditNewsDialog } from "../components/edit-news-dialog"
import { DeleteAction } from "../components/delete-action"
import { deleteNews } from "@/app/actions/admin"

export default async function AdminNews() {
    const news = await getNews()

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tight">NEWS</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">{news.length} articles published</p>
                </div>
                <CreateNewsDialog />
            </div>

            {/* Search Bar */}
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-3 md:rounded-2xl md:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="text-xs text-muted-foreground">
                    {news.length} articles
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-2">
                {news.map(article => (
                    <div key={article.id} className="bg-slate-900/40 border border-white/[0.06] rounded-xl p-3.5 space-y-2">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm text-white leading-tight line-clamp-2">{article.title}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-muted-foreground">{article.date}</span>
                                    <span className="text-[10px] text-muted-foreground">·</span>
                                    <span className="text-[10px] text-muted-foreground">{article.author}</span>
                                </div>
                            </div>
                            {article.featured ? (
                                <span className="shrink-0 bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase">Featured</span>
                            ) : (
                                <span className="shrink-0 bg-white/10 text-white/50 px-2 py-0.5 rounded text-[9px] font-bold uppercase">Standard</span>
                            )}
                        </div>

                        {/* Category + Actions */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <EditNewsDialog article={article as any} />
                                <DeleteAction id={article.id} action={deleteNews} title="News" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-950/50 text-muted-foreground uppercase text-[10px] font-black tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {news.map(article => (
                                <tr key={article.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        {article.featured ? (
                                            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase">Featured</span>
                                        ) : (
                                            <span className="bg-white/10 text-white/50 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Standard</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white max-w-[300px] truncate" title={article.title}>
                                        {article.title}
                                    </td>
                                    <td className="px-6 py-4">{article.date}</td>
                                    <td className="px-6 py-4">{article.author}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <EditNewsDialog article={article as any} />
                                        <DeleteAction id={article.id} action={deleteNews} title="News" />
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
