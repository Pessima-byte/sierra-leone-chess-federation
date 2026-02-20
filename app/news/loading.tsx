export default function NewsLoading() {
    return (
        <div className="min-h-screen bg-[#0f172a] pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 space-y-4">
                    <div className="h-12 w-64 bg-white/5 rounded-2xl animate-pulse"></div>
                    <div className="h-6 w-96 bg-white/5 rounded-lg animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-96 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-pulse overflow-hidden">
                            <div className="h-56 w-full bg-white/5"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-4 w-24 bg-white/5 rounded-full"></div>
                                <div className="h-8 w-full bg-white/5 rounded-lg"></div>
                                <div className="h-4 w-5/6 bg-white/5 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
