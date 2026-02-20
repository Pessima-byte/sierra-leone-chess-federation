"use client"

import { useState } from "react"
import { Power, ShieldAlert, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toggleLockdown } from "@/app/actions/admin"
import { toast } from "sonner"

export function LockdownToggle({ initialStatus }: { initialStatus: boolean }) {
    const [active, setActive] = useState(initialStatus)
    const [loading, setLoading] = useState(false)

    async function handleToggle() {
        setLoading(true)
        const res = await toggleLockdown()
        if (res.success) {
            setActive(res.active!)
            toast.success(res.active ? "SITE LOCKED: EMERGENCY STEALTH ACTIVE" : "SITE UNLOCKED: FREQUENCY RESTORED", {
                description: res.active ? "Only administrators can access the portal content." : "Public access has been restored to the terminal.",
                className: "bg-slate-900 border-white/10 text-white",
            })
        } else {
            toast.error("LOCKDOWN TRANSITION FAILED", {
                description: "Terminal communication error. Please try again.",
                className: "bg-red-950 border-red-500/30 text-white",
            })
        }
        setLoading(false)
    }

    return (
        <Button
            onClick={handleToggle}
            disabled={loading}
            variant={active ? "destructive" : "outline"}
            className={`rounded-xl font-black uppercase text-[10px] tracking-[0.2em] h-10 px-4 transition-all duration-500 shadow-lg ${active ? 'animate-pulse shadow-red-500/20' : 'border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 shadow-blue-500/10'}`}
        >
            {active ? (
                <>
                    <ShieldAlert className="w-4 h-4 mr-2" /> EXIT STEALTH MODE
                </>
            ) : (
                <>
                    <ShieldCheck className="w-4 h-4 mr-2" /> INITIATE STEALTH
                </>
            )}
        </Button>
    )
}
