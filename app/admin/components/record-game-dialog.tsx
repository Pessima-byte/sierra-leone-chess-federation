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
            <DialogContent className="w-[95vw] sm:max-w-[550px] max-h-[85vh] overflow-y-auto bg-slate-950/90 border-white/10 text-white rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl p-0 shadow-2xl no-scrollbar border-b-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>

                <DialogHeader className="p-6 pb-3 border-b border-white/5 relative z-50 sticky top-0 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Combat Certification</span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Log <span className="text-blue-500">Conflict</span>
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                        Validating match outcome for ranking.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6 relative z-10">
                    {/* 01 Opponents */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">01 Operatives</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-50 relative pl-3 after:content-[''] after:absolute after:left-0.5 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:bg-white after:rounded-full">White</Label>
                                <Select name="whiteId" required>
                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                        <SelectValue placeholder="Select operative" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                        {members.map(member => (
                                            <SelectItem key={member.id} value={member.id} className="font-bold text-xs">{member.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-50 relative pl-3 after:content-[''] after:absolute after:left-0.5 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:bg-slate-950 after:rounded-full after:border after:border-white">Black</Label>
                                <Select name="blackId" required>
                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                        <SelectValue placeholder="Select operative" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                        {members.map(member => (
                                            <SelectItem key={member.id} value={member.id} className="font-bold text-xs">{member.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* 02 Outcome */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/50">02 Outcome</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="result" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Terminal Result</Label>
                                <Select name="result" defaultValue="1-0">
                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-black italic text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                        <SelectItem value="1-0" className="font-black text-xs">1-0 (White Victorious)</SelectItem>
                                        <SelectItem value="0-1" className="font-black text-xs">0-1 (Black Victorious)</SelectItem>
                                        <SelectItem value="1/2-1/2" className="font-black text-slate-400 text-xs">1/2-1/2 (Draw)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="date" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Archive Date</Label>
                                <Input id="date" name="date" placeholder="OCT 20" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* 03 Operational Context */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500/50">03 Operational Context</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="event" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Mission Deployment</Label>
                            <Input id="event" name="event" placeholder="Event Name" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold italic text-xs" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-8 space-y-1.5">
                                <Label htmlFor="moves" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Combat Logs (PGN)</Label>
                                <Input id="moves" name="moves" placeholder="1. e4 e5..." className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-medium text-xs" />
                            </div>
                            <div className="md:col-span-4 space-y-1.5">
                                <Label htmlFor="ratingChange" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 italic">Impact</Label>
                                <Input id="ratingChange" name="ratingChange" type="number" placeholder="+12" className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-black text-blue-400 text-center text-xs" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-white/5 pb-6 sm:justify-center sticky bottom-0 bg-slate-950/95 backdrop-blur-2xl -mx-6 px-6 z-50">
                        <div className="flex w-full gap-3">
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-11 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] border border-white/5 text-slate-500 transition-all">
                                Abort
                            </Button>
                            <Button type="submit" disabled={loading} className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black h-11 rounded-xl shadow-[0_10px_40px_rgba(37,99,235,0.3)] uppercase tracking-[0.2em] text-[10px] transition-all active:scale-[0.98] italic">
                                {loading ? "VALIDATING..." : "CERTIFY MATCH"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
