"use client"

import { useState } from "react"
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
import { Newspaper, Plus } from "lucide-react"
import { createNews } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateNewsDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await createNews(formData)

        if (result.success) {
            toast.success("Article published successfully")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to publish article")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 font-bold rounded-xl h-10 px-4">
                    <Plus className="w-4 h-4 mr-2" /> Publish News
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-slate-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">TRANSMIT NEW INTEL</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Publish a news article or announcement to the federation transmission feed.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Headline</Label>
                        <Input id="title" name="title" placeholder="National Championship Results Announced" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt" className="text-xs font-bold uppercase tracking-widest text-slate-400">Short Summary</Label>
                        <Input id="excerpt" name="excerpt" placeholder="A brief summary for the news feed card..." required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</Label>
                            <Select name="category" defaultValue="Tournament">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
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
                            <Label htmlFor="author" className="text-xs font-bold uppercase tracking-widest text-slate-400">Author</Label>
                            <Input id="author" name="author" placeholder="SLCF Media" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-slate-400">Publish Date</Label>
                            <Input id="date" name="date" placeholder="OCT 10, 2025" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="readTime" className="text-xs font-bold uppercase tracking-widest text-slate-400">Read Time</Label>
                            <Input id="readTime" name="readTime" placeholder="4 min read" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-slate-400">Main Content (Markdown supported)</Label>
                        <Textarea id="content" name="content" placeholder="Write the full body of the article here..." required className="bg-white/5 border-white/10 rounded-xl min-h-[150px]" />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <input type="checkbox" id="featured" name="featured" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-blue-600" />
                        <Label htmlFor="featured" className="text-sm font-medium text-slate-300">Feature this article on the homepage</Label>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                            {loading ? "TRANSMITTING..." : "PUBLISH TRANSMISSION"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
