import { ShieldAlert, Terminal, Lock } from "lucide-react"

export default function LockdownPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.05),rgba(0,255,0,0.02),rgba(0,0,255,0.05))] bg-[length:100%_4px,4px_100%] pointer-events-none"></div>
            </div>

            <div className="relative z-10 max-w-lg w-full text-center space-y-8">
                <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                    <div className="relative bg-slate-900 border-2 border-red-500/50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                        <ShieldAlert className="w-12 h-12 text-red-500 animate-bounce" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
                        STATION <span className="text-red-500">OFFLINE</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-red-500/60 font-mono text-xs tracking-[0.3em] font-bold">
                        <Lock className="w-3 h-3" /> SECURITY_PROTOCOL_ALPHA_ACTIVE
                    </div>
                </div>

                <div className="bg-black/50 border border-white/10 p-6 rounded-2xl backdrop-blur-xl text-left font-mono space-y-3 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                    <div className="flex items-center gap-2 text-[10px] text-red-400/80 font-bold mb-2">
                        <Terminal className="w-3 h-3" /> SYSTEM_LOG_OUTPUT
                    </div>
                    <p className="text-xs text-slate-400 animate-pulse">{">"} INITIALIZING STEALTH OVERRIDE...</p>
                    <p className="text-xs text-slate-400">{">"} ENCRYPTING PUBLIC FREQUENCIES...</p>
                    <p className="text-xs text-red-400 font-bold">{">"} ACCESS DENIED: UNAUTHORIZED SIGNATURE</p>
                    <p className="text-xs text-slate-500 mt-4 italic">The Federation News Terminal and Registry are currently in stealth mode for maintenance or security reasons. Please contact a High Command administrator for clearance.</p>
                </div>

                <div className="pt-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                    Sierra Leone Chess Federation :: Terminal v2.0
                </div>
            </div>
        </div>
    )
}
