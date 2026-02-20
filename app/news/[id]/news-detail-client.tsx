"use client"

import { toast } from "sonner"
import { Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NewsDetailClient({ title }: { title: string }) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'SLCF News Transmission',
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Transmission link copied to clipboard!')
        }
    }

    const handleSave = () => {
        toast.info("Secure Archiving...", {
            description: "Intel saved to your local terminal vault.",
            className: "bg-slate-900 border-white/10 text-white",
        })
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-black uppercase text-[10px] tracking-widest italic"
            >
                <Bookmark className="w-4 h-4 mr-2" /> Save Intel
            </Button>
            <Button
                onClick={handleShare}
                size="sm"
                className="rounded-xl bg-blue-600 hover:bg-blue-500 font-black uppercase text-[10px] tracking-widest italic"
            >
                <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
        </div>
    )
}
