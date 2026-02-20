"use client"

import { toast } from "sonner"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareProfileButton() {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'SLCF Member Profile',
                text: 'Check out this chess player on the Sierra Leone Chess Federation portal!',
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success('Profile link copied to clipboard!')
        }
    }

    return (
        <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-white" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" /> Share Profile
        </Button>
    )
}

export function ChallengePlayerButton({ name }: { name: string }) {
    const handleChallenge = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: `Transmitting challenge to ${name}...`,
                success: `Challenge transmitted! ${name} has been notified.`,
                error: 'Transmission failed. Signal lost.',
            }
        )
    }

    return (
        <Button className="w-full h-14 rounded-2xl bg-blue-600 font-bold text-white hover:bg-blue-500 border-0" onClick={handleChallenge}>
            Challenge Player
        </Button>
    )
}
