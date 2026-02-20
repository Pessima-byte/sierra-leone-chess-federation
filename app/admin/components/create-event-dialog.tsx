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
import { Plus } from "lucide-react"
import { createEvent } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateEventDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await createEvent(formData)

        if (result.success) {
            toast.success("Event created successfully")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to create event")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 font-bold rounded-xl h-10 px-4">
                    <Plus className="w-4 h-4 mr-2" /> Create Event
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">CREATE NEW EVENT</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Fill in the details below to broadcast a new tournament or training session.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                            <Input id="title" name="title" placeholder="Grandmaster Invitational" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Type</Label>
                            <Select name="type" required>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="Tournament">Tournament</SelectItem>
                                    <SelectItem value="Training">Training</SelectItem>
                                    <SelectItem value="Exhibition">Exhibition</SelectItem>
                                    <SelectItem value="Meeting">Meeting</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-xs font-bold uppercase tracking-widest text-slate-400">Date</Label>
                            <Input id="date" name="date" type="text" placeholder="OCT 15, 2025" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-slate-400">Time</Label>
                            <Input id="time" name="time" placeholder="09:00 AM" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</Label>
                        <Input id="location" name="location" placeholder="Freetown City Hall" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="level" className="text-xs font-bold uppercase tracking-widest text-slate-400">Level</Label>
                            <Select name="level" required>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="organizer" className="text-xs font-bold uppercase tracking-widest text-slate-400">Organizer</Label>
                            <Input id="organizer" name="organizer" placeholder="SLCF Committee" required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
                        <Textarea id="description" name="description" placeholder="Describe the event rules, schedule, and details..." required className="bg-white/5 border-white/10 rounded-xl min-h-[100px]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="prizePool" className="text-xs font-bold uppercase tracking-widest text-slate-400">Prize Pool (Optional)</Label>
                            <Input id="prizePool" name="prizePool" placeholder="Le 50,000,000" className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="entryFee" className="text-xs font-bold uppercase tracking-widest text-slate-400">Entry Fee (Optional)</Label>
                            <Input id="entryFee" name="entryFee" placeholder="Le 500,000" className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                            {loading ? "CREATING EVENT..." : "COMMIT TO CALENDAR"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
