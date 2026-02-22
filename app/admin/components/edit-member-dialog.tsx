"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
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
import { Pencil, Camera, Upload, X, User, Trophy, Shield, Calendar } from "lucide-react"
import { updateMember, uploadPlayerImage } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Member {
    id: string
    name: string
    title: string
    rating: number
    rapidRating: number
    blitzRating: number
    club: string
    status: string
    joined: string
    fideId?: string | null
    bio?: string | null
    image?: string | null
}

export function EditMemberDialog({ member }: { member: Member }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(member.image ?? null)
    const [imageUrl, setImageUrl] = useState<string>(member.image ?? "")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setPreviewUrl(URL.createObjectURL(file))
        setUploadingImage(true)
        const fd = new FormData()
        fd.append("image", file)
        const result = await uploadPlayerImage(fd)
        if (result.success && result.url) {
            setImageUrl(result.url)
            setPreviewUrl(result.url)
            toast.success("Image uploaded")
        } else {
            toast.error(result.error || "Upload failed")
            setPreviewUrl(member.image ?? null)
        }
        setUploadingImage(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        formData.set("image", imageUrl)
        const result = await updateMember(member.id, formData)
        if (result.success) {
            toast.success("Member profile updated")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to update member")
        }
        setLoading(false)
    }

    const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-slate-950/90 border-white/10 text-white rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl p-0 shadow-2xl no-scrollbar border-b-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>

                <DialogHeader className="p-6 pb-3 border-b border-white/5 relative z-50 sticky top-0 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Personnel Modification</span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Update <span className="text-blue-500">Operative</span>
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                        Modifying briefing for: <span className="text-white font-black">{member.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Avatar / Bio Column */}
                        <div className="lg:w-48 space-y-6 flex-shrink-0">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Profile Signature</span>
                                </div>
                                <div
                                    className="relative group cursor-pointer aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-inner"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                            <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                                <User className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">No Signal</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                                        {uploadingImage ? (
                                            <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Camera className="w-5 h-5 text-blue-400 mb-1" />
                                                <span className="text-[8px] font-black text-white uppercase tracking-widest">Update Asset</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-8 text-[8px] font-black bg-white/[0.03] border-white/10 hover:bg-blue-600 hover:text-white transition-all rounded-lg uppercase tracking-widest"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        disabled={!previewUrl}
                                        onClick={() => { setPreviewUrl(null); setImageUrl("") }}
                                        className="h-8 text-[8px] font-black text-slate-500 hover:text-red-400 transition-all rounded-lg uppercase tracking-widest"
                                    >
                                        Purge
                                    </Button>
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">Mission Log</span>
                                </div>
                                <Textarea
                                    name="bio"
                                    defaultValue={member.bio ?? ""}
                                    placeholder="Briefing details..."
                                    className="bg-white/[0.03] border-white/10 rounded-xl min-h-[140px] text-xs font-bold leading-relaxed focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Fields Column */}
                        <div className="flex-1 space-y-6 min-w-0">
                            {/* 01 Identity */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">01 Identity</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Internal Signature</Label>
                                        <Input name="memberId" defaultValue={member.id} required className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">FIDE Identity</Label>
                                        <Input name="fideId" defaultValue={member.fideId ?? ""} placeholder="Opt" className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs" />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Operative Name</Label>
                                        <Input name="name" defaultValue={member.name} required className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* 02 Classification */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/50">02 Classification</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Rank / Title</Label>
                                        <Select name="title" defaultValue={member.title}>
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                {["Grandmaster", "International Master", "FIDE Master", "Candidate Master", "National Master", "National Player", "None"].map(t => (
                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Sector / Club</Label>
                                        <Input name="club" defaultValue={member.club} required className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* 03 Tactical Ratings */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500/50">03 Tactical Ratings</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-[7px] font-black uppercase tracking-[0.2em] text-blue-400 ml-1">Std</Label>
                                        <Input name="rating" type="number" defaultValue={member.rating} className="bg-white/[0.03] border-white/10 rounded-lg h-9 focus:ring-1 focus:ring-blue-500/30 font-black text-center text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[7px] font-black uppercase tracking-[0.2em] text-emerald-400 ml-1">Rapid</Label>
                                        <Input name="rapidRating" type="number" defaultValue={member.rapidRating} className="bg-white/[0.03] border-white/10 rounded-lg h-9 focus:ring-1 focus:ring-emerald-500/30 font-black text-center text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[7px] font-black uppercase tracking-[0.2em] text-purple-400 ml-1">Blitz</Label>
                                        <Input name="blitzRating" type="number" defaultValue={member.blitzRating} className="bg-white/[0.03] border-white/10 rounded-lg h-9 focus:ring-1 focus:ring-purple-500/30 font-black text-center text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* 04 Deployment Status */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500/50">04 Deployment</span>
                                    <div className="flex-1 h-px bg-white/5"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Operational State</Label>
                                        <Select name="status" defaultValue={member.status}>
                                            <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                                <SelectItem value="Suspended">Suspended</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Join Date</Label>
                                        <Input name="joined" defaultValue={member.joined} required className="bg-white/[0.03] border-white/10 rounded-xl h-10 focus:ring-1 focus:ring-blue-500/30 font-bold text-xs" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading || uploadingImage}
                                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] italic rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                            >
                                {loading ? "SYNCHRONIZING..." : "PUSH MODIFICATIONS"}
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const ic = "bg-white/5 border border-white/10 rounded-lg h-9 text-white placeholder-slate-600 focus:border-blue-500/60 focus:ring-0 transition-colors text-sm"

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            {icon}
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">{label}</span>
            <div className="flex-1 h-px bg-white/5" />
        </div>
    )
}

function F({ label, accent, span, children }: { label: string; accent?: string; span?: boolean; children: React.ReactNode }) {
    return (
        <div className={`space-y-1 ${span ? "col-span-1" : ""}`}>
            <Label className={`text-[9px] font-black uppercase tracking-widest ${accent ?? "text-slate-500"}`}>{label}</Label>
            {children}
        </div>
    )
}
