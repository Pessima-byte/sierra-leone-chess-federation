import { getSession } from "@/app/actions/auth"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { User, Mail, Shield, Trophy } from "lucide-react"

export default async function ProfilePage() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    // Fetch full user data including member relation if it exists
    const user = await db.user.findUnique({
        where: { id: session.userId },
        include: { member: true }
    })

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-24 pb-24 selection:bg-blue-500/30">
            {/* Immersive Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8 relative">
                    <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black tracking-[0.2em] text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            VERIFIED PLAYER
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                            Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">Dashboard</span>
                        </h1>
                        <p className="text-slate-400 text-sm tracking-wide font-medium">
                            Manage your federation profile and official chess records.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1 font-mono text-xs text-slate-500 uppercase tracking-widest">
                        <div>Account ID: <span className="text-slate-300">ACC_{user.id.substring(0, 8)}</span></div>
                        <div>Status: <span className="text-emerald-400">ONLINE</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Identity Matrix */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <User className="w-32 h-32 text-blue-400" />
                            </div>

                            <div className="flex items-center gap-3 mb-8">
                                <Shield className="w-5 h-5 text-blue-400" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Player Identity</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Player Name</div>
                                    <div className="text-2xl font-black text-white tracking-tight">{user.name || "UNIDENTIFIED"}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account Role</div>
                                    <div>
                                        <Badge variant="outline" className={`bg-black/50 ${user.role === 'ADMIN' ? 'border-amber-500/30 text-amber-400' : 'border-emerald-500/30 text-emerald-400'} text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 shadow-lg`}>
                                            {user.role}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact Email</div>
                                    <div className="flex items-center gap-3 font-mono text-sm text-slate-300 bg-black/40 p-4 rounded-2xl border border-white/5">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Federation Linkage */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:border-white/10 transition-all duration-500">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${user.memberId ? 'bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-600'}`}></div>
                                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Federation Link</h2>
                                    </div>
                                    <p className="text-sm text-slate-500 max-w-sm">
                                        Connection to your official Sierra Leone Chess Federation playing record.
                                    </p>
                                </div>

                                {user.memberId ? (
                                    <div className="bg-black/50 px-6 py-4 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center min-w-[140px]">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">SLCF ID</div>
                                        <div className="font-mono text-lg font-bold text-blue-400">{user.memberId}</div>
                                    </div>
                                ) : (
                                    <Button variant="outline" className="border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/20 font-black text-[10px] uppercase tracking-widest h-12 rounded-2xl px-6 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                        Initiate Link
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Widget */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 h-full flex flex-col relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500 shadow-2xl">
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-all duration-700"></div>

                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Playing Record</h2>
                            </div>

                            <div className="flex-1 flex flex-col justify-center relative z-10">
                                {user.member ? (
                                    <div className="space-y-10">
                                        <div className="text-center">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Global Elo Rating</div>
                                            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter drop-shadow-xl">
                                                {user.member.rating}
                                            </div>
                                        </div>

                                        <Link href={`/members/${user.memberId}`} className="block w-full">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] h-14 rounded-2xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                                                View Public Profile
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-6 py-8">
                                        <div className="mx-auto w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center bg-black/20 text-slate-600">
                                            <Trophy className="w-8 h-8 opacity-50" />
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            No playing record linked to this account. Request federation linkage.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
