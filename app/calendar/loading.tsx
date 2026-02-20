export default function CalendarLoading() {
    return (
        <div className="min-h-screen bg-slate-950 text-white pb-24 overflow-x-hidden pt-16">
            <main className="container mx-auto px-4 relative z-10">
                {/* Hero Skeleton */}
                <div className="mb-12 h-[350px] rounded-[2.5rem] bg-indigo-900/10 border border-white/5 animate-pulse overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-blue-500/5 to-transparent"></div>
                </div>

                {/* Toolbar Skeleton */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="h-11 w-48 bg-white/5 rounded-2xl border border-white/5 animate-pulse"></div>
                        <div className="flex gap-3">
                            <div className="h-10 w-64 bg-white/5 rounded-2xl border border-white/5 animate-pulse"></div>
                            <div className="h-10 w-20 bg-white/5 rounded-xl border border-white/5 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-8 w-24 bg-white/5 rounded-lg border border-white/5 animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-96 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-pulse overflow-hidden">
                            <div className="h-48 w-full bg-white/5"></div>
                            <div className="p-5 space-y-4">
                                <div className="h-6 w-3/4 bg-white/5 rounded-lg"></div>
                                <div className="h-4 w-full bg-white/5 rounded-lg"></div>
                                <div className="h-10 w-full bg-white/5 rounded-xl mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
