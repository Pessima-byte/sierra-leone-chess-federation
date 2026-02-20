export default function MembersLoading() {
    return (
        <div className="min-h-screen bg-[#0f172a] pt-24 pb-24">
            <div className="container mx-auto px-4">
                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="h-8 w-48 bg-white/5 rounded-full animate-pulse"></div>
                        <div className="h-16 w-96 bg-white/5 rounded-2xl animate-pulse"></div>
                    </div>
                    <div className="h-12 w-40 bg-blue-500/10 rounded-2xl animate-pulse"></div>
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[450px] rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse overflow-hidden p-8 flex flex-col items-center">
                            <div className="h-32 w-32 rounded-full bg-white/5 mb-6"></div>
                            <div className="h-6 w-3/4 bg-white/5 rounded-lg mb-2"></div>
                            <div className="h-4 w-1/2 bg-white/5 rounded-lg mb-8"></div>
                            <div className="grid grid-cols-3 gap-4 w-full mb-8">
                                <div className="h-12 bg-white/5 rounded-xl"></div>
                                <div className="h-12 bg-white/5 rounded-xl"></div>
                                <div className="h-12 bg-white/5 rounded-xl"></div>
                            </div>
                            <div className="h-12 w-full bg-white/5 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
