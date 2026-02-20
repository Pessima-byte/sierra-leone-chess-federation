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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Trophy, Swords } from "lucide-react"
import { recordGame } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Member {
    id: string
    name: string
}

export function RecordGameDialog({ members }: { members: Member[] }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await recordGame(formData)

        if (result.success) {
            toast.success("Game result recorded")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to record result")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold h-10 px-4">
                    <Swords className="w-4 h-4 mr-2" /> Record Match
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">RECORD MATCH RESULT</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Submit the official result of a federation-sanctioned match.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">White Player</Label>
                            <Select name="whiteId" required>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select player" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    {members.map(member => (
                                        <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Black Player</Label>
                            <Select name="blackId" required>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select player" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    {members.map(member => (
                                        <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="result" className="text-xs font-bold uppercase tracking-widest text-slate-400">Result (W-D-L)</Label>
                            <Select name="result" defaultValue="1-0">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select result" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="1-0">1-0 (White wins)</SelectItem>
                                    <SelectItem value="0-1">0-1 (Black wins)</SelectItem>
                                    <SelectItem value="1/2-1/2">1/2-1/2 (Draw)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-slate-400">Match Date</Label>
                            <Input id="date" name="date" placeholder="OCT 20, 2025" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="event" className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Context</Label>
                        <Input id="event" name="event" placeholder="Freetown Open - Round 4" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="moves" className="text-xs font-bold uppercase tracking-widest text-slate-400">PGN / Moves (Optional)</Label>
                        <Input id="moves" name="moves" placeholder="1. e4 e5 2. Nf3 Nc6..." className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ratingChange" className="text-xs font-bold uppercase tracking-widest text-slate-400">Rating Impact (Optional)</Label>
                        <Input id="ratingChange" name="ratingChange" type="number" placeholder="+12" className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                            {loading ? "RECORDING..." : "LOG OFFICIAL RESULT"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
