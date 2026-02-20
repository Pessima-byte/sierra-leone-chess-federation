"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
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

            <DialogContent className="max-w-[820px] w-[95vw] p-0 bg-transparent border-0 shadow-none overflow-visible">
                <div className="relative bg-slate-900/98 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_80px_rgba(0,0,0,0.7)]">
                    {/* Top gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
                    {/* Glows */}
                    <div className="absolute top-0 right-0 w-80 h-48 bg-blue-600/8 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-60 h-40 bg-emerald-600/6 blur-[60px] pointer-events-none" />

                    <div className="relative z-10 p-6">
                        {/* Header */}
                        <DialogHeader className="mb-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <DialogTitle className="text-2xl font-black italic tracking-tight text-white">
                                        UPDATE PROFILE
                                    </DialogTitle>
                                    <p className="text-slate-500 text-xs font-medium mt-0.5">
                                        Editing: <span className="text-blue-400 font-bold">{member.name}</span>
                                    </p>
                                </div>
                            </div>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            {/* Two-column layout */}
                            <div className="flex gap-5">
                                {/* LEFT: Avatar + bio */}
                                <div className="flex flex-col gap-4 w-44 flex-shrink-0">
                                    {/* Avatar */}
                                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-3xl font-black text-blue-400">{initials}</span>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                            {uploadingImage ? (
                                                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Camera className="w-5 h-5 text-white" />
                                                    <span className="text-[10px] text-white font-bold">Change Photo</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-1.5">
                                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}
                                            className="flex-1 h-8 text-[10px] font-bold bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20 rounded-lg gap-1 px-2">
                                            <Upload className="w-3 h-3" /> Upload
                                        </Button>
                                        {previewUrl && (
                                            <Button type="button" variant="ghost" size="sm"
                                                onClick={() => { setPreviewUrl(null); setImageUrl("") }}
                                                className="h-8 w-8 p-0 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg flex-shrink-0">
                                                <X className="w-3.5 h-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                    <p className="text-[9px] text-slate-600 -mt-2 text-center">JPG / PNG / WEBP · 5MB max</p>

                                    {/* Bio stacked below avatar */}
                                    <div className="space-y-1 flex-1">
                                        <SectionLabel icon={<User className="w-3 h-3 text-slate-500" />} label="Bio" />
                                        <Textarea name="bio" defaultValue={member.bio ?? ""} placeholder="Achievements, style…"
                                            className="bg-white/5 border border-white/10 rounded-xl text-white text-xs placeholder-slate-600 focus:border-blue-500/60 resize-none h-[106px] leading-relaxed" />
                                    </div>

                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                                </div>

                                {/* RIGHT: All fields */}
                                <div className="flex-1 space-y-3 min-w-0">
                                    {/* Identity */}
                                    <div>
                                        <SectionLabel icon={<User className="w-3 h-3 text-blue-400" />} label="Identity" />
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            <F label="Internal ID"><Input name="memberId" defaultValue={member.id} required className={ic} /></F>
                                            <F label="FIDE ID"><Input name="fideId" defaultValue={member.fideId ?? ""} placeholder="Optional" className={ic} /></F>
                                            <F label="Full Name" span><Input name="name" defaultValue={member.name} required className={ic} /></F>
                                        </div>
                                    </div>

                                    {/* Classification */}
                                    <div>
                                        <SectionLabel icon={<Shield className="w-3 h-3 text-emerald-400" />} label="Classification" />
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <F label="Title">
                                                <Select name="title" defaultValue={member.title}>
                                                    <SelectTrigger className={ic}><SelectValue placeholder="Select…" /></SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl">
                                                        {["Grandmaster", "International Master", "FIDE Master", "Candidate Master", "CM", "WGM", "WIM", "WFM", "WCM", "National Master", "National Player", "None"].map(t => (
                                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </F>
                                            <F label="Chess Club"><Input name="club" defaultValue={member.club} required className={ic} /></F>
                                        </div>
                                    </div>

                                    {/* Ratings */}
                                    <div>
                                        <SectionLabel icon={<Trophy className="w-3 h-3 text-yellow-400" />} label="Ratings" />
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            <F label="Standard" accent="text-blue-400">
                                                <Input name="rating" type="number" min={0} defaultValue={member.rating} className={ic} />
                                            </F>
                                            <F label="Rapid" accent="text-emerald-400">
                                                <Input name="rapidRating" type="number" min={0} defaultValue={member.rapidRating} className={ic} />
                                            </F>
                                            <F label="Blitz" accent="text-purple-400">
                                                <Input name="blitzRating" type="number" min={0} defaultValue={member.blitzRating} className={ic} />
                                            </F>
                                        </div>
                                    </div>

                                    {/* Membership */}
                                    <div>
                                        <SectionLabel icon={<Calendar className="w-3 h-3 text-slate-400" />} label="Membership" />
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <F label="Status">
                                                <Select name="status" defaultValue={member.status}>
                                                    <SelectTrigger className={ic}><SelectValue /></SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl">
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </F>
                                            <F label="Join Date">
                                                <Input name="joined" defaultValue={member.joined} required className={ic} />
                                            </F>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button type="submit" disabled={loading || uploadingImage}
                                        className="mt-1 w-full relative h-11 rounded-xl font-black text-xs uppercase tracking-[0.15em] text-white overflow-hidden group transition-all disabled:opacity-50">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            {loading ? (
                                                <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
                                            ) : "Save Changes"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
