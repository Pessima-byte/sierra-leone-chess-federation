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
        <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-slate-900/50 flex-col hidden md:flex h-screen sticky top-0">
                <div className="h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/" className="flex flex-col">
                        <span className="font-bold text-xl leading-none">SLCF</span>
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Admin Panel</span>
                    </Link>
                </div>
                <nav className="flex-1 py-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                            A
                        </div>
                        <div>
                            <div className="font-bold">Admin User</div>
                            <div className="text-xs text-muted-foreground">admin@slchess.org</div>
                        </div>
                    </div>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-red-400 hover:text-red-300 transition-colors mt-2">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen md:h-screen md:overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden border-b border-white/10 bg-slate-900/80 sticky top-0 z-40">
                    <div className="flex items-center justify-between px-4 h-14">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-[10px] font-black text-white">SL</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm leading-none">SLCF</span>
                                <span className="text-[8px] text-blue-400 font-bold uppercase tracking-widest">Admin</span>
                            </div>
                        </div>
                        <Link href="/" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                            <Home className="w-3 h-3" />
                            Site
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 md:overflow-y-auto px-4 py-5 md:p-8 bg-slate-950/50">
                    {children}
                </div>

                {/* Mobile Bottom Tab Bar */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-white/10 safe-area-bottom">
                    <div className="flex items-center justify-around h-16 px-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:text-white transition-colors min-w-[60px]"
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Bottom spacer for mobile tab bar */}
                <div className="md:hidden h-20" />
            </main>
        </div>
    )
}
