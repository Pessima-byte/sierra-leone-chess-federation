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
import { Plus, UserPlus, User, Camera, Loader2 } from "lucide-react"
import { createMember, uploadImage } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateMemberDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadingImage(true)
        const formData = new FormData()
        formData.append("image", file)

        const result = await uploadImage(formData, "player")
        if (result.success && result.url) {
            setImageUrl(result.url)
            toast.success("Image uploaded")
        } else {
            toast.error(result.error || "Upload failed")
        }
        setUploadingImage(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        if (imageUrl) formData.set("image", imageUrl)
        const result = await createMember(formData)

        if (result.success) {
            toast.success("Member added successfully")
            setOpen(false)
            setImageUrl(null)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to add member")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 font-bold rounded-xl h-10 px-4">
                    <UserPlus className="w-4 h-4 mr-2" /> Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] sm:max-w-[450px] max-h-[85vh] overflow-y-auto bg-slate-950/90 border-white/10 text-white rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-3xl p-0 shadow-2xl no-scrollbar border-b-0">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 blur-3xl rounded-full"></div>

                <DialogHeader className="p-6 pb-3 border-b border-white/5 relative z-50 sticky top-0 bg-slate-950/95 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Personnel Registry</span>
                    </div>
                    <DialogTitle className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none">
                        Enlist <span className="text-blue-500">Member</span>
                    </DialogTitle>
                    <DialogDescription className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                        Integrating new operative into archives.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6 relative z-10">
                    {/* Image Upload Section */}
                    <div className="flex flex-col items-center gap-3 pb-2">
                        <div
                            className="relative group cursor-pointer w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-inner"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                                        <User className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">No Identification</span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center">
                                {uploadingImage ? (
                                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                ) : (
                                    <>
                                        <Camera className="w-4 h-4 text-blue-400 mb-1" />
                                        <span className="text-[6px] font-black uppercase tracking-tighter text-white">Upload Ident</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <input type="hidden" name="image" value={imageUrl || ""} />
                    </div>

                    {/* Identity Section */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">01 Identity</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="id" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Internal Signature</Label>
                                <Input id="id" name="id" placeholder="slcf-001" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="fideId" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">FIDE Identity (Opt)</Label>
                                <Input id="fideId" name="fideId" placeholder="123456" className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Combatant Name</Label>
                            <Input id="name" name="name" placeholder="Brian Kanu" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                        </div>
                    </div>

                    {/* Classification Section */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">02 Classification</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="title" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Rank / Title</Label>
                                <Select name="title" defaultValue="National Player">
                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs">
                                        <SelectValue placeholder="Select rank" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                        <SelectItem value="Grandmaster">Grandmaster</SelectItem>
                                        <SelectItem value="International Master">International Master</SelectItem>
                                        <SelectItem value="FIDE Master">FIDE Master</SelectItem>
                                        <SelectItem value="Candidate Master">Candidate Master</SelectItem>
                                        <SelectItem value="National Master">National Master</SelectItem>
                                        <SelectItem value="National Player">National Player</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="club" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Sector / Club</Label>
                                <Input id="club" name="club" placeholder="Freetown Chess Club" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Ratings Section */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">03 Tactical Ratings</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="rating" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Standard</Label>
                                <Input id="rating" name="rating" type="number" placeholder="1200" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="rapidRating" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Rapid</Label>
                                <Input id="rapidRating" name="rapidRating" type="number" placeholder="1200" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="blitzRating" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Blitz</Label>
                                <Input id="blitzRating" name="blitzRating" type="number" placeholder="1200" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                        </div>
                    </div>

                    {/* Deployment Section */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">04 Deployment</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="joined" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Join Date</Label>
                                <Input id="joined" name="joined" placeholder="JAN 2024" required className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="status" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Status</Label>
                                <Select name="status" defaultValue="Active">
                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-xl h-9 focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl backdrop-blur-xl">
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Tactical Briefing Section */}
                    <div className="space-y-3.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500/50">05 Tactical Briefing</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="bio" className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Mission Details (Opt)</Label>
                            <Textarea id="bio" name="bio" placeholder="Achievements, style, history..." className="bg-white/[0.03] border-white/10 rounded-xl min-h-[80px] focus:ring-1 focus:ring-blue-500/30 transition-all font-bold text-xs placeholder:text-slate-700" />
                        </div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-white/5 pb-6 sm:justify-center sticky bottom-0 bg-slate-950/95 backdrop-blur-2xl -mx-6 px-6 z-50">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] italic rounded-xl shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? "TRANSMITTING..." : "CONFIRM ENLISTMENT"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
