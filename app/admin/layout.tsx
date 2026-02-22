import { getSession } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Calendar, Newspaper, LogOut, Home } from "lucide-react"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getSession()

    // Require ADMIN role
    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Members", href: "/admin/members", icon: Users },
        { name: "Events", href: "/admin/events", icon: Calendar },
        { name: "News", href: "/admin/news", icon: Newspaper },
    ]

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row overflow-hidden selection:bg-blue-500/30">
            {/* Global Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
            </div>

            {/* Desktop Sidebar - Premium HUD Style */}
            <aside className="w-72 border-r border-white/5 bg-slate-950/50 backdrop-blur-3xl flex-col hidden md:flex h-screen sticky top-0 z-50">
                <div className="h-24 flex items-center px-8 border-b border-white/5">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
                            <span className="text-sm font-black text-white italic tracking-tighter">SL</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl leading-none italic tracking-tighter">SLCF</span>
                            <span className="text-[9px] text-blue-500 font-black uppercase tracking-[0.3em] mt-1">Command Hub</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 py-8 px-6 space-y-2">
                    <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-4 italic">Main Directive</div>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 text-slate-400 hover:text-white transition-all group active:scale-95"
                        >
                            <item.icon className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 bg-slate-900/20">
                    <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black italic text-blue-400">
                            A
                        </div>
                        <div className="min-w-0">
                            <div className="font-black text-xs uppercase tracking-tight truncate">Administrator</div>
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">Root Access Level</div>
                        </div>
                    </div>
                    <Link href="/" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 hover:bg-red-600/20 transition-all group">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Terminate Session</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen md:h-screen md:overflow-hidden relative z-10">
                {/* Mobile Header - Glassmorphism */}
                <header className="md:hidden border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
                    <div className="flex items-center justify-between px-6 h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-[10px] font-black text-white italic">SL</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-base leading-none italic tracking-tighter uppercase">SLCF Hub</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Active Link</span>
                                </div>
                            </div>
                        </div>
                        <Link href="/" className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 active:scale-95 transition-all">
                            <Home className="w-3 h-3" />
                            Return
                        </Link>
                    </div>
                </header>

                {/* Page Content Viewport */}
                <div className="flex-1 md:overflow-y-auto px-6 py-8 md:p-12 no-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>

                {/* Mobile Bottom Navigation - Floating Glassmorphic Effect */}
                <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                    <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-around h-16 px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl text-slate-500 hover:text-white transition-all active:scale-90"
                            >
                                <item.icon className="w-5 h-5 transition-colors" />
                                <span className="text-[8px] font-black uppercase tracking-widest">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Bottom spacer for mobile floating nav */}
                <div className="md:hidden h-28" />
            </main>
        </div>
    )
}
