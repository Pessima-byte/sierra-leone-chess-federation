export default function HomeLoading() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Skeleton */}
            <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="h-6 w-32 bg-white/5 rounded-full animate-pulse"></div>
                        <div className="space-y-4">
                            <div className="h-20 w-full bg-white/5 rounded-2xl animate-pulse"></div>
                            <div className="h-20 w-4/5 bg-white/5 rounded-2xl animate-pulse"></div>
                        </div>
                        <div className="h-10 w-64 bg-white/5 rounded-lg animate-pulse"></div>
                        <div className="flex gap-4">
                            <div className="h-14 w-40 bg-blue-600/20 rounded-2xl animate-pulse"></div>
                            <div className="h-14 w-40 bg-white/5 rounded-2xl animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-[500px] w-full bg-white/[0.02] rounded-[3rem] border border-white/5 animate-pulse"></div>
                </div>
            </div>

            {/* Top Players Skeleton */}
            <div className="py-24">
                <div className="container mx-auto px-4">
                    <div className="h-10 w-64 bg-white/5 rounded-xl mx-auto mb-16 animate-pulse"></div>
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-80 w-80 shrink-0 bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
