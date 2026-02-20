import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    Menu,
    Mail,
    Phone,
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession, logout } from "@/app/actions/auth"
import { getMembers } from "@/lib/queries"
import MembersClient from "./members-client"

export default async function MembersPage() {
    const session = await getSession()
    const members = await getMembers()

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors hidden sm:block font-bold tracking-widest uppercase text-[10px]">Back to Home</span>
                        </Link>

                        <Link href="/" className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-blue-600 rounded-lg blur-lg opacity-50"></div>
                                <div className="relative w-full h-full bg-slate-950 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/images/logo.png"
                                        alt="SLCF Logo"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-lg leading-none tracking-tighter italic uppercase text-white">
                                    SLCF
                                </span>
                                <span className="text-[0.6rem] text-blue-400 uppercase font-black tracking-[0.2em]">
                                    FEderation Portal
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Calendar", href: "/calendar" },
                            { name: "Members", href: "/members", active: true },
                            { name: "News", href: "/news" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${item.active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 italic"
                                    : "text-muted-foreground hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {session ? (
                            <>
                                {session?.user?.role === "ADMIN" && (
                                    <Link href="/admin/dashboard">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hidden md:flex rounded-full border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 font-black italic uppercase text-[10px] tracking-widest text-blue-400"
                                        >
                                            Admin Panel
                                        </Button>
                                    </Link>
                                )}
                                <form action={logout}>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="hidden md:flex bg-white/5 hover:bg-red-600 text-muted-foreground hover:text-white border border-white/10 rounded-full font-black uppercase text-[10px] tracking-widest transition-all"
                                    >
                                        Log Out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hidden md:flex rounded-full border-white/10 bg-white/5 hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest"
                                    >
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/login?mode=register">
                                    <Button
                                        size="sm"
                                        className="hidden md:flex bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg shadow-blue-900/20 rounded-full font-black uppercase text-[10px] tracking-widest"
                                    >
                                        Join Federation
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-muted-foreground"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <MembersClient members={JSON.parse(JSON.stringify(members))} />
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xs">SL</div>
                                <span className="font-black italic uppercase tracking-tighter text-lg">SLCF</span>
                            </div>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed opacity-60">
                                The official governing body for chess in Sierra Leone. Affiliation with FIDE and the Africa Chess Confederation.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Quick Links</h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li><Link href="/#home" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/#players" className="hover:text-blue-400 transition-colors">Rankings</Link></li>
                                <li><Link href="/news" className="hover:text-blue-400 transition-colors">News Transmission</Link></li>
                                <li><Link href="/members" className="hover:text-blue-400 transition-colors">Membership</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Resources</h4>
                            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Learn Chess</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">FIDE Laws</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Arbiter&apos;s Corner</Link></li>
                                <li><Link href="#" className="hover:text-blue-400 transition-colors">Download PGNs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black italic uppercase tracking-widest text-sm mb-6 text-white">Contact</h4>
                            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                <li className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    15 Siaka Stevens St, Freetown
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    info@slchess.org
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-blue-500" />
                                    +232 76 123 456
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground opacity-40">
                        <p>© 2025 Sierra Leone Chess Federation. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="hover:text-white">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white">Terms of Service</Link>
                            <Link href="#" className="hover:text-white">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
