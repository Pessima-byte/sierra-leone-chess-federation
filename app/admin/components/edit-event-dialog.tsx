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
import { Pencil } from "lucide-react"
import { updateEvent } from "@/app/actions/admin"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CalendarEvent {
    id: string
    title: string
    date: string
    time: string
    location: string
    type: string
    level: string
    status: string
    organizer: string
    description: string
    prizePool?: string | null
    entryFee?: string | null
    registrationOpen: boolean
}

export function EditEventDialog({ event }: { event: CalendarEvent }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await updateEvent(event.id, formData)

        if (result.success) {
            toast.success("Event updated successfully")
            setOpen(false)
            router.refresh()
        } else {
            toast.error(result.error || "Failed to update event")
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-white/10 text-white rounded-[2rem]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black italic">UPDATE EVENT BROADCAST</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Modify the details for the {event.title} event.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Title</Label>
                            <Input id="title" name="title" defaultValue={event.title} required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-xs font-bold uppercase tracking-widest text-slate-400">Event Type</Label>
                            <Select name="type" defaultValue={event.type}>
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
                            <Input id="date" name="date" defaultValue={event.date} required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-xs font-bold uppercase tracking-widest text-slate-400">Time</Label>
                            <Input id="time" name="time" defaultValue={event.time} required className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</Label>
                        <Input id="location" name="location" defaultValue={event.location} required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="level" className="text-xs font-bold uppercase tracking-widest text-slate-400">Level</Label>
                            <Select name="level" defaultValue={event.level}>
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
                            <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</Label>
                            <Select name="status" defaultValue={event.status}>
                                <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="organizer" className="text-xs font-bold uppercase tracking-widest text-slate-400">Organizer</Label>
                        <Input id="organizer" name="organizer" defaultValue={event.organizer} required className="bg-white/5 border-white/10 rounded-xl h-12" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
                        <Textarea id="description" name="description" defaultValue={event.description} required className="bg-white/5 border-white/10 rounded-xl min-h-[100px]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="prizePool" className="text-xs font-bold uppercase tracking-widest text-slate-400">Prize Pool (Optional)</Label>
                            <Input id="prizePool" name="prizePool" defaultValue={event.prizePool || ""} placeholder="Le 50,000,000" className="bg-white/5 border-white/10 rounded-xl h-12" />
                        </div>
                        <div className="space-y-2 flex items-center gap-2 pt-8">
                            <input
                                type="checkbox"
                                id="registrationOpen"
                                name="registrationOpen"
                                defaultChecked={event.registrationOpen}
                                className="w-5 h-5 rounded border-white/10 bg-white/5"
                            />
                            <Label htmlFor="registrationOpen" className="text-xs font-bold uppercase tracking-widest text-slate-400">Registration Open</Label>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl">
                            {loading ? "UPDATING..." : "SAVE CHANGES"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
