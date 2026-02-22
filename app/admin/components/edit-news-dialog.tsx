"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Pencil, Upload, Image as ImageIcon, X, Loader2 } from "lucide-react"
import { updateNews, uploadImage } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface NewsArticle {
    id: string
    title: string
    excerpt: string
    content: string
    category: string
    author: string
    date: string
    readTime: string
    tags: string
    featured: boolean
    image: string
}

export function EditNewsDialog({ article }: { article: NewsArticle }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(article.image || null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("image", file)

        const result = await uploadImage(formData, "news")
        if (result.success && result.url) {
            setImageUrl(result.url)
            toast.success("Image uploaded")
        } else {
            toast.error(result.error || "Upload failed")
        }
        setUploading(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        if (imageUrl) {
            formData.set("image", imageUrl)
        }

        const result = await updateNews(article.id, formData)

        if (result.success) {
            toast.success("Article updated successfully")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to update article")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-slate-950/90 border-white/10 text-white rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl p-0 shadow-2xl no-scrollbar border-b-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>

                <DialogHeader className="p-6 pb-3 border-b border-white/5 relative z-50 sticky top-0 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Intel Revision</span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Edit <span className="text-blue-500">Dispatch</span>
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                        Updating the central news transmission.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Media Section (Left on Desktop) */}
                        <div className="lg:col-span-12 xl:col-span-4 space-y-5">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Transmission Visual</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative aspect-video rounded-2xl bg-slate-950 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden group shadow-2xl"
                                >
                                    {imageUrl ? (
                                        <>
                                            <Image src={imageUrl} alt="Preview" fill className="object-cover grayscale group-hover:grayscale-0" />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 border border-white/10 text-white hover:bg-red-500 z-20"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500">
                                            {uploading ? (
                                                <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-6 h-6 opacity-20" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">Inject Media</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Parameters</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="category" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Category</Label>
                                        <Select name="category" required defaultValue={article.category}>
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                <SelectItem value="Tournament">Tournament</SelectItem>
                                                <SelectItem value="Federation">Federation</SelectItem>
                                                <SelectItem value="Global">Global</SelectItem>
                                                <SelectItem value="Announcement">Announcement</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="readTime" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Weight</Label>
                                        <Input id="readTime" name="readTime" defaultValue={article.readTime} required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold uppercase text-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Section (Right on Desktop) */}
                        <div className="lg:col-span-12 xl:col-span-8 space-y-6">
                            {/* 01 Sector Headline */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">01 Tactical Headline</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Headline</Label>
                                    <Input id="title" name="title" defaultValue={article.title} required className="bg-white/[0.03] border-white/10 rounded-xl h-10 font-black uppercase italic focus:ring-1 focus:ring-blue-500/30 text-blue-400 text-xs" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="excerpt" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Brief Intel</Label>
                                    <Input id="excerpt" name="excerpt" defaultValue={article.excerpt} required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-slate-300 text-xs" />
                                </div>
                            </div>

                            {/* 02 Intel Feed */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500/50">02 Intel Feed</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="content" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Transmission (Markdown)</Label>
                                    <Textarea id="content" name="content" defaultValue={article.content} required className="bg-white/[0.03] border-white/10 rounded-xl min-h-[180px] text-xs font-medium leading-relaxed resize-none focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700 p-4" />
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="author" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Entity</Label>
                                    <Input id="author" name="author" defaultValue={article.author} required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="date" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Archive</Label>
                                    <Input id="date" name="date" defaultValue={article.date} required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Promotion Protocol</span>
                                </div>
                                <input
                                    type="checkbox"
                                    id={`featured-${article.id}`}
                                    name="featured"
                                    defaultChecked={article.featured}
                                    className="w-6 h-6 rounded-lg border-white/10 bg-slate-950 accent-blue-500 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-white/5 pb-6 sm:justify-center sticky bottom-0 bg-slate-950/95 backdrop-blur-2xl -mx-6 px-6 z-50">
                        <div className="flex w-full gap-3">
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-11 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] border border-white/5 text-slate-500 transition-all">
                                Abort
                            </Button>
                            <Button type="submit" disabled={loading || uploading} className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black h-11 rounded-xl shadow-[0_10px_40px_rgba(37,99,235,0.3)] uppercase tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] italic">
                                {loading ? "UPDATING..." : "UPDATE TRANSMISSION"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
