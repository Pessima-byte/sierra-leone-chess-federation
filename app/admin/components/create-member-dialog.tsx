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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, UserPlus } from "lucide-react"
import { createMember } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateMemberDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await createMember(formData)

        if (result.success) {
            toast.success("Member added successfully")
            setOpen(false)
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
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">ENLIST NEW MEMBER</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Register a new player into the Sierra Leone Chess Federation registry.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="id" className="text-xs font-bold uppercase tracking-widest text-slate-400">Internal ID</Label>
                            <Input id="id" name="id" placeholder="slcf-001" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fideId" className="text-xs font-bold uppercase tracking-widest text-slate-400">FIDE ID (Optional)</Label>
                            <Input id="fideId" name="fideId" placeholder="123456" className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</Label>
                        <Input id="name" name="name" placeholder="Brian Kanu" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Title</Label>
                            <Select name="title" defaultValue="National Player">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select title" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="Grandmaster">Grandmaster</SelectItem>
                                    <SelectItem value="International Master">International Master</SelectItem>
                                    <SelectItem value="FIDE Master">FIDE Master</SelectItem>
                                    <SelectItem value="Candidate Master">Candidate Master</SelectItem>
                                    <SelectItem value="National Master">National Master</SelectItem>
                                    <SelectItem value="National Player">National Player</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rating" className="text-xs font-bold uppercase tracking-widest text-slate-400">Rating</Label>
                            <Input id="rating" name="rating" type="number" placeholder="1200" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="club" className="text-xs font-bold uppercase tracking-widest text-slate-400">Chess Club</Label>
                            <Input id="club" name="club" placeholder="Freetown Chess Club" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</Label>
                            <Select name="status" defaultValue="Active">
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="joined" className="text-xs font-bold uppercase tracking-widest text-slate-400">Join Date</Label>
                        <Input id="joined" name="joined" placeholder="JAN 2024" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-slate-400">Player Bio (Optional)</Label>
                        <Textarea id="bio" name="bio" placeholder="Achievements, playing style, etc..." className="bg-white/5 border-white/10 rounded-xl min-h-[80px]" />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                            {loading ? "PROCESSING..." : "REGISTER MEMBER"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
