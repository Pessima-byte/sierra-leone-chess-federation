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
            <AlertDialogContent className="bg-slate-900 border-white/10 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-black uppercase italic tracking-wider">TERMINATE DATA</AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-400">
                        {description || `Are you sure you want to permanently delete this ${title}? This action cannot be reversed.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white font-bold">
                        {loading ? "TERMINATING..." : "CONFIRM DELETION"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
