"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DeleteActionProps {
    id: string
    action: (id: string) => Promise<{ success?: boolean; error?: string }>
    title: string
    description?: string
}

export function DeleteAction({ id, action, title, description }: DeleteActionProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        setLoading(true)
        const result = await action(id)
        if (result.success) {
            toast.success(`${title} deleted`)
            router.refresh()
        } else {
            toast.error(result.error || `Failed to delete ${title}`)
        }
        setLoading(false)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[95vw] sm:max-w-[450px] bg-slate-950/90 border-white/10 text-white rounded-[2rem] md:rounded-[2.5rem] backdrop-blur-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[60px] rounded-full pointer-events-none"></div>

                <AlertDialogHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500 italic">Security Override Required</span>
                    </div>
                    <AlertDialogTitle className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Terminate <span className="text-red-500">{title}</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs font-medium text-slate-500 uppercase tracking-widest leading-relaxed">
                        {description || `System directive: Permanent removal of ${title} and associated metadata from the central hub. This process is irreversible.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                    <AlertDialogCancel className="h-12 flex-1 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                        Abort Mission
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="h-12 flex-1 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl uppercase tracking-[0.2em] text-[9px] transition-all active:scale-95 shadow-[0_10px_30px_rgba(220,38,38,0.2)]"
                    >
                        {loading ? "TERMINATING..." : "CONFIRM DELETION"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
