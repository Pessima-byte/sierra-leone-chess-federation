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
            <DialogContent className="sm:max-w-[800px] bg-slate-900 border-white/10 text-white rounded-[2rem] overflow-hidden p-0 gap-0">
                <div className="flex flex-col h-full max-h-[90vh]">
                    <DialogHeader className="p-8 pb-4 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Plus className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black italic tracking-tight uppercase">NEW CALENDAR ENTRY</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Broadcast a new tournament or activity to the federation.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                {/* Left Column: Image & Basic Info */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Event Visual</Label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="relative aspect-video rounded-3xl bg-slate-950 border-2 border-dashed border-white/5 hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden group"
                                        >
                                            {imageUrl ? (
                                                <>
                                                    <Image src={imageUrl} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Upload className="w-8 h-8 text-white" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                                                        className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 border border-white/10 text-white hover:bg-red-500 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500">
                                                    {uploading ? (
                                                        <Loader2 className="w-8 h-8 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <ImageIcon className="w-8 h-8 opacity-20" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Upload Key Visual</span>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Event Title</Label>
                                            <Input id="title" name="title" placeholder="Freetown Open Masterclass" required className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold focus:border-blue-500/50" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Type</Label>
                                                <Select name="type" required>
                                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                                                        <SelectItem value="Tournament">Tournament</SelectItem>
                                                        <SelectItem value="International">International</SelectItem>
                                                        <SelectItem value="Training">Training</SelectItem>
                                                        <SelectItem value="Federation">Federation</SelectItem>
                                                        <SelectItem value="Youth">Youth</SelectItem>
                                                        <SelectItem value="Development">Development</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="level" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Level</Label>
                                                <Select name="level" required>
                                                    <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold">
                                                        <SelectValue placeholder="Level" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                                                        <SelectItem value="Professional">Professional</SelectItem>
                                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                                        <SelectItem value="Junior">Junior</SelectItem>
                                                        <SelectItem value="All Levels">All Levels</SelectItem>
                                                        <SelectItem value="Members Only">Members Only</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Logistics & Metadata */}
                                <div className="lg:col-span-7 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Date</Label>
                                            <Input id="date" name="date" placeholder="MAR 20, 2026" required className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="time" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Time</Label>
                                            <Input id="time" name="time" placeholder="10:00 AM" required className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Location</Label>
                                            <Input id="location" name="location" placeholder="Atlantic Hotel Freetown" required className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="organizer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Organizer</Label>
                                            <Input id="organizer" name="organizer" placeholder="SLCF Committee" required className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Event Brief</Label>
                                        <Textarea id="description" name="description" placeholder="Specify event details, registration rules, and prize breakdowns..." required className="bg-white/[0.03] border-white/10 rounded-2xl min-h-[100px] font-medium leading-relaxed" />
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 items-end">
                                        <div className="col-span-3 space-y-2">
                                            <Label htmlFor="prizePool" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Prize Pool</Label>
                                            <Input id="prizePool" name="prizePool" placeholder="No Prize" className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                        <div className="col-span-3 space-y-2">
                                            <Label htmlFor="entryFee" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Entry Fee</Label>
                                            <Input id="entryFee" name="entryFee" placeholder="Free" className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold" />
                                        </div>
                                        <div className="col-span-3 space-y-2">
                                            <Label htmlFor="status" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</Label>
                                            <Select name="status" defaultValue="Upcoming">
                                                <SelectTrigger className="bg-white/[0.03] border-white/10 rounded-2xl h-12 font-bold">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                                                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Planned">Planned</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="col-span-3 pb-3 flex items-center justify-end gap-3">
                                            <Label htmlFor="registrationOpen" className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-none text-right">Reg. <br /> Open</Label>
                                            <input
                                                type="checkbox"
                                                id="registrationOpen"
                                                name="registrationOpen"
                                                defaultChecked={true}
                                                className="w-6 h-6 rounded-lg border-white/10 bg-white/5 accent-blue-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="p-8 pt-4 border-t border-white/5 bg-slate-950/50">
                            <div className="flex w-full gap-3">
                                <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-black h-14 rounded-2xl shadow-xl shadow-blue-600/20 uppercase tracking-[0.2em] text-[10px]">
                                    {loading ? "COMMITTING DATA..." : "PUBLISH TO CALENDAR"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
