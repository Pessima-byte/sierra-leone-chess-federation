export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/20 backdrop-blur-2xl transition-all duration-500">
            <div className="relative flex flex-col items-center">
                {/* Logo Glow */}
                <div className="absolute -inset-10 bg-blue-600/30 blur-[60px] rounded-full animate-pulse-slow"></div>

                {/* Modern Spinner */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
                    <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-t-4 border-emerald-500 rounded-full animate-spin-reverse delay-150"></div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-2">
                    <span className="text-xl font-black italic text-white tracking-[0.3em] animate-pulse uppercase">
                        SLCF TERMINAL
                    </span>
                    <span className="text-[10px] font-bold text-blue-400/60 tracking-[0.4em] uppercase">
                        Syncing Digital Assets...
                    </span>
                </div>

                {/* Scanning Line Effect */}
                <div className="absolute w-48 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent top-1/2 -translate-y-1/2 animate-scan"></div>
            </div>
        </div>
    )
}
