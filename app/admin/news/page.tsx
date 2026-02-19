import { getNews } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreHorizontal } from "lucide-react"

export default async function AdminNews() {
    const news = await getNews()

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic tracking-tight">TRANSMISSION CONTROL</h1>
                <Button className="bg-blue-600 hover:bg-blue-500 font-bold rounded-xl h-10 px-4">
                    <Plus className="w-4 h-4 mr-2" /> Publish News
                </Button>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="relative w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search transmissions..."
                            className="w-full h-9 pl-9 pr-4 bg-slate-950 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing {news.length} articles
                    </div>
                </div>
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
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
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
