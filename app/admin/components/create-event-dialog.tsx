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
import { Plus, Upload, Image as ImageIcon, X, Loader2 } from "lucide-react"
import { createEvent, uploadImage } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CreateEventDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("image", file)

        const result = await uploadImage(formData, "event")
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

        const result = await createEvent(formData)

        if (result.success) {
            toast.success("Event created successfully")
            setOpen(false)
            setImageUrl(null)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to create event")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 font-bold rounded-xl h-10 px-4 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                    <Plus className="w-4 h-4 mr-2" /> CREATE EVENT
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[650px] max-h-[85vh] overflow-y-auto bg-slate-950/90 border-white/10 text-white rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl p-0 shadow-2xl no-scrollbar border-b-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>

                <DialogHeader className="p-6 pb-3 border-b border-white/5 relative z-50 sticky top-0 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Calendar Operations</span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Broadcast <span className="text-blue-500">Event</span>
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                        Initiating new strategic event insertion.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Media Section (Left on Desktop) */}
                        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Visual Asset</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative aspect-video rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden group shadow-inner"
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
                                                    <span className="text-[8px] font-black uppercase tracking-widest">Transmit Visual</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Classification</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="type" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Type</Label>
                                        <Select name="type" required defaultValue="Tournament">
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                <SelectItem value="Tournament">Tournament</SelectItem>
                                                <SelectItem value="International">International</SelectItem>
                                                <SelectItem value="Training">Training</SelectItem>
                                                <SelectItem value="Federation">Federation</SelectItem>
                                                <SelectItem value="Youth">Youth</SelectItem>
                                                <SelectItem value="Development">Development</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="level" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Level</Label>
                                        <Select name="level" required defaultValue="All Levels">
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                <SelectItem value="Professional">Professional</SelectItem>
                                                <SelectItem value="Advanced">Advanced</SelectItem>
                                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                <SelectItem value="Junior">Junior</SelectItem>
                                                <SelectItem value="All Levels">All Levels</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Section (Right on Desktop) */}
                        <div className="lg:col-span-12 xl:col-span-8 space-y-6">
                            {/* 01 tactical recon */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">01 Tactical Recon</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="title" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Command Headline</Label>
                                    <Input id="title" name="title" placeholder="Operation: Grandmaster Invitational" required className="bg-white/[0.03] border-white/10 rounded-xl h-10 font-black uppercase italic tracking-tight focus:ring-1 focus:ring-blue-500/30 text-blue-400 text-xs" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="date" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Execution Date</Label>
                                        <Input id="date" name="date" placeholder="MAR 20, 2026" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="time" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Time Signal</Label>
                                        <Input id="time" name="time" placeholder="10:00 AM" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* 02 logistics */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/50">02 Logistics</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="location" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Command Post</Label>
                                        <Input id="location" name="location" placeholder="Freetown" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="organizer" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Unit</Label>
                                        <Input id="organizer" name="organizer" placeholder="SLCF" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* 03 objectives */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500/50">03 Objectives</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="prizePool" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Bounty</Label>
                                        <Input id="prizePool" name="prizePool" placeholder="Le 25M" className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-black text-blue-400 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="entryFee" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access</Label>
                                        <Input id="entryFee" name="entryFee" placeholder="Free" className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-black text-emerald-400 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="status" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">State</Label>
                                        <Select name="status" defaultValue="Upcoming">
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                <SelectItem value="Upcoming">Upcoming</SelectItem>
                                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Planned">Planned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="description" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Briefing</Label>
                                    <Textarea id="description" name="description" placeholder="Specify tactical parameters..." required className="bg-white/[0.03] border-white/10 rounded-xl min-h-[100px] text-xs font-medium leading-relaxed resize-none focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700 p-4" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Registry Ready</span>
                                </div>
                                <input
                                    type="checkbox"
                                    id="registrationOpen"
                                    name="registrationOpen"
                                    defaultChecked={true}
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
                                {loading ? "SYNCHRONIZING..." : "PUBLISH TO TIMELINE"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
