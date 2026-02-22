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
            <DialogContent className="sm:max-w-[900px] bg-slate-900 border-white/10 text-white rounded-[2rem] overflow-hidden p-0 gap-0">
                <div className="flex flex-col h-full max-h-[90vh]">
                    <DialogHeader className="p-8 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Pencil className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black italic tracking-tight uppercase">RE-ENCRYPT TRANSMISSION</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Update the content for the news transmission: {article.title}.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Core Identity */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border-b border-white/10 pb-2">Transmission Data</h3>

                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Headline</Label>
                                            <Input id="title" name="title" defaultValue={article.title} required className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="excerpt" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Short Summary</Label>
                                            <Input id="excerpt" name="excerpt" defaultValue={article.excerpt} required className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Category</Label>
                                                <Select name="category" defaultValue={article.category}>
                                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                        <SelectItem value="Tournament">Tournament</SelectItem>
                                                        <SelectItem value="Federation">Federation</SelectItem>
                                                        <SelectItem value="Training">Training</SelectItem>
                                                        <SelectItem value="Global">Global</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="author" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Author</Label>
                                                <Input id="author" name="author" defaultValue={article.author} required className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="date" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Publish Date</Label>
                                                <Input id="date" name="date" defaultValue={article.date} required className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="readTime" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Read Time</Label>
                                                <Input id="readTime" name="readTime" defaultValue={article.readTime} required className="bg-white/[0.03] border-white/10 rounded-xl h-11 font-medium" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Content & Media */}
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 border-b border-white/10 pb-2">Media & Content</h3>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Cover Image</Label>
                                        <div className="relative rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/50 transition-all overflow-hidden group">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            {imageUrl ? (
                                                <div className="relative aspect-video w-full">
                                                    <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <Button
                                                            type="button"
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="rounded-xl h-9"
                                                            disabled={uploading}
                                                        >
                                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                                            {uploading ? "Uploading..." : "Replace"}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => setImageUrl(null)}
                                                            className="rounded-xl h-9 w-9"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="aspect-video w-full flex flex-col items-center justify-center gap-2 cursor-pointer p-6"
                                                    onClick={() => fileInputRef.current?.click()}
                                                >
                                                    {uploading ? (
                                                        <>
                                                            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                                                            <span className="text-xs font-bold text-slate-400">Uploading to Secure Storage...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                                                                <ImageIcon className="w-5 h-5 text-blue-400" />
                                                            </div>
                                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Click to upload cover image</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 flex-1 flex flex-col">
                                        <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Main Content (Markdown supported)</Label>
                                        <Textarea id="content" name="content" defaultValue={article.content} required className="bg-white/[0.03] border-white/10 rounded-xl flex-1 min-h-[120px] font-medium leading-relaxed resize-y" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-6 border-t border-white/5 bg-slate-900/50 flex flex-row items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 pl-2">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id={`featured-${article.id}`} name="featured" defaultChecked={article.featured} className="w-4 h-4 rounded border-white/10 bg-white/5 accent-blue-600" />
                                    <Label htmlFor={`featured-${article.id}`} className="text-[11px] font-bold uppercase tracking-widest text-slate-400 cursor-pointer">Promoted Story</Label>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading || uploading} className="bg-blue-600 hover:bg-blue-500 text-white font-black h-12 px-8 rounded-xl uppercase tracking-widest shadow-lg shadow-blue-600/20 !mt-0 transition-all active:scale-95">
                                {loading ? "UPDATING..." : "CONFIRM UPDATE"}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
